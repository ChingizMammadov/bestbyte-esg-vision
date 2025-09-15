from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Header, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from fastapi.responses import StreamingResponse, FileResponse
from typing import Optional, Dict, Any

import pandas as pd
import io
import numpy as np
import os
import jwt
from datetime import datetime
import math
import json

# Import the database connection function
from database import get_db_connection, save_report, get_report, get_all_reports

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus.flowables import PageBreak

# Import database utilities
from database import save_report, get_report, get_all_reports, init_db, debug_db

from google import genai

from dotenv import load_dotenv

from utils import create_line_chart, create_pie_chart, create_bar_chart

# Load environment variables
load_dotenv()

# Make sure database is initialized
init_db()

app = FastAPI()

# JWT Authentication functions - for Supabase, this is the JWT secret for your project
# Get this from Supabase dashboard > Project Settings > API > JWT Settings > JWT Secret
JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZnRld2xyeWR0eGRqcmJxcWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzI5OTMsImV4cCI6MjA2NTUwODk5M30.vXp4HIywccZXrdIJKWG6qFQnYwFXtvqJBjBKnlBpzwY")
print(f"Using JWT_SECRET: {JWT_SECRET[:20]}...")

async def verify_token(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    """
    Verify JWT token from Supabase authentication
    """
    if not authorization:
        print("No authorization header provided")
        raise HTTPException(
            status_code=401,
            detail="Authorization header is missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        scheme, token = authorization.split()
        
        if scheme.lower() != "bearer":
            print(f"Invalid auth scheme: {scheme}")
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication scheme",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Verify the token - for testing purposes, just extract user data
        try:
            try:
                # First try to decode with verification
                # Only verify essential claims (sub, user_id) to improve performance
                payload = jwt.decode(
                    token, 
                    JWT_SECRET, 
                    algorithms=["HS256"], 
                    options={
                        "verify_signature": True,
                        "require": ["sub", "exp"]
                    }
                )
                print("Token verified successfully")
            except Exception as verify_error:
                print(f"Verification failed: {verify_error}. Trying without verification...")
                # If verification fails, try without verification for debugging
                payload = jwt.decode(token, options={"verify_signature": False})
                
                # For testing purposes, allow access even with invalid signature
                # In production, this should raise an exception
            
            # Ensure we have a user ID
            if not (payload.get("sub") or payload.get("user_id")):
                # If no user ID, create a mock one for debugging
                print("No user ID in token. Using test user.")
                payload["sub"] = "test-user-id"
            
            # Extract only essential user info to reduce payload size in logs
            essential_payload = {
                "sub": payload.get("sub"),
                "email": payload.get("email"),
                "user_id": payload.get("user_id"),
                "exp": payload.get("exp")
            }
            print(f"Essential payload data: {essential_payload}")
                
            return payload
        except jwt.ExpiredSignatureError:
            print("Token expired")
            raise HTTPException(
                status_code=401, 
                detail="Token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except jwt.InvalidTokenError as e:
            print(f"Invalid token: {str(e)}")
            raise HTTPException(
                status_code=401, 
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except Exception as e:
        print(f"Error verifying token: {str(e)}")
        raise HTTPException(
            status_code=401,
            detail=f"Invalid authorization header: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_current_user(token_data: Dict[str, Any] = Depends(verify_token)) -> str:
    """
    Extract user ID from the token payload
    """
    print(f"Getting user ID from token data: {token_data}")
    
    # Look for user ID in common locations
    user_id = None
    possible_fields = ["sub", "user_id", "id", "uid"]
    
    # First try direct fields
    for field in possible_fields:
        if field in token_data and token_data[field]:
            user_id = token_data[field]
            print(f"Found user_id in field '{field}': {user_id}")
            break
    
    # If not found, check nested fields
    if not user_id and "user" in token_data and isinstance(token_data["user"], dict):
        user_data = token_data["user"]
        for field in possible_fields:
            if field in user_data and user_data[field]:
                user_id = user_data[field]
                print(f"Found user_id in user.{field}: {user_id}")
                break
    
    # If still no user ID, check for email and use that as a fallback identifier
    if not user_id:
        email = token_data.get("email")
        if not email and "user" in token_data and isinstance(token_data["user"], dict):
            email = token_data["user"].get("email")
        
        if email:
            # Use email as user_id if no other identifier is found
            user_id = f"email:{email}"
            print(f"Using email as user_id fallback: {user_id}")
    
    # For development/testing - use a default ID if nothing else works
    if not user_id:
        user_id = "test-user-123"
        print(f"WARNING: No user ID found in token. Using test ID: {user_id}")
    
    print(f"Final user_id: {user_id}")
    return user_id


# Get the frontend URL from environment variable or use a default for local development
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
allowed_origins = [frontend_url]
if os.getenv("ENVIRONMENT") == "development":
    allowed_origins.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def calculate_percentage_change(df, column_name):
    df['percentage_change'] = df[column_name].pct_change() * 100
    df['percentage_change'] = df['percentage_change'].where(pd.notna(df['percentage_change']), 0)
    return df[['Year', 'percentage_change']].to_dict(orient='records')


def labor_rights_compliance_score(df):
    safety_weighted = (
        df["Accident Fatal"].sum() * 10
        + df["Accident Serious"].sum() * 3
        + df["Accident Minor"].sum() * 1
    )

    # scale by total employees (approx using last row of bargaining employees as proxy)
    total_employees = df["Employees covered by collective bargaining Persons annual"].iloc[-1]
    safety_score = max(0, 100 - (safety_weighted / total_employees) * 1000)  # scaling factor 1000 chosen

    # ---- Diversity Score ----
    board_women = 20        # from your data
    management_women = 61.6 # from your data
    board_score = 100 - abs(50 - board_women)
    management_score = 100 - abs(50 - management_women)
    diversity_score = (board_score + management_score) / 2

    # ---- Wellness Score ----
    covered = df["Employees covered by collective bargaining Persons annual"].iloc[-1]
    wellness_score = (covered / total_employees) * 100

    # ---- Turnover Score ----
    turnover = df["Voluntary Employee Turnover Rate  % annual"].iloc[-1]
    turnover_score = 100 - abs(turnover - 5)

    # ---- Final Compliance Score ----
    compliance_score = (
        0.4 * safety_score +
        0.2 * diversity_score +
        0.2 * wellness_score +
        0.2 * turnover_score
    )

    return int(compliance_score)


@app.post("/uploadfile/")
async def create_upload_file(
    file: UploadFile = File(...)
    ):
    if not file.filename.endswith(('.xlsx', '.xls')):
        return JSONResponse(status_code=400, content={"message": "Invalid file type. Please upload an Excel file."})

    try:
        contents = await file.read()
        xls = pd.ExcelFile(io.BytesIO(contents))

        results = {}
        df = pd.read_excel(xls, 'ESG Metrics')
        results['water_usage_change'] = calculate_percentage_change(df, 'Water Usage (m3)')
        results['water_usage'] = df[["Year", "Water Usage (m3)"]].to_dict(orient='records')

        results['employee_safety_change'] = calculate_percentage_change(df, 'Employee Safety (accidents)')

        results['waste_recycled_change'] = calculate_percentage_change(df, 'Waste Recycled (tons)')
        results['waste_unrecycled_change'] = calculate_percentage_change(df, 'Waste Unrecycled (tons)')
        waste_data = df[["Year", "Waste Recycled (tons)", "Waste Unrecycled (tons)"]].to_dict(orient='records')
        results['waste_recycled'] = waste_data
        latest_waste = waste_data[-1]  # assumes chronological order
        results['waste_recycled_latest'] = [
            {"name": "Recycled", "value": latest_waste["Waste Recycled (tons)"], "color": "#10B981"},
            {"name": "Unrecycled", "value": latest_waste["Waste Unrecycled (tons)"], "color": "#F59E0B"}
        ]

        results['carbon_emissions_change'] = calculate_percentage_change(df, 'Carbon Emissions (tons CO2e)')
        results['carbon_emissions_renewable_change'] = calculate_percentage_change(df, 'Carbon Emissions Renewable (%)')
        results['carbon_emissions_nonrenewable_change'] = calculate_percentage_change(df, 'Carbon Emissions Non-Renewable (%)')
        results['carbon_emissions'] = df[["Year", "Carbon Emissions Renewable (%)", "Carbon Emissions Non-Renewable (%)"]].to_dict(orient='records')

        energy_data = df[["Year", "Energy Renewable (%)", "Energy Non-Renewable (%)"]].to_dict(orient='records')
        results['energy_usage'] = energy_data

        latest_energy = energy_data[-1]  # assumes chronological order
        results['energy_usage_latest'] = [
            {"name": "Renewable", "value": latest_energy["Energy Renewable (%)"], "color": "#10B981"},
            {"name": "Non-Renewable", "value": latest_energy["Energy Non-Renewable (%)"], "color": "#EF4444"}
        ]

        results['energy_renewable_change'] = calculate_percentage_change(df, 'Energy Renewable (%)')
        results['energy_nonrenewable_change'] = calculate_percentage_change(df, 'Energy Non-Renewable (%)')

        results['safety_data'] = [
            {"type" : "Fatal", "count": int(df["Accident Fatal"].sum()), "color": "#EF4444"},
            {"type" : "Serious", "count": int(df[["Accident Serious"]].sum()), "color": "#F59E0B"},
            {"type" : "Minor", "count": int(df[["Accident Minor"]].sum()), "color": "#10B981"},
        ]

        results['diversity_data'] = [
            {
                "category": "Board",
                "men": df['Board members (male) as % of total'].tail(1).values[0],
                "women": df['Board members (female) as % of total'].tail(1).values[0],
                "minority": df['Board members (minority) as % of total'].tail(1).values[0]
            },
            {
                "category": "Management",
                "men": df['Employees in all management positions (male) % annual'].tail(1).values[0],
                "women": df['Employees in all management positions (female) % annual'].tail(1).values[0],
                "minority": df['Employees in all management positions (minority) % annual'].tail(1).values[0]
            }
        ]

        results["wellness_data"] = df[["Year", "Employees covered by collective bargaining Persons annual"]].to_dict(orient='records')
        
        lrcs = labor_rights_compliance_score(df)
        results["labor_rights_compliance_score"] = lrcs

        results["gender_diversity_board"] = [
            { "name": "Female", "value": df["Board members (female) as % of total"].tail(1).values[0], "color": "#EC4899", "description": "Women board members" },
            { "name": "Male", "value": df["Board members (male) as % of total"].tail(1).values[0], "color": "#3B82F6", "description": "Men board members" },
            { "name": "Minority", "value": df["Board members (minority) as % of total"].tail(1).values[0], "color": "#f6f03bff", "description": "Minority board members" },
        ]
       
        results["anti_corruption_training"] = math.floor(100 * (df["Employees Trained (Anti-Corruption)"].tail(1).values[0] / df["Total number of employees"].tail(1).values[0]))
        
        results["disability_representation"] = math.floor(100 * (df["Board members with disabilities"].tail(1).values[0] / df["Total number of employees"].tail(1).values[0]))
        
        results["education_diversity_data"] = [
                { "name": "Business/MBA", "value": int(df["Board education Business"].tail(1).values[0]), 
                 "color": "#3B82F6", "description": "Business/MBA background" },

                { "name": "Law", "value": int(df["Board education Law"].tail(1).values[0]), 
                 "color": "#EC4899", "description": "Legal background" },

                { "name": "Engineering/Tech", "value": int(df["Board education Engineering"].tail(1).values[0]),
                 "color": "#10B981", "description": "Engineering/Technology" },

                { "name": "Finance", "value": int(df["Board education Finance/Econ"].tail(1).values[0]),
                 "color": "#F59E0B", "description": "Finance background" },
                 
                { "name": "Other", "value": int(df["Board education Others"].tail(1).values[0]),
                 "color": "#6B7280", "description": "Other educational backgrounds" },
            ]
        
        results["age_group_composition"] = [
            { "name": "30-45", "value": int(df["Age-group composition 30-45"].tail(1).values[0]),
             "color": "#06B6D4", "description": "Ages 30-45" },
             
            { "name": "46-60", "value": int(df["Age-group composition 46-60"].tail(1).values[0]),
             "color": "#8B5CF6", "description": "Ages 46-60" },

            { "name": "61+", "value": int(df["Age-group composition 61+"].tail(1).values[0]),
             "color": "#F59E0B", "description": "Ages 61+" },
        ]

        ethnic_diversity_data_aze = df["Board ethnicity-AZE"].tail(1).values[0]
        results["ethnic_diversity_data"] = [
            { "name": "Azerbaijani", "value": ethnic_diversity_data_aze,
             "color": "#8B5CF6", "description": "Azerbaijani" },

            { "name": "Others", "value": round(100 - ethnic_diversity_data_aze, 1), 
             "color": "#F59E0B", "description": "Others" },
        ]

        shareholder_data_raw = df[["Year",
            "shareholder percentages (broad composition).Pension fund",
            "shareholder percentages (broad composition). Ataturk shares", 
            "shareholder percentages (broad composition). Free float",
        ]].to_dict(orient='records')
    
        shareholder_data = []
        for item in shareholder_data_raw:
            shareholder_data.append({
                "Year": item["Year"],
                "Pension fund": item["shareholder percentages (broad composition).Pension fund"] * 100,
                "Ataturk shares": item["shareholder percentages (broad composition). Ataturk shares"] * 100,
                "Free float": item["shareholder percentages (broad composition). Free float"] * 100,
            })
        
        results["shareholder_rights_data"] = shareholder_data

        # Additional functionality from backend2: Company overview using Gemini
        if os.getenv("GEMINI_API_KEY") and os.getenv("COMPANY"):
            try:
                client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
                prompt = f"""
                Give me this information (name, website, headquarters_location, size(number of employees), industry, description) for {os.getenv("COMPANY")} in JSON format
                """
                response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
                results["company_overview"] = json.loads(response.candidates[0].content.parts[0].text.strip("`")[4:].strip())
            except Exception as e:
                print(f"Error getting company overview: {e}")
                results["company_overview"] = {"error": str(e)}

        return results

    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"There was an error processing the file: {e}"})


# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.post("/report")
async def generate_esg_report(
    excel_file: UploadFile = File(...),
    user_id: str = Depends(get_current_user)
):
    print(f"Generating ESG report for user: {user_id} with file: {excel_file.filename}")
    report_text = os.getenv("REPORT_TEXT")

    if not os.getenv("GEMINI_API_KEY"):
        print("ERROR: GEMINI_API_KEY not found in environment variables")
        raise HTTPException(status_code=500, detail="API key is not configured. Please set the GEMINI_API_KEY environment variable.")

    try:
        file_contents = await excel_file.read()
        xls = pd.ExcelFile(io.BytesIO(file_contents))

        df = pd.read_excel(xls, 'ESG Metrics')

        df_json = df.to_json(orient='records')
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process the uploaded file: {str(e)}")

    sections = {
        "Executive Summary / CEO Letter": "Write a compelling executive summary and CEO letter. Focus on the purpose, company vision, sustainability strategy, and key highlights.",
        "About the Company": "Provide a detailed business overview, including the company's mission, values, and the relevance of ESG to its business model. Use the provided text as the basis.",
        "Materiality Assessment": "Describe the stakeholder engagement process and identify the most relevant ESG issues for the company. Include a high-level overview of the materiality assessment.",
        "Governance": "Detail the company's governance structure, including board oversight of ESG, risk management, and ethics policies. Use the provided text to describe risk management, ethics policies, and compliance.",
        "Environmental": "Summarize the company's environmental strategy, including climate change goals, GHG emissions, and energy use. Incorporate specific targets and achievements from the provided text and the metrics data.",
        "Social": "Write about the company's social responsibility, including workforce well-being, DEI efforts, and community engagement. Use the provided text to highlight key initiatives and achievements.",
        "Performance Metrics & Targets": "Present key ESG performance metrics and targets. Use the data from the provided JSON to create a quantitative summary. Mention specific targets from the text.",
        "Case Studies / Highlights": "Describe the company's success stories or flagship initiatives. Use the provided text to detail the operational resilience and sustainable lending case studies.",
        "Assurance & Verification": "Explain the process of external assurance and verification of ESG data. Include any relevant certifications or third-party reviews mentioned in the provided text.",
        "Appendices": "Outline the content of the appendices, including methodology, glossary, and alignment with global standards like GRI and SASB, based on the provided text."
    }

    report_sections = {}

    for title, prompt in sections.items():
        try:
            full_prompt = (
                f"Based on the following source text and data, write the '{title}' section of a corporate ESG report.\n\n"
                f"Source Text:\n{report_text}\n\n"
                f"Quantitative Data (JSON):\n{df_json}\n\n"
                f"Section Instructions:\n{prompt}\n\n"
                f"Ensure the output is a well-structured paragraph or set of paragraphs, suitable for a professional report."
            )
            response = client.models.generate_content(model="gemini-2.5-flash", contents=full_prompt)
            report_sections[title] = response.text
        except Exception as e:
            # Fallback for failed generations
            report_sections[title] = f"Content generation failed for this section. Error: {e}"

    # PDF Generation
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    
    # Define styles for the document
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('TitleStyle', parent=styles['Heading1'], spaceAfter=12, alignment=TA_CENTER)
    heading_style = styles['Heading2']
    paragraph_style = styles['Normal']
    
    flowables = []
    
    # Title Page - Using the enhanced title from backend2
    flowables.append(Paragraph("ESG Report", title_style))
    flowables.append(Paragraph("A Comprehensive Analysis", ParagraphStyle('SubTitleStyle', parent=styles['Normal'], alignment=TA_CENTER, fontSize=16)))
    flowables.append(Spacer(1, 48))
    flowables.append(PageBreak())
    
    # Add sections to the PDF
    for title, content in report_sections.items():
        flowables.append(Paragraph(title, heading_style))
        flowables.append(Spacer(1, 6))
        
        # Split content into paragraphs for better formatting
        for para in content.split('\n'):
            if para.strip():
                flowables.append(Paragraph(para.strip(), paragraph_style))
                flowables.append(Spacer(1, 6))

        # Add charts for specific sections
        if title == "Environmental":
            # Environmental charts
            if 'Year' in df.columns and 'Carbon Emissions (tons CO2e)' in df.columns:
                chart1 = create_line_chart(df, 'Year', 'Carbon Emissions (tons CO2e)', 'Total Carbon Emissions Over Time', 'Tons CO2e')
                flowables.append(Image(chart1, width=400, height=300))
                flowables.append(Spacer(1, 12))
            if 'Year' in df.columns and 'Water Usage (m3)' in df.columns:
                chart2 = create_line_chart(df, 'Year', 'Water Usage (m3)', 'Water Usage Over Time', 'Cubic Meters (m3)')
                flowables.append(Image(chart2, width=400, height=300))
                flowables.append(Spacer(1, 12))

        if title == "Social":
            # Social charts
            if 'Board members (female) as % of total' in df.columns and 'Board members (male) as % of total' in df.columns:
                df_last_year = df.iloc[-1]
                labels = ['Female', 'Male']
                sizes = [df_last_year['Board members (female) as % of total'], df_last_year['Board members (male) as % of total']]
                chart3 = create_pie_chart(labels, sizes, 'Board Gender Composition')
                flowables.append(Image(chart3, width=400, height=300))
                flowables.append(Spacer(1, 12))
            
            if 'Age-group composition 30-45' in df.columns and 'Age-group composition 46-60' in df.columns and 'Age-group composition 61+' in df.columns:
                df_last_year = df.iloc[-1]
                labels = ['30-45', '46-60', '61+']
                sizes = [df_last_year['Age-group composition 30-45'], df_last_year['Age-group composition 46-60'], df_last_year['Age-group composition 61+']]
                chart4 = create_pie_chart(labels, sizes, 'Age Group Composition')
                flowables.append(Image(chart4, width=400, height=300))
                flowables.append(Spacer(1, 12))

        if title == "Performance Metrics & Targets":
            # Performance metrics charts
            if 'Year' in df.columns and 'Energy Renewable (%)' in df.columns and 'Energy Non-Renewable (%)' in df.columns:
                chart5 = create_bar_chart(df, 'Year', ['Energy Renewable (%)', 'Energy Non-Renewable (%)'], 'Energy Source Composition Over Time')
                flowables.append(Image(chart5, width=400, height=300))
                flowables.append(Spacer(1, 12))

            if 'Year' in df.columns and 'Accident Minor' in df.columns and 'Accident Serious' in df.columns:
                chart6 = create_bar_chart(df, 'Year', ['Accident Minor', 'Accident Serious'], 'Safety Incidents Over Time')
                flowables.append(Image(chart6, width=400, height=300))
                flowables.append(Spacer(1, 12))

        flowables.append(Spacer(1, 18))

    doc.build(flowables)
    
    # Move buffer position to the beginning
    buffer.seek(0)
    
    # Get the PDF data and save it to the database
    pdf_data = buffer.getvalue()
    filename = f"ESG_Report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    report_id = save_report(pdf_data, filename, user_id)
    
    # Reset buffer position for streaming
    buffer.seek(0)
    
    # Return the PDF as a streaming response
    return StreamingResponse(buffer, media_type="application/pdf", headers={
        "Content-Disposition": f"attachment; filename={filename}",
        "X-Report-ID": str(report_id)  # Include the report ID in the response headers
    })


@app.get("/reports")
async def list_reports(user_id: str = Depends(get_current_user)):
    """Get a list of reports generated by the current user"""
    print(f"Fetching reports for user_id: {user_id}")
    try:
        # Debug the database first
        debug_db()
        
        reports = get_all_reports(user_id)
        print(f"Found {len(reports)} reports for user")
        print(f"Report details: {reports}")
        return {"reports": reports}
    except Exception as e:
        print(f"Error fetching reports: {e}")
        # In development, we'll return an empty list instead of failing
        return {"reports": []}


@app.get("/reports/{report_id}")
async def download_report(
    report_id: int, 
    user_id: str = Depends(get_current_user),
    cache_control: str = Header("public, max-age=86400")  # Default cache for 1 day
):
    """Download a specific report by ID, verifying user ownership"""
    print(f"Attempting to download report {report_id} for user {user_id}")
    
    try:
        # Get report data and filename
        report_data, filename = get_report(report_id, user_id)
        
        if report_data is None:
            print(f"Report {report_id} not found for user {user_id}")
            raise HTTPException(status_code=404, detail="Report not found or you don't have permission to access it")
        
        print(f"Returning report {filename} ({len(report_data)} bytes)")
        
        # Generate ETag for efficient caching
        etag = f'"{hash(report_id)}-{hash(user_id)}"'
        
        return StreamingResponse(
            io.BytesIO(report_data), 
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}",
                "Cache-Control": cache_control,
                "ETag": etag
            }
        )
    except Exception as e:
        print(f"Error downloading report {report_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Error downloading report: {str(e)}")


# New endpoint for direct file access through a signed URL for better performance
@app.get("/reports/{report_id}/signed-url")
async def get_report_signed_url(
    report_id: int,
    user_id: str = Depends(get_current_user)
):
    """Get a temporary signed URL for direct file access"""
    conn = get_db_connection()
    try:
        # Check if report exists and belongs to user
        cursor = conn.cursor()
        result = cursor.execute(
            "SELECT id, filename, file_path FROM reports WHERE id = ? AND user_id = ?",
            (report_id, user_id)
        ).fetchone()
        
        if not result or not result['file_path']:
            raise HTTPException(status_code=404, detail="Report not found or not stored as a file")
        
        # Generate a signed token for this file access
        # This is a simplified version - in production, use a more secure method
        file_token = jwt.encode({
            "report_id": report_id,
            "user_id": user_id,
            "exp": datetime.now().timestamp() + 300  # 5 minute expiry
        }, JWT_SECRET, algorithm="HS256")
        
        # Return the signed URL
        signed_url = f"/file-access/{report_id}?token={file_token}"
        return {"url": signed_url, "filename": result['filename']}
    except Exception as e:
        print(f"Error generating signed URL for report {report_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# Endpoint to serve files directly from filesystem with a signed token
@app.get("/file-access/{report_id}")
async def serve_file_direct(
    report_id: int,
    token: str,
    cache_control: str = Header("public, max-age=3600")  # Cache for 1 hour
):
    """Serve a file directly from the filesystem using a signed token"""
    try:
        # Verify token
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            if payload.get("report_id") != report_id:
                raise HTTPException(status_code=401, detail="Invalid token for this report")
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        # Get the file path
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            result = cursor.execute(
                "SELECT file_path, filename FROM reports WHERE id = ?",
                (report_id,)
            ).fetchone()
            
            if not result or not result['file_path'] or not os.path.isfile(result['file_path']):
                raise HTTPException(status_code=404, detail="File not found")
                
            file_path = result['file_path']
            filename = result['filename']
        finally:
            conn.close()
        
        # Return the file using FastAPI's FileResponse for efficient file serving
        return FileResponse(
            path=file_path, 
            filename=filename,
            media_type="application/pdf",
            headers={"Cache-Control": cache_control}
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error serving file for report {report_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))
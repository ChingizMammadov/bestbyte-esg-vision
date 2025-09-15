# BestByte API

This repository contains the backend API for the BestByte ESG reporting application.

## Local Development

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/Mac: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file with the following variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   SUPABASE_JWT_SECRET=your_supabase_jwt_secret
   COMPANY=BestByte
   ENVIRONMENT=development
   ```

5. Run the application:
   ```
   uvicorn main:app --reload
   ```

## Deployment to Render

### Option 1: Deploy via Render Dashboard

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Log in to your Render account and go to the Dashboard

3. Click "New +" and select "Web Service"

4. Connect your Git repository and select this project

5. Configure the service:
   - Name: `bestbyte-api` (or your preferred name)
   - Runtime: `Docker`
   - Region: Choose the closest to your users
   - Branch: `main` (or your deployment branch)
   - Root Directory: Leave empty or specify if not in root
   - Build Command: Leave empty (Docker will handle this)
   - Start Command: Leave empty (Dockerfile has CMD instruction)

6. Add the following environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `SUPABASE_JWT_SECRET`: Your Supabase JWT secret
   - `COMPANY`: BestByte
   - `FRONTEND_URL`: The URL of your frontend application
   - `PORT`: 8000

7. Click "Create Web Service"

### Option 2: Deploy via Render Blueprint

1. Commit the `render.yaml` file to your repository

2. In the Render dashboard, click "New +" and select "Blueprint"

3. Connect your Git repository

4. Render will detect the `render.yaml` file and set up services automatically

5. You will need to manually set the `GEMINI_API_KEY` and `SUPABASE_JWT_SECRET` environment variables as they're marked as `sync: false` in the blueprint

## Notes

- The application creates and uses a SQLite database in the `/db` directory
- Generated reports are stored in the `/reports` directory
- In a production environment, consider using a more robust database solution
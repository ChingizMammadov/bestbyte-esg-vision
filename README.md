# BestByte ESG Analytics Platform

A full-stack application for ESG (Environmental, Social, and Governance) analytics and reporting.

## Overview

BestByte ESG Analytics Platform helps organizations track, analyze, and report on their environmental, social, and governance metrics. It provides a comprehensive dashboard with data visualization, report generation, and analytics features.

## Features

- 📊 Interactive ESG dashboards and analytics
- 📄 Automated report generation and document extraction
- 🔍 Advanced search and filtering capabilities
- 📱 Responsive design for desktop and mobile
- 🔒 Secure authentication and user management
- 🌙 Dark/Light theme support

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Shadcn/UI components
- React Hook Form for form management

### Backend
- Python with FastAPI
- PDF data extraction utilities
- Database integration with SQLite/Postgres

## Getting Started

### Quick Start

Run the application with our startup script:

```powershell
# From the project root directory
.\start.ps1
```

This will:
1. Start the backend Python server
2. Start the frontend development server with Bun
3. Open the application in your browser

### Manual Setup

#### Frontend Setup

```bash
cd frontend
bun install
bun run dev
```

#### Backend Setup

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows PowerShell
pip install -r requirements.txt
python main.py
```

## Development

- Frontend runs at: http://localhost:5173
- Backend API available at: http://localhost:8000

## Project Structure

```
backend/
  ├── main.py           # Main FastAPI application
  ├── requirements.txt  # Python dependencies
  └── utils.py          # Helper functions

frontend/
  ├── src/
  │   ├── components/   # Reusable UI components
  │   ├── contexts/     # React contexts
  │   ├── hooks/        # Custom React hooks
  │   ├── lib/          # Utilities and API functions
  │   ├── pages/        # Main application pages
  │   └── utils/        # Helper functions
  └── public/           # Static assets
```

## License

This project is proprietary and confidential.

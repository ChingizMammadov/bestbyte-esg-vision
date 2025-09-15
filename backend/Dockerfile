FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create directories for data storage
RUN mkdir -p db
RUN mkdir -p reports

# Create data directory for persistent storage on Render
RUN mkdir -p /app/data
RUN mkdir -p /app/data/db
RUN mkdir -p /app/data/reports

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${PORT:-8000}"]
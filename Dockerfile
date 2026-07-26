# ---------- Base Image ----------
FROM python:3.12-slim

# ---------- Working Directory ----------
WORKDIR /app

# ---------- Environment ----------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ---------- System Dependencies ----------
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# ---------- Python Dependencies ----------
COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ---------- Copy Project ----------
COPY . .

# ---------- Expose FastAPI Port ----------
EXPOSE 8000

# ---------- Start Application ----------
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.chat import router as chat_router
from src.api.dashboard import router as dashboard_router
from src.api.projects import router as projects_router
from src.api.knowledge_base import router as knowledge_base_router
from src.api.documents import router as documents_router
from src.api.upload import router as upload_router

app = FastAPI(
    title="Enterprise Intelligence Platform API",
    version="1.0.0",
)

# 1. Setup CORS Origins dynamically
origins = [
    "http://localhost:3000",
]

frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    origins.append(frontend_url)

# 2. Add CORS Middleware exactly ONCE
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Include Routers
app.include_router(documents_router)
app.include_router(chat_router)
app.include_router(dashboard_router)
app.include_router(projects_router)
app.include_router(knowledge_base_router)
app.include_router(upload_router)

# 4. Health Check Endpoint
@app.get("/")
def health_check():
    return {
        "status": "running",
        "message": "Enterprise Intelligence Platform Backend"
    }
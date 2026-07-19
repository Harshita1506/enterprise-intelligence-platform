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

# Allow frontend (Next.js) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(documents_router)
app.include_router(chat_router)
app.include_router(dashboard_router)
app.include_router(projects_router)
app.include_router(knowledge_base_router)
app.include_router(upload_router)

@app.get("/")
def health_check():
    return {
        "status": "running",
        "message": "Enterprise Intelligence Platform Backend"
    }
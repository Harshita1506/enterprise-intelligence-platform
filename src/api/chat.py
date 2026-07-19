from fastapi import APIRouter
from pydantic import BaseModel

from src.models.response_models import APIResponse
from src.services.chat_service import ChatService

router = APIRouter(
    prefix="/api/chat",
    tags=["AI Companion"],
)

service = ChatService()


class ChatRequest(BaseModel):
    query: str


@router.post("", response_model=APIResponse)
def chat(request: ChatRequest):

    result = service.process_query(request.query)

    return APIResponse(
        success=True,
        message="Query processed successfully.",
        data=result,
    )
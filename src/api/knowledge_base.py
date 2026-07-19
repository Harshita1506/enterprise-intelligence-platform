from fastapi import APIRouter

from src.models.response_models import APIResponse
from src.services.knowledge_base_service import KnowledgeBaseService

router = APIRouter(
    prefix="/api/knowledge-base",
    tags=["Knowledge Base"],
)

service = KnowledgeBaseService()


@router.get("", response_model=APIResponse)
def get_knowledge_base():

    result = service.get_documents()

    return APIResponse(
        success=True,
        message="Knowledge base loaded successfully.",
        data=result,
    )
def get_document(self, document_id: str) -> dict | None:
    """
    Returns metadata for a single document.
    """

    documents = self.get_all_documents()

    for document in documents:

        doc_id = f'{document["project_id"]}/{document["source"]}'

        if doc_id == document_id:
            return document

    return None
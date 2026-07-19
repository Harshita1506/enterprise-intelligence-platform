from src.models.kb_models import (
    KnowledgeDocument,
    KnowledgeBaseResponse,
)
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase


class KnowledgeBaseService:
    """
    Service responsible for exposing the enterprise
    knowledge base to the frontend.
    """

    def __init__(self):
        self.kb = EnterpriseKnowledgeBase()

    def get_documents(self) -> KnowledgeBaseResponse:

        metadata = self.kb.get_all_documents()

        documents = []

        for doc in metadata:

            documents.append(
                KnowledgeDocument(
                    id=f'{doc["project_id"]}/{doc["source"]}',
                    project_id=doc["project_id"],
                    document_type=doc["document_type"],
                    source=doc["source"],
                )
            )

        return KnowledgeBaseResponse(
            documents=documents
        )
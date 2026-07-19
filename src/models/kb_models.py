from typing import List
from pydantic import BaseModel


class KnowledgeDocument(BaseModel):
    id: str
    project_id: str
    document_type: str
    source: str


class KnowledgeBaseResponse(BaseModel):
    documents: List[KnowledgeDocument]
from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: str
    project_id: str
    document_type: str
    source: str
    content: str
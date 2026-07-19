from pydantic import BaseModel


class UploadResponse(BaseModel):
    project_id: str
    filename: str
    chunks_created: int
    status: str
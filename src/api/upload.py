from fastapi import APIRouter, UploadFile, File, Form

from src.models.response_models import APIResponse
from src.services.upload_service import UploadService

router = APIRouter(
    prefix="/api/upload",
    tags=["Knowledge Base"],
)

service = UploadService()


@router.post("", response_model=APIResponse)
def upload_document(
    project_id: str = Form(...),
    file: UploadFile = File(...),
):

    result = service.upload_document(project_id, file)

    return APIResponse(
        success=True,
        message="Document uploaded and indexed successfully.",
        data=result,
    )
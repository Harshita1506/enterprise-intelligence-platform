from fastapi import APIRouter, HTTPException

from src.models.response_models import APIResponse
from src.services.document_service import DocumentService

router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"],
)

service = DocumentService()


@router.get("/{document_id:path}", response_model=APIResponse)
def get_document(document_id: str):

    try:
        result = service.get_document(document_id)

        return APIResponse(
            success=True,
            message="Document loaded successfully.",
            data=result,
        )

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
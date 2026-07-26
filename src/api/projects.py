from fastapi import APIRouter, HTTPException

from src.models.response_models import APIResponse
from src.services.project_service import ProjectService

router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"],
)

# Create a single ProjectService instance when the application starts.
# This allows the in-memory projects cache to be reused across requests
# while the application is running.
service = ProjectService()


@router.get("", response_model=APIResponse)
def get_projects():

    result = service.get_projects()

    return APIResponse(
        success=True,
        message="Projects loaded successfully.",
        data=result,
    )


@router.get("/{project_id}", response_model=APIResponse)
def get_project(project_id: str):

    try:

        result = service.get_project(project_id)

        return APIResponse(
            success=True,
            message="Project loaded successfully.",
            data=result,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
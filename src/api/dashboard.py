from fastapi import APIRouter

from src.models.response_models import APIResponse
from src.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)

service = DashboardService()


@router.get("", response_model=APIResponse)
def get_dashboard():

    result = service.get_dashboard_data()

    return APIResponse(
        success=True,
        message="Dashboard loaded successfully.",
        data=result,
    )
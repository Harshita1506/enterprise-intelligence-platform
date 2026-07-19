from src.models.dashboard_models import (
    DashboardData,
    DashboardStats,
    AttentionItem,
    AIUpdate,
    PlatformStatus,
)

from src.services.project_metadata_service import ProjectMetadataService
from src.services.dashboard_ai_service import DashboardAIService

class DashboardService:
    """
    Aggregates enterprise information required by the dashboard.

    This service orchestrates existing services.
    It should not contain AI logic itself.
    """
    
    def __init__(self):
        self.metadata_service = ProjectMetadataService()
        self.ai_service = DashboardAIService()
        
    def get_dashboard_data(self) -> DashboardData:

        stats_data = self.metadata_service.get_dashboard_stats()

        stats = DashboardStats(
            total_projects=stats_data["total_projects"],
            active_projects=stats_data["active_projects"],
            total_documents=stats_data["total_documents"],
            total_chunks=stats_data["total_chunks"],
        )

        # Temporary placeholders
        attention_items = self.ai_service.get_attention_items()
        ai_updates = self.ai_service.get_ai_updates()
        
        platform_status = PlatformStatus(
            knowledge_base="Healthy",
            chat_api="Online",
            llm="Groq",
        )

        return DashboardData(
            stats=stats,
            attention_items=attention_items,
            ai_updates=ai_updates,
            platform_status=platform_status,
        )
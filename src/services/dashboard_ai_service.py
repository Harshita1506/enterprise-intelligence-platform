"""
Provides dashboard-ready information derived from project metadata.

No LLM calls are made from this service.
"""

from src.models.dashboard_models import AttentionItem, AIUpdate
from src.services.project_metadata_service import ProjectMetadataService


class DashboardAIService:
    """
    Provides dashboard information using project metadata only.
    """

    def __init__(self):
        self.metadata = ProjectMetadataService()

    def get_attention_items(self):
        """
        Returns knowledge base readiness for each project.
        """

        items = []
        projects = self.metadata.get_projects_metadata()

        for project in projects:

            if project["status"] == "Inactive":
                status = "Not Ready"
                title = "Project folder not found."

            elif project["documents"] == 0:
                status = "Not Ready"
                title = "No documents have been indexed."

            elif project["documents"] < 3:
                status = "Needs More Data"
                title = "Limited documentation available for AI analysis."

            else:
                status = "Ready"
                title = "Knowledge base is ready for AI analysis."

            items.append(
                AttentionItem(
                    project=project["project_name"],
                    title=title,
                    status=status,
                )
            )

        return items

    def get_ai_updates(self):
        """
        Returns project overview cards for the dashboard.
        """

        updates = []
        projects = self.metadata.get_projects_metadata()

        for project in projects:

            updates.append(
                AIUpdate(
                    project=project["project_name"],
                    summary=(
                        f'{project["status"]} • '
                        f'{project["documents"]} documents indexed • '
                        f'{project["chunks"]} knowledge chunks available'
                    ),
                )
            )

        return updates
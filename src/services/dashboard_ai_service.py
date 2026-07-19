from src.core.config import PROJECTS
from src.models.dashboard_models import AttentionItem, AIUpdate
from src.services.intelligence_service import IntelligenceService
from src.services.dashboard_cache import (
    get_attention,
    set_attention,
    get_updates,
    set_updates,
)

class DashboardAIService:
    """
    Aggregates AI insights across all enterprise projects.
    """

    def __init__(self):
        self.intelligence = IntelligenceService()

    def _map_status_to_severity(self, status: str) -> str:
        status = status.lower()

        if status == "pending":
            return "HIGH"

        if status == "in progress":
            return "MEDIUM"

        if status == "completed":
            return "LOW"

        return "MEDIUM"

    def get_attention_items(self):
        cached = get_attention()

        if cached is not None:
            return cached

        items = []

        for project_id in PROJECTS.keys():
            result = self.intelligence.action_items.extract_tasks(project_id)

            if not result["success"]:
                continue

            collection = result["data"]

            for task in collection.items:
                items.append(
                    AttentionItem(
                        project=project_id,
                        title=task.task,
                        severity=self._map_status_to_severity(task.status),
                    )
                )

        set_attention(items)

        return items

    def get_ai_updates(self):
        cached = get_updates()

        if cached is not None:
            return cached

        updates = []

        for project_id in PROJECTS.keys():
            result = self.intelligence.summarizer.generate_summary(project_id)

            if not result["success"]:
                continue

            summary = result["data"]

            updates.append(
                AIUpdate(
                    project=project_id,
                    summary=summary.executive_summary,
                )
            )

        set_updates(updates)

        return updates
import logging
from src.week3_project_intelligence.services.base import BaseIntelligenceService
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.schemas import InsightReport
from src.week3_project_intelligence.prompts import INSIGHTS_PROMPT

logger = logging.getLogger(__name__)

class StrategicInsightGenerator(BaseIntelligenceService):
    def __init__(self, tools: ProjectIntelligenceTools):
        super().__init__(tools, InsightReport)

    def generate_insights(self, project_id: str) -> dict:
        logger.info(f"Generating strategic insights for '{project_id}'...")
        
        overview_data = self.tools.get_project_overview(project_id)
        if not overview_data["success"]:
            return {"success": False, "error": overview_data["message"]}

        result = self._generate_structured_output(
            INSIGHTS_PROMPT, 
            {"context": overview_data['context']}
        )
        
        if not result["success"]:
            return result
        
        # Enrich metadata
        result["metadata"].update({
            "project_id": project_id,
            "sources": overview_data["sources"],
            "stats": overview_data.get("stats", {})
        })
        
        return result
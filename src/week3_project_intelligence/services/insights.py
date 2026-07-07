"""
Strategic Insights Engine.
Inherits from BaseIntelligenceService to analyze cross-domain intelligence.
"""
import logging
from src.week3_project_intelligence.services.base import BaseIntelligenceService
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.schemas import InsightReport
from src.week3_project_intelligence.prompts import INSIGHTS_PROMPT

logger = logging.getLogger(__name__)

class StrategicInsightEngine(BaseIntelligenceService):
    def __init__(self, tools: ProjectIntelligenceTools):
        # Pass our specific schema up to the base class
        super().__init__(tools, InsightReport)

    def generate_report(self, project_id: str) -> dict:
        """Public API: Executes the complete insight generation pipeline."""
        logger.info(f"Gathering cross-domain intelligence for '{project_id}'...")
        
        # 1. Get full cross-domain context for deep analysis
        overview_data = self.tools.get_project_overview(project_id)
        if not overview_data["success"]:
            return {"success": False, "error": overview_data["message"]}

        # 2. Execute Base Pipeline
        result = self._generate_structured_output(
            prompt_template=INSIGHTS_PROMPT, 
            prompt_kwargs={"context": overview_data['context']}
        )
        
        if not result["success"]:
            return result
            
        # 3. Merge Base Telemetry with Service Telemetry
        final_metadata = result["metadata"]
        final_metadata.update({
            "sources": overview_data["sources"],
            "stats": overview_data.get("stats", {})
        })
        
        # 4. Return standard payload
        return {
            "success": True,
            "data": result["data"],
            "metadata": final_metadata
        }
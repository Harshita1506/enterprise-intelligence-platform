"""
Risk Analyzer.
Analyzes project context to identify hidden threats and blockers.
"""
import logging
from src.week3_project_intelligence.services.base import BaseIntelligenceService
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.schemas import RiskCollection
from src.week3_project_intelligence.prompts import RISK_ANALYSIS_PROMPT

logger = logging.getLogger(__name__)

class RiskAnalyzer(BaseIntelligenceService):
    def __init__(self, tools: ProjectIntelligenceTools):
        super().__init__(tools, RiskCollection)

    def analyze_risks(self, project_id: str) -> dict:
        logger.info(f"Analyzing risks for '{project_id}'...")
        
        overview_data = self.tools.get_project_overview(project_id)
        if not overview_data["success"]:
            return {"success": False, "error": overview_data["message"]}

        # Log retrieval performance for evaluation
        logger.info(
            f"Retrieved {overview_data['stats']['unique_chunks_kept']} unique chunks for risk analysis."
        )

        result = self._generate_structured_output(
            RISK_ANALYSIS_PROMPT, 
            {"context": overview_data['context']}
        )
        
        if not result["success"]:
            return result
        
        # Enforce metadata consistency
        result["metadata"].update({
            "project_id": project_id,
            "sources": overview_data["sources"],
            "stats": overview_data.get("stats", {})
        })
        
        return result
"""
Project Summarization Engine.
Inherits from BaseIntelligenceService to leverage the robust LLM pipeline.
"""
import logging
from src.week3_project_intelligence.services.base import BaseIntelligenceService
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.schemas import ProjectSummary
from src.week3_project_intelligence.prompts import SUMMARY_PROMPT

logger = logging.getLogger(__name__)

class ProjectSummarizer(BaseIntelligenceService):
    def __init__(self, tools: ProjectIntelligenceTools):
        super().__init__(tools, ProjectSummary)

    def generate_summary(self, project_id: str) -> dict:
        """Public API: Executes the complete summarization pipeline."""
        logger.info(f"Compiling intelligence for '{project_id}'...")
        
        overview_data = self.tools.get_project_overview(project_id)
        if not overview_data["success"]:
            return {"success": False, "error": overview_data["message"]}

        result = self._generate_structured_output(
            prompt_template=SUMMARY_PROMPT, 
            prompt_kwargs={"context": overview_data['context']}
        )
        
        if not result["success"]:
            return result

        # Immutably attach data provenance
        summary: ProjectSummary = result["data"]
        final_summary = summary.model_copy(update={"sources_used": overview_data["sources"]})
        
        # Merge Base Telemetry with Service Telemetry
        final_metadata = result["metadata"]
        final_metadata.update({
            "sources": overview_data["sources"],
            "stats": overview_data.get("stats", {})
        })
        
        # Standardized return contract
        return {
            "success": True,
            "data": final_summary,
            "metadata": final_metadata
        }
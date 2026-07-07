"""
Project Summarization Engine.
Inherits from BaseIntelligenceService to leverage the robust LLM pipeline.
"""
import logging
from src.week3_project_intelligence.services.base import BaseIntelligenceService
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.schemas import ProjectSummary, IntelligenceResult
from src.week3_project_intelligence.prompts import SUMMARY_PROMPT

logger = logging.getLogger(__name__)

class ProjectSummarizer(BaseIntelligenceService):
    def __init__(self, tools: ProjectIntelligenceTools):
        # Pass the specific schema (ProjectSummary) to the base class
        super().__init__(tools, ProjectSummary)

    def generate_summary(self, project_id: str) -> IntelligenceResult[ProjectSummary]:
        """
        Public API: Executes the complete summarization pipeline
        returning a type-safe IntelligenceResult.
        """
        logger.info(f"Compiling intelligence for '{project_id}'...")
        
        # 1. Get Context
        overview_data = self.tools.get_project_overview(project_id)
        if not overview_data["success"]:
            return IntelligenceResult(success=False, error=overview_data["message"])

        # 2. Execute Base Pipeline
        # We use the method inherited from BaseIntelligenceService
        result = self._generate_structured_output(
            prompt_template=SUMMARY_PROMPT, 
            prompt_kwargs={"context": overview_data['context']}
        )
        
        if not result.success:
            return result

        # 3. Immutably attach data provenance
        # We access result.data (which is the ProjectSummary Pydantic model)
        summary: ProjectSummary = result.data
        final_summary = summary.model_copy(update={"sources_used": overview_data["sources"]})
        
        # 4. Update metadata with domain-specific stats
        result.metadata.sources = overview_data["sources"]
        result.metadata.stats = overview_data.get("stats", {})
        
        # 5. Return standardized IntelligenceResult
        return IntelligenceResult(
            success=True, 
            data=final_summary, 
            metadata=result.metadata
        )
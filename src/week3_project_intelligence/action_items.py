"""
Action Item Extraction Engine.
Inherits from BaseIntelligenceService to securely extract pending tasks.
"""
import logging
from typing import Dict, Any
from src.week3_project_intelligence.services.base import BaseIntelligenceService
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.schemas import ActionItemCollection
from src.week3_project_intelligence.prompts import ACTION_ITEMS_PROMPT

logger = logging.getLogger(__name__)

class ActionItemExtractor(BaseIntelligenceService):
    def __init__(self, tools: ProjectIntelligenceTools):
        # Initialize with the base class using the ActionItemCollection schema
        super().__init__(tools, ActionItemCollection)

    def extract_tasks(self, project_id: str) -> Dict[str, Any]:
        """Public API: Executes the complete task extraction pipeline."""
        logger.info(f"Scanning actionable context for '{project_id}'...")
        
        # 1. Get targeted context via Semantic Tools
        context_data = self.tools.get_actionable_context(project_id)
        if not context_data["success"]:
            return {"success": False, "error": context_data["message"]}

        # 2. Execute Base Pipeline
        # We use the standardized _generate_structured_output method
        result = self._generate_structured_output(
            prompt_template=ACTION_ITEMS_PROMPT, 
            prompt_kwargs={"context": context_data['context']}
        )
        
        if not result["success"]:
            return result

        # 3. Immutably enforce data provenance
        # Explicit type annotation for clarity and IDE support
        collection: ActionItemCollection = result["data"]
        fallback_source = ", ".join(context_data["sources"])
        
        updated_items = [
            item.model_copy(update={
                "source": fallback_source if not item.source or item.source == "Unknown" else item.source
            })
            for item in collection.items
        ]
        
        final_collection = collection.model_copy(update={
            "items": updated_items, 
            "project_id": project_id
        })

        # 4. Merge telemetry (Base Metadata + Service Specific Context)
        final_metadata = result["metadata"]
        final_metadata.update({
            "sources": context_data["sources"],
            "stats": context_data.get("stats", {})
        })

        return {
            "success": True,
            "data": final_collection,
            "metadata": final_metadata
        }
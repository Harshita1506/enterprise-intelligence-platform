"""
Action Item Extraction Engine.
Specifically targets meeting notes and sprint reports to extract pending tasks.
"""
import logging
from pydantic import ValidationError
from src.core.models import get_chat_llm
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.schemas import ActionItemCollection
from src.week3_project_intelligence.prompts import ACTION_ITEMS_PROMPT

logger = logging.getLogger(__name__)

class ActionItemExtractor:
    """Scans targeted project documents to extract and assign tasks."""
    
    def __init__(self, tools: ProjectIntelligenceTools):
        self.tools = tools
        self.llm = get_chat_llm()
        self.structured_llm = self.llm.with_structured_output(ActionItemCollection)

    def _get_targeted_context(self, project_id: str) -> dict:
        """Fetches only actionable domains (Meetings and Sprints)."""
        logger.info(f"Scanning meeting notes and sprint reports for '{project_id}'...")
        
        notes_data = self.tools.search_meeting_notes(project_id)
        sprint_data = self.tools.search_sprint_reports(project_id)
        
        # We only consider it a hard failure if BOTH fail. 
        if not notes_data["success"] and not sprint_data["success"]:
             return {"success": False, "message": "Failed to retrieve any notes or sprint reports."}

        combined_context = (
            f"--- MEETING NOTES ---\n{notes_data.get('context', 'None found')}\n\n"
            f"--- SPRINT REPORTS ---\n{sprint_data.get('context', 'None found')}"
        )
        
        combined_sources = list(set(notes_data.get("sources", []) + sprint_data.get("sources", [])))
        
        return {
            "success": True,
            "context": combined_context,
            "sources": combined_sources
        }

    def _extract_items(self, context: str) -> ActionItemCollection:
        """Constructs the prompt and executes the LLM generation."""
        logger.info("Extracting action items via structured output...")
        prompt = ACTION_ITEMS_PROMPT.format_messages(context=context)
        return self.structured_llm.invoke(prompt)

    def extract_tasks(self, project_id: str) -> dict:
        """
        Public API: Executes the complete extraction pipeline.
        """
        context_data = self._get_targeted_context(project_id)
        
        if not context_data["success"]:
            logger.error(context_data['message'])
            return {"success": False, "error": context_data["message"]}

        try:
            collection = self._extract_items(context_data['context'])
            
            # Enforce data provenance on each extracted item
            for item in collection.items:
                if item.source == "Unknown" or not item.source:
                    item.source = ", ".join(context_data["sources"])

            return {
                "success": True,
                "data": collection,
                "metadata": {
                    "sources": context_data["sources"],
                    "items_found": len(collection.items)
                }
            }
            
        except ValidationError as e:
            logger.error("LLM failed to match the Action Item schema.")
            return {"success": False, "error": f"Schema Validation Error: {e}"}
        except Exception as e:
            logger.error(f"Unexpected generation error: {e}")
            return {"success": False, "error": str(e)}
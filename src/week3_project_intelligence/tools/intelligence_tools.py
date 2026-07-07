"""
Project Intelligence Tools.
Provides highly semantic, agent-ready data-fetching capabilities.
"""
import hashlib
from langchain_core.documents import Document
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week3_project_intelligence.formatters import format_structured_response
from src.week3_project_intelligence.prompts import (
    REQUIREMENTS_QUERY, MEETING_NOTES_QUERY, SPRINT_REPORTS_QUERY
)

class ProjectIntelligenceTools:
    def __init__(self, kb: EnterpriseKnowledgeBase):
        self.kb = kb

    def _validate_project(self, project_id: str):
        """Fail-fast validation for project IDs."""
        projects = self.kb.get_available_projects()
        if project_id and project_id not in projects:
            raise ValueError(f"Unknown project ID: '{project_id}'. Available: {list(projects.keys())}")

    def _retrieve(self, query: str, project_id: str) -> list[Document]:
        """Private helper to DRY up retrieval calls."""
        self._validate_project(project_id)
        return self.kb.retrieve_documents(query=query, project_id=project_id)

    def _deduplicate_documents(self, docs: list[Document]) -> list[Document]:
        """Legacy helper: Use _filter_existing for better cross-category deduplication."""
        seen_ids = set()
        return self._filter_existing(docs, seen_ids)

    def _filter_existing(self, docs: list[Document], seen_ids: set) -> list[Document]:
        """Helper to deduplicate documents against a shared seen_ids set."""
        unique = []
        for d in docs:
            c_id = d.metadata.get("chunk_id", hashlib.sha256(d.page_content.encode("utf-8")).hexdigest())
            if c_id not in seen_ids:
                seen_ids.add(c_id)
                unique.append(d)
        return unique

    # --- SEMANTIC AGENT TOOLS ---

    def search_requirements(self, project_id: str) -> dict:
        docs = self._retrieve(REQUIREMENTS_QUERY, project_id)
        return format_structured_response(docs, "Requirements retrieved successfully.")

    def search_meeting_notes(self, project_id: str) -> dict:
        docs = self._retrieve(MEETING_NOTES_QUERY, project_id)
        return format_structured_response(docs, "Meeting notes retrieved successfully.")

    def search_sprint_reports(self, project_id: str) -> dict:
        docs = self._retrieve(SPRINT_REPORTS_QUERY, project_id)
        return format_structured_response(docs, "Sprint reports retrieved successfully.")

    def get_project_overview(self, project_id: str) -> dict:
        self._validate_project(project_id)
        
        req_docs = self._retrieve(REQUIREMENTS_QUERY, project_id)
        note_docs = self._retrieve(MEETING_NOTES_QUERY, project_id)
        sprint_docs = self._retrieve(SPRINT_REPORTS_QUERY, project_id)
        
        # Cross-category deduplication
        seen_ids = set()
        u_reqs = self._filter_existing(req_docs, seen_ids)
        u_notes = self._filter_existing(note_docs, seen_ids)
        u_sprints = self._filter_existing(sprint_docs, seen_ids)
        
        stats = {
            "retrieved_chunks_raw": len(req_docs) + len(note_docs) + len(sprint_docs),
            "unique_chunks_kept": len(u_reqs) + len(u_notes) + len(u_sprints),
        }
        stats["saved_chunks"] = stats["retrieved_chunks_raw"] - stats["unique_chunks_kept"]
        
        req_data = format_structured_response(u_reqs)
        note_data = format_structured_response(u_notes)
        sprint_data = format_structured_response(u_sprints)
        
        all_sources = list(set(req_data.get("sources", []) + note_data.get("sources", []) + sprint_data.get("sources", [])))
        combined_context = (
            f"--- REQUIREMENTS ---\n{req_data.get('context', 'None found.')}\n\n"
            f"--- MEETING NOTES ---\n{note_data.get('context', 'None found.')}\n\n"
            f"--- SPRINT STATUS ---\n{sprint_data.get('context', 'None found.')}"
        )
        
        return {
            "success": True,
            "message": "Project overview compiled successfully.",
            "stats": stats,
            "context": combined_context,
            "sources": all_sources,
            "documents": u_reqs + u_notes + u_sprints
        }

    def get_actionable_context(self, project_id: str) -> dict:
        """Aggregates Meeting Notes and Sprint Reports, deduplicating the chunks."""
        self._validate_project(project_id)
        
        note_docs = self._retrieve(MEETING_NOTES_QUERY, project_id)
        sprint_docs = self._retrieve(SPRINT_REPORTS_QUERY, project_id)
        
        # Cross-category deduplication
        seen_ids = set()
        unique_docs = self._filter_existing(note_docs + sprint_docs, seen_ids)
        
        stats = {
            "retrieved_chunks_raw": len(note_docs) + len(sprint_docs),
            "unique_chunks_kept": len(unique_docs),
            "saved_chunks": (len(note_docs) + len(sprint_docs)) - len(unique_docs)
        }
        
        formatted = format_structured_response(unique_docs)
        
        return {
            "success": True,
            "message": "Actionable context compiled successfully.",
            "stats": stats,
            "context": formatted.get("context", "None found."),
            "sources": formatted.get("sources", []),
            "documents": unique_docs
        }
"""
Deterministic Entity Extractor.
Isolates project identification from LLM intent routing to prevent hallucinations.
"""
from typing import Optional
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase

class ProjectIdentifier:
    def __init__(self):
        self.kb = EnterpriseKnowledgeBase()
        # Cache available projects as lowercase for robust matching
        self.available_projects = {
            k.lower(): k for k in self.kb.get_available_projects().keys()
        }

    def extract(self, query: str) -> str:
        """
        Deterministically extracts the project ID based on known KB projects.
        Returns 'Unknown' if no exact match is found.
        """
        query_lower = query.lower()
        for proj_lower, original_case in self.available_projects.items():
            if proj_lower in query_lower:
                return original_case
        return "Unknown"
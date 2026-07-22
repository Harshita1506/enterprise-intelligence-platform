"""
Deterministic Entity Extractor.
Isolates project identification from LLM intent routing to prevent hallucinations.
"""

from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week4_agents.project_resolver import ProjectResolver


class ProjectIdentifier:
    def __init__(self):
        self.kb = EnterpriseKnowledgeBase()

        # Keep this for backward compatibility with dependent files
        self.available_projects = {
            k.lower(): k
            for k in self.kb.get_available_projects().keys()
        }

        # Initialize deterministic project resolver
        self.resolver = ProjectResolver(self.available_projects)

    def extract(self, query: str) -> str:
        """
        Deterministically extracts the project ID.

        Resolution order:
        1. Project Resolver (aliases, normalization, fuzzy matching)
        2. Legacy exact substring matching
        3. Unknown
        """

        # Preferred deterministic resolver
        resolved = self.resolver.resolve(query)

        if resolved:
            return resolved

        # Legacy fallback (maintained for compatibility)
        query_lower = query.lower()

        for proj_lower, original_case in self.available_projects.items():
            if proj_lower in query_lower:
                return original_case

        return "Unknown"
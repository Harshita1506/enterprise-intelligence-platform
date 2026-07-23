"""
Deterministic Project Resolver.

Maps natural language project references to canonical project IDs
without using an LLM.
"""

import re
from difflib import get_close_matches


STOP_WORDS = {
    "project",
    "system",
    "platform",
    "application",
    "app",
    "ai",
}


def normalize(text: str) -> str:
    """
    Normalize text for deterministic matching.
    """

    text = text.lower()

    text = text.replace("_", " ")
    text = text.replace("-", " ")

    # Remove punctuation
    text = re.sub(r"[^\w\s]", "", text)

    # Remove filler words
    words = [
        word
        for word in text.split()
        if word not in STOP_WORDS
    ]

    return " ".join(words).strip()


class ProjectResolver:
    """
    Resolves free-text project mentions into canonical project IDs.
    """

    def __init__(self, projects: dict[str, str]):

        self.lookup = {}

        # ----------------------------
        # Build lookup from project IDs
        # ----------------------------
        for project_id in projects.values():

            normalized = normalize(project_id)

            self.lookup[normalized] = project_id

            # Readable version
            readable = project_id.replace("_", " ")
            self.lookup[normalize(readable)] = project_id

        # ----------------------------
        # Manual aliases
        # ----------------------------
        aliases = {
            "customer_portal_modernization": [
                "customer",
                "portal",
                "customer portal",
                "customer portal modernization",
            ],

            "inventory_management_ai": [
                "inventory",
                "inventory management",
                "inventory ai",
                "inventory management ai",
            ],

            "healthcare_appointment_system": [
                "healthcare",
                "appointment",
                "appointment system",
                "healthcare appointment",
                "healthcare appointment system",
            ],

            "recruitment_platform": [
                "recruitment",
                "hr",
                "hr recruitment",
                "recruitment platform",
            ],

            "smart_manufacturing_dashboard": [
                "manufacturing",
                "manufacturing dashboard",
                "smart manufacturing",
                "smart manufacturing dashboard",
                "manufacturing_dashboard",
                
            ],
        }

        for project_id, names in aliases.items():

            for alias in names:
                self.lookup[normalize(alias)] = project_id

    def resolve(self, query: str) -> str | None:
        """
        Returns canonical project ID if found,
        otherwise None.
        """

        normalized_query = normalize(query)

        # ----------------------------
        # Exact / substring match
        # ----------------------------
        for alias, project_id in self.lookup.items():

            if alias in normalized_query:
                return project_id

        # ----------------------------
        # Fuzzy fallback
        # ----------------------------
        matches = get_close_matches(
            normalized_query,
            self.lookup.keys(),
            n=1,
            cutoff=0.65,
        )

        if matches:
            return self.lookup[matches[0]]

        return None
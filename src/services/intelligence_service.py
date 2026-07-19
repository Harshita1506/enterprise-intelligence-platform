from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools

from src.week3_project_intelligence.services.summarizer import ProjectSummarizer
from src.week3_project_intelligence.services.action_items import ActionItemExtractor
from src.week3_project_intelligence.services.risk_analyzer import RiskAnalyzer
from src.week3_project_intelligence.services.strategic_insight_generator import (
    StrategicInsightGenerator,
)


class IntelligenceService:
    """
    Thin wrapper around the existing Week 3 intelligence services.

    Reuses the existing architecture without modifying Weeks 2–5.
    """

    def __init__(self):
        kb = EnterpriseKnowledgeBase()
        tools = ProjectIntelligenceTools(kb)

        self.summarizer = ProjectSummarizer(tools)
        self.action_items = ActionItemExtractor(tools)
        self.risk_analyzer = RiskAnalyzer(tools)
        self.insights = StrategicInsightGenerator(tools)
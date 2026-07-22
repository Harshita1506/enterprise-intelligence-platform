from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.services.risk_analyzer import RiskAnalyzer

kb = EnterpriseKnowledgeBase()
tools = ProjectIntelligenceTools(kb)

service = RiskAnalyzer(tools)

result = service.analyze_risks("customer_portal")

print(result)
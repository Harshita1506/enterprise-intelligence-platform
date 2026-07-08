"""
Agent Tool Registry.
Lazily loads and registers Week 3 Intelligence Services as LLM-callable tools.
"""
from enum import Enum
from typing import Callable, Any
from langchain_core.tools import tool

from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.services.summarizer import ProjectSummarizer
from src.week3_project_intelligence.services.action_items import ActionItemExtractor
from src.week3_project_intelligence.services.risk_analyzer import RiskAnalyzer
from src.week3_project_intelligence.services.strategic_insight_generator import StrategicInsightGenerator

class ServiceName(str, Enum):
    SUMMARIZER = "summarizer"
    TASKS = "tasks"
    RISK = "risk"
    INSIGHTS = "insights"

# Lazy-load cache
_SERVICES_CACHE = None

def _get_services() -> dict:
    """Lazily initializes and caches enterprise services."""
    global _SERVICES_CACHE
    if _SERVICES_CACHE is None:
        kb = EnterpriseKnowledgeBase()
        base_tools = ProjectIntelligenceTools(kb)
        
        _SERVICES_CACHE = {
            ServiceName.SUMMARIZER: ProjectSummarizer(base_tools),
            ServiceName.TASKS: ActionItemExtractor(base_tools),
            ServiceName.RISK: RiskAnalyzer(base_tools),
            ServiceName.INSIGHTS: StrategicInsightGenerator(base_tools)
        }
    return _SERVICES_CACHE

def _get_service(name: ServiceName) -> Any:
    """Helper to fetch a specific service securely."""
    return _get_services()[name]

def _execute(service_call: Callable[[], dict]) -> dict:
    """Centralized execution and error handling for all agent tools."""
    result = service_call()
    if result["success"]:
        return result["data"].model_dump()
    raise RuntimeError(f"Tool Execution Failed: {result.get('error', 'Unknown error')}")

# --- AGENT TOOLS ---

@tool
def summarize_project(project_id: str) -> dict:
    """
    Returns an executive summary including current progress, key features, action items, blockers, and project health.
    Input: project_id (str)
    """
    return _execute(lambda: _get_service(ServiceName.SUMMARIZER).generate_summary(project_id))

@tool
def extract_action_items(project_id: str) -> dict:
    """
    Returns all pending tasks, assigned owners, and task statuses for a project.
    Input: project_id (str)
    """
    return _execute(lambda: _get_service(ServiceName.TASKS).extract_tasks(project_id))

@tool
def analyze_project_risks(project_id: str) -> dict:
    """
    Returns identified hidden threats, dependencies, and blockers along with their severities and recommendations.
    Input: project_id (str)
    """
    return _execute(lambda: _get_service(ServiceName.RISK).analyze_risks(project_id))

@tool
def generate_executive_insights(project_id: str) -> dict:
    """
    Returns high-level strategic intelligence including health forecast, critical focus areas, and management recommendations.
    Input: project_id (str)
    """
    return _execute(lambda: _get_service(ServiceName.INSIGHTS).generate_insights(project_id))

# --- REGISTRY EXPORT ---

ALL_PROJECT_TOOLS = [
    summarize_project,
    extract_action_items,
    analyze_project_risks,
    generate_executive_insights
]
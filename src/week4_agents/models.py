"""
Agent Layer Model Configuration.
Provides dedicated model instances for routing, planning, and agent execution.
"""
from langchain_core.language_models.chat_models import BaseChatModel
from src.core.models import get_chat_llm

def get_router_llm() -> BaseChatModel:
    """
    Returns a highly deterministic LLM optimized strictly for rapid classification 
    and routing decisions.
    """
    # Overriding temperature or utilizing a fast-pass model flavor if configured
    return get_chat_llm(temperature=0.0)

def get_agent_llm() -> BaseChatModel:
    """
    Returns the primary reasoning LLM for running the ReAct loop and tool output synthesis.
    """
    return get_chat_llm(temperature=0.2)
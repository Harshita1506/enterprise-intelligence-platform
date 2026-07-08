"""
Execution Strategy Orchestrator.
Deterministically decides the execution path (Chat, Single Tool, Multi-Step) 
without altering the Week 4 Semantic Router.
"""
from enum import Enum
from typing import TYPE_CHECKING

from src.week4_agents.schemas import ToolType

if TYPE_CHECKING:
    from src.week5_agent_workflow.state import AgentState

class ExecutionMode(str, Enum):
    GENERAL_CHAT = "general_chat"
    SINGLE_TOOL = "single_tool"
    MULTI_STEP = "multi_step"

class ExecutionStrategy:
    """
    Evaluates the Week 4 RoutingDecision to determine Week 5 graph orchestration.
    """
    def determine(self, state: "AgentState") -> ExecutionMode:
        # 1. No Tool Required -> Chat
        if not state.decision or not state.decision.requires_tool_execution:
            return ExecutionMode.GENERAL_CHAT

        # 2. Multi-Step Heuristics
        # Keywords implying synthesis, comparison, or deep analysis
        complex_triggers = [
            "recommend", "compare", "overall", "should management", 
            "deep analysis", "and", "all", "health", "report"
        ]
        query_lower = state.query.lower()

        if any(trigger in query_lower for trigger in complex_triggers):
            return ExecutionMode.MULTI_STEP

        # 3. Default to Single Tool if a tool execution is required
        if state.decision.requires_tool_execution:
            return ExecutionMode.SINGLE_TOOL

        # Failsafe fallback
        return ExecutionMode.GENERAL_CHAT
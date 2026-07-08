"""
Week 5 Agent Workflow State.
Extends the frozen Week 4 AgentState with persistent conversational fields
required for LangGraph's checkpointed, multi-turn execution.
"""
from typing import Dict, Any, Optional
from pydantic import Field
from src.week5_agent_workflow.planner_schemas import ExecutionPlan, ToolName
from src.week5_agent_workflow.execution_strategy import ExecutionMode
from typing import Optional
from pydantic import Field
from src.week4_agents.state import AgentState as BaseAgentState


class AgentState(BaseAgentState):
    """
    Week 4 = Stateless Agent (single-shot query -> response)
    Week 5 = Stateful LangGraph Agent (persisted across conversational turns)
    """
    active_project: Optional[str] = Field(
        default=None,
        description="Persistent project ID remembered across conversational turns"
    )
    conversation_turn: int = Field(
        default=0,
        description="Number of completed turns in this conversation thread"
    )
    execution_mode: ExecutionMode = ExecutionMode.GENERAL_CHAT
    execution_plan: Optional[ExecutionPlan] = None
    tool_results: Dict[ToolName, Any] = Field(default_factory=dict)
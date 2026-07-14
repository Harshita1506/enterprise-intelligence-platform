"""
Week 5 LangGraph State.

Extends the frozen Week 4 AgentState with only the
minimal conversational fields required by LangGraph.

Business logic remains inside week4_agents.
"""

from typing import Optional
from pydantic import Field

from src.week4_agents.state import AgentState as BaseAgentState


class AgentState(BaseAgentState):
    """
    LangGraph state.

    Week 4:
        Stateless single-query execution.

    Week 5:
        Adds only lightweight conversation persistence.
    """

    active_project: Optional[str] = Field(
        default=None,
        description="Most recently resolved project for follow-up queries."
    )

    conversation_turn: int = Field(
        default=0,
        description="Conversation turn counter."
    )
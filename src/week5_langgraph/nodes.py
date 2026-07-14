"""
LangGraph Nodes.

Week 5 introduces LangGraph orchestration while reusing the
business logic implemented in Week 4.

Every node is intentionally a thin wrapper around the
ProjectIntelligenceAgent methods.
"""

import logging

from src.week4_agents.agent import ProjectIntelligenceAgent
from src.week5_langgraph.state import AgentState

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------
# Shared Agent Instance
# ---------------------------------------------------------------------

agent = ProjectIntelligenceAgent()


# ---------------------------------------------------------------------
# Route & Extract Node
# ---------------------------------------------------------------------

def route_node(state: AgentState) -> AgentState:
    """
    Performs:
        - Intent routing
        - Project identification

    Delegates to Week 4.
    """

    logger.info("LangGraph :: Route Node")

    return agent._route_and_extract(state)


# ---------------------------------------------------------------------
# Conditional Edge Helper
# ---------------------------------------------------------------------

def should_execute_tool(state: AgentState) -> str:
    """
    Determines the next node.

    Returns:
        execute
        synthesize
    """

    if (
        state.decision is not None
        and state.decision.requires_tool_execution
    ):
        return "execute"

    return "synthesize"


# ---------------------------------------------------------------------
# Execute Tool Node
# ---------------------------------------------------------------------

def execute_node(state: AgentState) -> AgentState:
    """
    Executes the selected enterprise intelligence tool.

    Delegates to Week 4.
    """

    logger.info("LangGraph :: Execute Node")

    return agent._execute(state)


# ---------------------------------------------------------------------
# Synthesis Node
# ---------------------------------------------------------------------

def synthesize_node(state: AgentState) -> AgentState:
    """
    Produces the final natural language answer.

    Delegates to Week 4.
    """

    logger.info("LangGraph :: Synthesis Node")

    state = agent._synthesize(state)

    #
    # Persist conversational context
    #

    if state.project_id and state.project_id != "Unknown":
        state.active_project = state.project_id

    state.conversation_turn += 1

    return state
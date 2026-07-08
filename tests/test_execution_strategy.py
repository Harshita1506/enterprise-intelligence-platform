import pytest
from src.week5_agent_workflow.execution_strategy import ExecutionStrategy, ExecutionMode
from src.week5_agent_workflow.state import AgentState
from src.week4_agents.schemas import RouteDecision, ToolType

@pytest.fixture
def strategy():
    return ExecutionStrategy()

def test_general_chat_routing(strategy):
    """If no tool is required, it must route to General Chat."""
    decision = RouteDecision(
        requires_tool_execution=False, 
        selected_tool=ToolType.DIRECT_ANSWER, 
        confidence=1.0, 
        reasoning="Greeting"
    )
    state = AgentState(query="Hello there", decision=decision)
    assert strategy.determine(state) == ExecutionMode.GENERAL_CHAT

def test_single_tool_routing(strategy):
    """Explicit single tool requests bypass the Planner."""
    decision = RouteDecision(
        requires_tool_execution=True, 
        selected_tool=ToolType.SUMMARY, 
        confidence=0.9, 
        reasoning="Direct summary request"
    )
    state = AgentState(query="Summarize Project Alpha", decision=decision)
    assert strategy.determine(state) == ExecutionMode.SINGLE_TOOL
    
# Note: In a true production environment, MULTI_STEP logic would either be 
# explicitly defined in the Week 4 schema or handled via specific orchestration rules here.
# For now, our ExecutionStrategy safely defaults to SINGLE_TOOL if a tool is present, 
# preventing accidental infinite planning loops.
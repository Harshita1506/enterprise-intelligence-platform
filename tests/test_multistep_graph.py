import pytest
from unittest.mock import patch
from src.week5_agent_workflow.graph import enterprise_agent_app
from src.week4_agents.schemas import RouteDecision, ToolType

@patch("src.week5_agent_workflow.nodes._core_agent")
@patch("src.week5_agent_workflow.nodes._planner")
@patch("src.week5_agent_workflow.nodes._execution_engine")
def test_graph_full_invocation(mock_engine, mock_planner, mock_agent):
    """
    Validates that the LangGraph workflow actually traverses nodes.
    We mock the heavy LLM/Tool layers so the graph runs instantly.
    """
    
    # 1. Setup pure Week 4 mock routing decision
    mock_decision = RouteDecision(
        requires_tool_execution=True,
        selected_tool=ToolType.SUMMARY,
        confidence=0.9,
        reasoning="Testing"
    )
    
    def mock_route(state):
        state.decision = mock_decision
        return state
        
    mock_agent._route_and_extract.side_effect = mock_route
    
    # Add mock for Single Tool Executor to prevent MagicMock return
    def mock_execute(state):
        state.node_history.append("Tool Execution")
        return state
        
    mock_agent._execute.side_effect = mock_execute
    
    # Add mock for Synthesizer to prevent MagicMock return
    def mock_synthesize(state):
        state.final_response = "Mock Response"
        return state
        
    mock_agent._synthesize.side_effect = mock_synthesize

    # 2. Invoke the graph 
    # (The Execution Strategy node will intercept this and assign SINGLE_TOOL)
    initial_state = {"query": "Test query"}
    
    # If the edges are wired incorrectly, this will hang or crash
    final_state = enterprise_agent_app.invoke(initial_state)
    
    # 3. Verify traversal reached the end
    assert final_state is not None
    assert "Finalize" in final_state["node_history"]
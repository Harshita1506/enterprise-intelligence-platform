import pytest
from src.week5_agent_workflow.execution_engine import ExecutionEngine
from src.week5_agent_workflow.planner_schemas import ExecutionPlan, ExecutionStep, ToolName
from src.week5_agent_workflow.state import AgentState

# Global trace for testing sequence
execution_trace = []

class TraceableTool:
    def __init__(self, name, return_value):
        self.name = name
        self.return_value = return_value

    def invoke(self, state: AgentState):
        execution_trace.append(self.name)
        if isinstance(self.return_value, Exception):
            raise self.return_value
        return self.return_value

@pytest.fixture(autouse=True)
def clear_trace():
    """Clear the trace before every test."""
    execution_trace.clear()

def test_engine_execution_order_and_normalization():
    """Verify tools run in exact order and outputs are wrapped in success dicts."""
    engine = ExecutionEngine({
        ToolName.SUMMARY: TraceableTool("SUMMARY", "Summary Data"),
        ToolName.RISK: TraceableTool("RISK", "Risk Data")
    })
    
    plan = ExecutionPlan(
        steps=[
            ExecutionStep(tool=ToolName.SUMMARY, reasoning="1"),
            ExecutionStep(tool=ToolName.RISK, reasoning="2")
        ],
        requires_multi_step=True
    )
    
    results = engine.execute(plan, AgentState())
    
    # 1. Verify exact order
    assert execution_trace == ["SUMMARY", "RISK"]
    
    # 2. Verify normalized output
    assert results[ToolName.SUMMARY]["success"] is True
    assert results[ToolName.SUMMARY]["data"] == "Summary Data"

def test_engine_missing_tool_in_registry():
    """Engine must gracefully handle requests for tools it doesn't have."""
    engine = ExecutionEngine({ToolName.SUMMARY: TraceableTool("SUMMARY", "OK")})
    
    plan = ExecutionPlan(
        steps=[ExecutionStep(tool=ToolName.RISK, reasoning="Missing tool")],
        requires_multi_step=False
    )
    
    results = engine.execute(plan, AgentState())
    
    assert results[ToolName.RISK]["success"] is False
    assert "not found in registry" in results[ToolName.RISK]["error"]
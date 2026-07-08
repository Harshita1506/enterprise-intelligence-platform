"""
LangGraph Orchestrator.
Defines the state machine for the Enterprise AI Agent.
"""
from langgraph.graph import StateGraph, END
from src.week5_agent_workflow.state import AgentState
from src.week5_agent_workflow.nodes import (
    route_node,
    context_resolver_node,
    execution_strategy_node,
    planner_node,
    execution_engine_node,
    single_tool_execute_node,
    synthesize_node,
    finalize_node
)

def determine_execution_path(state: AgentState) -> str:
    """Reads the deterministic mode decided by the strategy node."""
    return state.execution_mode.value

# 1. Initialize Graph
workflow = StateGraph(AgentState)

# 2. Add Nodes
workflow.add_node("router", route_node)
workflow.add_node("context_resolver", context_resolver_node)
workflow.add_node("execution_strategy", execution_strategy_node)
workflow.add_node("planner", planner_node)
workflow.add_node("multi_step_executor", execution_engine_node)
workflow.add_node("single_tool_executor", single_tool_execute_node)
workflow.add_node("synthesizer", synthesize_node)
workflow.add_node("finalizer", finalize_node)

# 3. Define Edges
workflow.set_entry_point("router")
workflow.add_edge("router", "context_resolver")
workflow.add_edge("context_resolver", "execution_strategy")

# Conditional Routing
workflow.add_conditional_edges(
    "execution_strategy",
    determine_execution_path,
    {
        "general_chat": "synthesizer",
        "single_tool": "single_tool_executor",
        "multi_step": "planner"
    }
)

# Parallel execution paths
workflow.add_edge("single_tool_executor", "synthesizer")
workflow.add_edge("planner", "multi_step_executor")
workflow.add_edge("multi_step_executor", "synthesizer")

# Finish the loop
workflow.add_edge("synthesizer", "finalizer")
workflow.add_edge("finalizer", END)

# Compile
enterprise_agent_app = workflow.compile()
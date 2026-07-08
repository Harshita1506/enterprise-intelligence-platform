"""
Agent Workflow Orchestrator.
Wires the nodes together into a compiled StateGraph.
"""
from langgraph.graph import StateGraph, START, END
from src.week5_agent_workflow.state import AgentState
from src.week5_agent_workflow.nodes import route_node, execute_node, synthesize_node

def build_workflow():
    """Constructs and compiles the Phase A linear agent workflow."""
    workflow = StateGraph(AgentState)

    # 1. Add Nodes
    workflow.add_node("Router", route_node)
    workflow.add_node("Executor", execute_node)
    workflow.add_node("Synthesizer", synthesize_node)

    # 2. Add Edges (Strictly Linear for Phase A)
    workflow.add_edge(START, "Router")
    workflow.add_edge("Router", "Executor")
    workflow.add_edge("Executor", "Synthesizer")
    workflow.add_edge("Synthesizer", END)

    # 3. Compile
    return workflow.compile()
"""
Week 5 LangGraph Workflow.

A thin orchestration layer over the frozen Week 4 agent.

Flow:

START
   │
   ▼
Route & Extract
   │
   ▼
Need Tool?
  │
 ├───────────────┐
 │               │
 ▼               ▼
Execute      Synthesize
 │               ▲
 └───────────────┘
         │
         ▼
        END
"""

from langgraph.graph import StateGraph, END

from src.week5_langgraph.state import AgentState
from src.week5_langgraph.nodes import (
    route_node,
    execute_node,
    synthesize_node,
    should_execute_tool,
)

# ---------------------------------------------------------------------
# Build Graph
# ---------------------------------------------------------------------

workflow = StateGraph(AgentState)

# ---------------------------------------------------------------------
# Register Nodes
# ---------------------------------------------------------------------

workflow.add_node("route", route_node)
workflow.add_node("execute", execute_node)
workflow.add_node("synthesize", synthesize_node)

# ---------------------------------------------------------------------
# Entry Point
# ---------------------------------------------------------------------

workflow.set_entry_point("route")

# ---------------------------------------------------------------------
# Conditional Routing
# ---------------------------------------------------------------------

workflow.add_conditional_edges(
    "route",
    should_execute_tool,
    {
        "execute": "execute",
        "synthesize": "synthesize",
    },
)

# ---------------------------------------------------------------------
# Graph Edges
# ---------------------------------------------------------------------

workflow.add_edge("execute", "synthesize")

workflow.add_edge("synthesize", END)

# ---------------------------------------------------------------------
# Compile Graph
# ---------------------------------------------------------------------

enterprise_agent_graph = workflow.compile()
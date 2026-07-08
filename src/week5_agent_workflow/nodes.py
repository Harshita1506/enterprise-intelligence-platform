"""
Graph Nodes.
Wraps execution logic into LangGraph-compatible node functions.
"""
from typing import Any

from src.week5_agent_workflow.planner_schemas import ToolName
from src.week5_agent_workflow.planner import ExecutionPlanner
from src.week5_agent_workflow.execution_engine import ExecutionEngine
from src.week5_agent_workflow.execution_strategy import ExecutionStrategy
from src.week5_agent_workflow.state import AgentState

from src.week4_agents.agent import ProjectIntelligenceAgent
from src.week4_agents.tool_registry import (
    summarize_project, 
    extract_action_items, 
    analyze_project_risks, 
    generate_executive_insights
)

# --- Adapter Pattern: Protects AgentState context for future tools ---
class ToolAdapter:
    def __init__(self, langchain_tool):
        self.tool = langchain_tool
        
    def invoke(self, state: AgentState) -> Any:
        payload = {
            "project_id": state.project_id,
            "query": state.query,
            "conversation_turn": state.conversation_turn
        }
        return self.tool.invoke(payload)

# --- Tool Registry ---
PHASE_D_REGISTRY = {
    ToolName.SUMMARY: ToolAdapter(summarize_project),
    ToolName.ACTION_ITEMS: ToolAdapter(extract_action_items),
    ToolName.RISK: ToolAdapter(analyze_project_risks),
    ToolName.INSIGHTS: ToolAdapter(generate_executive_insights)
}

# --- Module Instances ---
_core_agent = ProjectIntelligenceAgent()
_planner = ExecutionPlanner()
_execution_engine = ExecutionEngine(tool_registry=PHASE_D_REGISTRY)
_strategy = ExecutionStrategy()

# --- Nodes ---
def route_node(state: AgentState):
    return _core_agent._route_and_extract(state)

def context_resolver_node(state: AgentState):
    state.node_history.append("Context Resolver")
    if state.project_id and state.project_id != "Unknown":
        state.active_project = state.project_id
    elif state.project_id in (None, "Unknown") and state.active_project:
        state.project_id = state.active_project
    return state

def execution_strategy_node(state: AgentState):
    state.node_history.append("Execution Strategy")
    state.execution_mode = _strategy.determine(state)
    return state

def planner_node(state: AgentState):
    state.node_history.append("Planner")
    state.execution_plan = _planner.plan(query=state.query, project_id=state.project_id)
    return state

def execution_engine_node(state: AgentState):
    state.node_history.append("Execution Engine")
    if not state.execution_plan:
        return state
    
    state.tool_results.clear()
    state.tool_results = _execution_engine.execute(plan=state.execution_plan, state=state)
    return state

def single_tool_execute_node(state: AgentState):
    # Using legacy executor for 1-step tasks to bypass planner overhead
    return _core_agent._execute(state)

def synthesize_node(state: AgentState):
    return _core_agent._synthesize(state)

def finalize_node(state: AgentState):
    state.conversation_turn += 1
    state.node_history.append("Finalize")
    return state
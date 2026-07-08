"""
Graph Nodes.
Wraps Week 4 agent execution logic into LangGraph-compatible node functions.
"""
from src.week4_agents.agent import ProjectIntelligenceAgent
from src.week5_agent_workflow.state import AgentState

# Initialize the core agent to reuse its configurations and tools
_core_agent = ProjectIntelligenceAgent()

def route_node(state: AgentState):
    """Node 1: Intent Routing & Entity Extraction"""
    return _core_agent._route_and_extract(state)

def execute_node(state: AgentState):
    """Node 2: Tool Execution"""
    return _core_agent._execute(state)

def synthesize_node(state: AgentState):
    """Node 3: Final Answer Synthesis"""
    return _core_agent._synthesize(state)
"""
Week 5 LangGraph Runner.

Public entry point for the LangGraph-powered Project Intelligence Agent.
"""

import time

from src.week4_agents.agent import ProjectIntelligenceAgent
from src.week5_langgraph.graph import enterprise_agent_graph
from src.week5_langgraph.state import AgentState


class LangGraphProjectAgent:

    def __init__(self):
        self.agent = ProjectIntelligenceAgent()

    def run(self, query: str):

        start = time.time()

        state = AgentState(query=query)

        final_state = enterprise_agent_graph.invoke(state)

        if isinstance(final_state, dict):
            final_state = AgentState.model_validate(final_state)

        final_state.telemetry.total_latency_sec = round(
            time.time() - start,
            2
        )

        return self.agent._build_response(final_state)
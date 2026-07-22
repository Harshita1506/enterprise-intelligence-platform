"""
Project Intelligence Agent.
Orchestrates routing, entity extraction, tool execution, and synthesis.
"""
import time
import json
import logging
from src.week4_agents.models import get_agent_llm
from src.week4_agents.router import SemanticRouter
from src.week4_agents.extractor import ProjectIdentifier
from src.week4_agents.schemas import ToolType
from src.week4_agents.state import AgentState, AgentStatus, AgentResponse, AgentResponseMetadata
from src.week4_agents.prompts import AGENT_SYNTHESIS_PROMPT, GENERAL_CHAT_PROMPT
from src.week4_agents.tool_registry import (
    summarize_project, extract_action_items, analyze_project_risks, generate_executive_insights
)

logger = logging.getLogger(__name__)

class ProjectIntelligenceAgent:
    def __init__(self):
        self.router = SemanticRouter()
        self.extractor = ProjectIdentifier()
        self.agent_llm = get_agent_llm()
        self.tool_map = {
            ToolType.SUMMARY: summarize_project,
            ToolType.ACTION_ITEMS: extract_action_items,
            ToolType.RISK: analyze_project_risks,
            ToolType.INSIGHTS: generate_executive_insights
        }

    def _route_and_extract(self, state: AgentState) -> AgentState:
        """Node 1: Intent Routing & Entity Extraction"""
        start = time.time()
        state.node_history.append("Router & Extractor")
        
        # 1. Intent Classification
        state.decision = self.router.route_query(state.query)
        # 2. Deterministic Entity Extraction
        state.project_id = self.extractor.extract(state.query)
        
        state.status = AgentStatus.ROUTED
        state.telemetry.router_latency_sec = round(time.time() - start, 2)
        return state

    def _execute(self, state: AgentState) -> AgentState:
        """Node 2: Tool Execution"""
        start = time.time()
        state.node_history.append("Tool Execution")
        state.status = AgentStatus.EXECUTING
        
        if state.decision.selected_tool not in self.tool_map:
            state.tool_output = {"success": False, "error": f"No tool implemented for {state.decision.selected_tool.value}"}
        elif state.project_id == "Unknown":
            # Dynamically fetch the list of known projects from the extractor
            available = ", ".join(self.extractor.available_projects.values())
            state.tool_output = {
                "success": False, 
                "error": f"I can certainly help with that. Which project would you like me to look at? Currently available projects: {available}."
            }
        else:
            try:
                tool_func = self.tool_map[state.decision.selected_tool]
                logger.info("Executing tool '%s' for project '%s'", state.decision.selected_tool.value, state.project_id)
                state.tool_output = tool_func.invoke({"project_id": state.project_id})
            except Exception as e:
                import traceback
                traceback.print_exc()
                logger.error("Tool execution failed: %s", e)
                state.tool_output = {"success": False, "error": str(e)}
                state.status = AgentStatus.FAILED
                
        state.telemetry.tool_latency_sec = round(time.time() - start, 2)
        return state

    def _synthesize(self, state: AgentState) -> AgentState:
        """Node 3: Final Answer Synthesis"""
        import time
        import json
        
        start = time.time()
        state.node_history.append("Synthesis")
        state.status = AgentStatus.SYNTHESIZING
        
        try:
            if not state.decision.requires_tool_execution:
                prompt = GENERAL_CHAT_PROMPT.format_messages(query=state.query)
            else:
                tool_output_str = json.dumps(state.tool_output, indent=2) if state.tool_output else "{}"
                prompt = AGENT_SYNTHESIS_PROMPT.format_messages(query=state.query, tool_output=tool_output_str)
                
            response = self.agent_llm.invoke(prompt)
            state.final_response = response.content
            
            if state.status != AgentStatus.FAILED:
                state.status = AgentStatus.COMPLETED
                
        except Exception as e:
            logger.error("Synthesis failed: %s", e)
            
            # Graceful enterprise degradation
            state.final_response = (
                "The AI service is temporarily unavailable due to provider capacity limits. "
                "Your enterprise knowledge base remains available. Please try again in a few moments."
            )
            state.status = AgentStatus.FAILED
            
        state.telemetry.synthesis_latency_sec = round(time.time() - start, 2)
        return state

    def _build_response(self, state: AgentState) -> AgentResponse:
        """Node 4: Telemetry & Payload Assembly"""
        state.node_history.append("Response Builder")
        metadata = AgentResponseMetadata(
            tool_used=state.decision.selected_tool.value if state.decision else "NONE",
            project_id=state.project_id if state.project_id else "Unknown",
            routing_confidence=state.decision.confidence if state.decision else 0.0,
            routing_reasoning=state.decision.reasoning if state.decision else "N/A"
        )
        return AgentResponse(
            success=(state.status == AgentStatus.COMPLETED),
            response=state.final_response,
            metadata=metadata,
            telemetry=state.telemetry,
            status=state.status,
            node_history=state.node_history
        )

    def run(self, query: str) -> AgentResponse:
        """Main Orchestrator Loop"""
        import time
        start_total = time.time()
        logger.info("Agent received query: '%s'", query)
        
        state = AgentState(query=query)
        state = self._route_and_extract(state)
        
        if state.decision.requires_tool_execution:
            state = self._execute(state)
            
        state = self._synthesize(state)
        state.telemetry.total_latency_sec = round(time.time() - start_total, 2)
        
        return self._build_response(state)
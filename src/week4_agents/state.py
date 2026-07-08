"""
Agent State Models.
Defines the unified state object passed between agent nodes.
"""
from enum import Enum
from typing import Optional, Any, List
from pydantic import BaseModel, Field
from src.week4_agents.schemas import RouteDecision

class AgentStatus(str, Enum):
    RUNNING = "RUNNING"
    ROUTED = "ROUTED"
    EXECUTING = "EXECUTING"
    SYNTHESIZING = "SYNTHESIZING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class AgentTelemetry(BaseModel):
    """Granular latency tracking for observability."""
    router_latency_sec: float = 0.0
    tool_latency_sec: float = 0.0
    synthesis_latency_sec: float = 0.0
    total_latency_sec: float = 0.0

class AgentState(BaseModel):
    """The shared state object mutated by nodes in the agentic workflow."""
    query: str = Field(description="The original user query")
    project_id: Optional[str] = Field(default=None, description="Canonical project ID extracted during routing")
    decision: Optional[RouteDecision] = Field(default=None, description="The routing decision")
    tool_output: Optional[dict[str, Any]] = Field(default=None, description="Raw structured dictionary output from the tool")
    final_response: Optional[str] = Field(default=None, description="The synthesized human-readable response")
    telemetry: AgentTelemetry = Field(default_factory=AgentTelemetry, description="Pipeline latency metrics")
    status: AgentStatus = Field(default=AgentStatus.RUNNING, description="Execution status of the agent")
    node_history: List[str] = Field(default_factory=list, description="Trace of execution nodes visited")

class AgentResponseMetadata(BaseModel):
    tool_used: str
    project_id: str
    routing_confidence: float
    routing_reasoning: str

class AgentResponse(BaseModel):
    """The finalized API response returned by the agent."""
    success: bool
    response: Optional[str]
    metadata: AgentResponseMetadata
    telemetry: AgentTelemetry
    status: AgentStatus
    node_history: List[str]
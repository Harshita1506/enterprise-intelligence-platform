"""
Agent Layer Schemas.
Defines the strict contracts for the agent's internal reasoning and state management.
"""
from enum import Enum
from pydantic import BaseModel, Field

class ToolType(str, Enum):
    SUMMARY = "SUMMARY"
    RISK = "RISK"
    ACTION_ITEMS = "ACTION_ITEMS"
    INSIGHTS = "INSIGHTS"
    DIRECT_ANSWER = "DIRECT_ANSWER"

class RouteDecision(BaseModel):
    """The structured output of the Semantic Router (Intent Only)."""
    selected_tool: ToolType = Field(description="The specific tool selected to handle the query")
    reasoning: str = Field(description="One short sentence explaining the routing decision.")
    confidence: float = Field(description="Confidence score in this routing decision between 0.0 and 1.0")
    requires_tool_execution: bool = Field(description="True if a tool must be called, False if direct answer.")
"""
Evaluation Dataset.

Defines the ground-truth evaluation cases used to measure the
Enterprise AI Agent. Each case specifies the expected routing
behavior and whether multi-step reasoning should occur.
"""

from dataclasses import dataclass
from typing import List

from src.week4_agents.schemas import ToolType


@dataclass(frozen=True)
class EvaluationCase:
    """
    Represents a single evaluation scenario.
    """

    query: str
    expected_tool: ToolType
    requires_multi_step: bool
    description: str


EVALUATION_DATASET: List[EvaluationCase] = [

    # ----------------------------
    # Single Tool Queries
    # ----------------------------

    EvaluationCase(
        query="Summarize customer_portal.",
        expected_tool=ToolType.SUMMARY,
        requires_multi_step=False,
        description="Project summary retrieval"
    ),

    EvaluationCase(
        query="What are the biggest risks in customer_portal?",
        expected_tool=ToolType.RISK,
        requires_multi_step=False,
        description="Risk analysis"
    ),

    EvaluationCase(
        query="Who owns the pending work?",
        expected_tool=ToolType.ACTION_ITEMS,
        requires_multi_step=False,
        description="Action item extraction"
    ),

    EvaluationCase(
        query="Provide strategic recommendations for customer_portal.",
        expected_tool=ToolType.INSIGHTS,
        requires_multi_step=False,
        description="Strategic insights"
    ),

    # ----------------------------
    # Multi-Step Queries
    # ----------------------------

    EvaluationCase(
        query="Should management approve deployment of customer_portal?",
        expected_tool=ToolType.RISK,
        requires_multi_step=True,
        description="Risk + Executive reasoning"
    ),

    EvaluationCase(
        query="Give me a complete executive report for customer_portal.",
        expected_tool=ToolType.SUMMARY,
        requires_multi_step=True,
        description="Summary + Risk + Insights"
    ),

    EvaluationCase(
        query="Summarize customer_portal and identify major risks.",
        expected_tool=ToolType.SUMMARY,
        requires_multi_step=True,
        description="Summary followed by Risk analysis"
    ),

    EvaluationCase(
        query="Provide an executive overview with recommendations.",
        expected_tool=ToolType.SUMMARY,
        requires_multi_step=True,
        description="Summary followed by Strategic Insights"
    )
]
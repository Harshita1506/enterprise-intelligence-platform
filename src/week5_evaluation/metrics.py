"""
Evaluation Metrics.

Defines the structured metrics returned by the Enterprise Evaluation
Framework. These metrics are used to evaluate the overall agent workflow,
including routing, planning, execution, orchestration, and latency.
"""

from pydantic import BaseModel, Field


class EvaluationMetrics(BaseModel):
    """
    Metrics collected from evaluating a single enterprise query.
    """

    router_correct: bool = Field(
        ...,
        description="True if the Semantic Router selected the expected tool."
    )

    planner_correct: bool = Field(
        ...,
        description="True if the Execution Planner generated a valid execution plan."
    )

    execution_success: bool = Field(
        ...,
        description="True if every planned tool executed successfully."
    )

    graph_completed: bool = Field(
        ...,
        description="True if the LangGraph workflow reached the END node successfully."
    )

    latency_ms: float = Field(
        ...,
        ge=0.0,
        description="Total workflow latency in milliseconds."
    )

    execution_steps: int = Field(
        ...,
        ge=0,
        description="Number of execution steps performed."
    )
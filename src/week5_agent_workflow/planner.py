"""
Execution Planner Logic.
Takes a user query and determines the optimal sequence of tool executions.
"""

import logging
from typing import Optional
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

# Using the updated, centralized chat model factory
from src.core.models import get_chat_llm

from src.week5_agent_workflow.planner_schemas import ExecutionPlan, ExecutionStep, ToolName
from src.week5_agent_workflow.planner_prompts import PLANNER_PROMPT

logger = logging.getLogger(__name__)

class ExecutionPlanner:
    """
    Generates deterministic execution plans for multi-step agent workflows.

    Responsibilities:
    - Analyze user intent.
    - Select appropriate enterprise tools.
    - Produce a validated ExecutionPlan.
    - Fall back safely if planning fails.
    """
    def __init__(self):
        # Enforce deterministic behavior and strict JSON output
        self.llm = get_chat_llm(temperature=0.0, format="json")
        self.parser = PydanticOutputParser(pydantic_object=ExecutionPlan)
        self.chain = self._build_chain()

    def _build_chain(self):
        """Constructs the LangChain pipeline."""
        prompt = ChatPromptTemplate.from_messages([
            ("system", PLANNER_PROMPT),
            ("system", "Schema Instructions:\n{format_instructions}"),
            ("human", "Current Active Project: {project_context}\nUser Query: {query}")
        ])
        return prompt | self.llm | self.parser

    def _fallback_plan(self) -> ExecutionPlan:
        """Provides a safe, single-step plan if the LLM output fails validation."""
        fallback_step = ExecutionStep(
            tool=ToolName.SUMMARY,
            reasoning="Fallback execution due to planning parse error."
        )
        return ExecutionPlan(
            steps=[fallback_step],
            requires_multi_step=False
        )

    def plan(self, query: str, project_id: Optional[str] = None) -> ExecutionPlan:
        """Analyzes the query and generates a structured ExecutionPlan."""
        project_context = project_id or "Not Specified"
        
        try:
            plan = self.chain.invoke({
                "query": query,
                "project_context": project_context,
                "format_instructions": self.parser.get_format_instructions()
            })
            
            # Explicitly reject empty plans to trigger the safe fallback
            if not plan.steps:
                raise ValueError("LLM generated an empty execution plan.")
                
            return plan
            
        except Exception:
            logger.exception("Planner failed. Using fallback plan.")
            return self._fallback_plan()

    
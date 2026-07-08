"""
Semantic Decision Engine (Intent Classifier).
"""
import time
import logging
from pydantic import ValidationError
from src.week4_agents.models import get_router_llm
from src.week4_agents.schemas import RouteDecision, ToolType
from src.week4_agents.prompts import ROUTER_PROMPT

logger = logging.getLogger(__name__)

class SemanticRouter:
    def __init__(self):
        self.llm = get_router_llm()
        self.structured_llm = self.llm.with_structured_output(RouteDecision)

    def _fallback_decision(self, reason: str) -> RouteDecision:
        return RouteDecision(
            selected_tool=ToolType.DIRECT_ANSWER,
            reasoning=reason,
            confidence=0.0,
            requires_tool_execution=False
        )

    def route_query(self, query: str) -> RouteDecision:
        logger.info("Routing query: '%s'", query)
        start_time = time.time()
        
        try:
            prompt = ROUTER_PROMPT.format_messages(query=query)
            decision: RouteDecision = self.structured_llm.invoke(prompt)
            decision.confidence = max(0.0, min(1.0, decision.confidence))
            
            elapsed = time.time() - start_time
            logger.info("Router selected '%s' in %.2fs", decision.selected_tool.value, elapsed)
            return decision
            
        except ValidationError as e:
            logger.error("Router schema validation failed: %s", e)
            return self._fallback_decision(f"Schema validation failed: {e}")
        except Exception as e:
            logger.error("Router execution failed: %s", e)
            return self._fallback_decision(f"Router exception: {e}")
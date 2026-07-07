"""
Base class for all intelligence services.
Centralizes LLM invocation, structured output binding, error handling, and telemetry.
"""
import time
import logging
from typing import Type, TypeVar
from pydantic import BaseModel, ValidationError
from langchain_core.prompts import ChatPromptTemplate
from src.core.models import get_chat_llm
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools

logger = logging.getLogger(__name__)

T = TypeVar('T', bound=BaseModel)

class BaseIntelligenceService:
    def __init__(self, tools: ProjectIntelligenceTools, output_schema: Type[T]):
        self.tools = tools
        self.llm = get_chat_llm()
        self.output_schema = output_schema
        self.structured_llm = self.llm.with_structured_output(output_schema)

    def _generate_structured_output(self, prompt_template: ChatPromptTemplate, prompt_kwargs: dict) -> dict:
        """
        Executes the LLM generation with strict validation and error handling.
        Injects foundational telemetry (model, schema, latency).
        """
        try:
            logger.info(f"Formatting prompt and invoking LLM for {self.output_schema.__name__}...")
            
            start_time = time.time()
            formatted_prompt = prompt_template.format_messages(**prompt_kwargs)
            result = self.structured_llm.invoke(formatted_prompt)
            generation_time = time.time() - start_time
            
            return {
                "success": True, 
                "data": result,
                "metadata": {
                    "model": getattr(self.llm, 'model', 'unknown'),
                    "schema": self.output_schema.__name__,
                    "generation_time_sec": round(generation_time, 2)
                }
            }
            
        except ValidationError as e:
            logger.error(f"Schema Validation Error in {self.output_schema.__name__}: {e}")
            return {"success": False, "error": f"Schema Validation Error: {e}"}
            
        except Exception as e:
            logger.error(f"Unexpected generation error: {e}")
            return {"success": False, "error": str(e)}
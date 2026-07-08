"""
Execution Engine.
Executes the tools specified in the ExecutionPlan in strict sequence.
"""

import logging
from typing import Dict, Any, Callable
from src.week5_agent_workflow.planner_schemas import ExecutionPlan, ToolName
from src.week5_agent_workflow.state import AgentState

logger = logging.getLogger(__name__)

class ExecutionEngine:
    """
    Executes a sequence of enterprise tools based on a generated ExecutionPlan.
    
    Responsibilities:
    - Map ToolName enums to actual Python tools/functions via a registry.
    - Iterate through the plan sequentially.
    - Collect and aggregate the outputs into a results dictionary.
    - Maintain strict type safety, interface standardization (.invoke), and consistent dict returns.
    """
    
    def __init__(self, tool_registry: Dict[ToolName, Callable]):
        """
        Injecting the tool registry decouples the engine from specific tool implementations.
        """
        self.tools = tool_registry

    def execute(self, plan: ExecutionPlan, state: AgentState) -> Dict[ToolName, Any]:
        """
        Runs the planned steps in order and returns an aggregated dictionary of results.
        """
        results: Dict[ToolName, Any] = {}
        total_steps = len(plan.steps)
        
        for idx, step in enumerate(plan.steps, start=1):
            tool_name = step.tool
            logger.info(f"[Execution Engine] Step {idx}/{total_steps}: Running {tool_name.value} - Reason: {step.reasoning}")
            
            if tool_name not in self.tools:
                error_msg = f"Tool {tool_name.value} not found in registry."
                logger.error(f"[Project: {state.project_id}] {error_msg} | Query: '{state.query}'")
                # Normalize error return as a dict
                results[tool_name] = {"success": False, "error": error_msg}
                continue
            
            tool_function = self.tools[tool_name]
            
            try:
                tool_output = tool_function.invoke(state)
                
                if tool_output is None:
                    logger.warning(f"[Project: {state.project_id}] Tool {tool_name.value} returned None.")
                    results[tool_name] = {"success": True, "data": None, "warning": "Tool executed but returned no data."}
                elif isinstance(tool_output, dict) and "success" in tool_output:
                    # Tool already follows the contract, no need to wrap
                    results[tool_name] = tool_output
                else:
                    # Wrap raw data outputs
                    results[tool_name] = {"success": True, "data": tool_output}
                    
            except Exception as e:
                
                error_msg = f"Exception during execution of {tool_name.value}: {str(e)}"
                logger.error(f"[Project: {state.project_id}] {error_msg} | Query: '{state.query}'")
                # NORMALIZED ERROR OUTPUT
                results[tool_name] = {"success": False, "error": error_msg}
                
        return results
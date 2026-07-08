"""
Isolates the RouteDecision schema to verify if the LLM can parse it 
without the heavy ROUTER_PROMPT overhead.
"""
from src.week4_agents.models import get_router_llm
from src.week4_agents.schemas import RouteDecision

def run_schema_verification():
    print("Initializing Router LLM...")
    llm = get_router_llm()
    
    print("Binding structured output to RouteDecision schema...")
    structured = llm.with_structured_output(RouteDecision)
    
    prompt = """
    User:
    Give me a summary of customer_portal.
    
    Return a JSON object with selected_tool, reasoning, confidence, project_id, and requires_tool_execution.
    """
    
    print("Invoking LLM...")
    try:
        result = structured.invoke(prompt)
        print("\n✅ SUCCESS! The schema is NOT the problem.")
        print("=" * 40)
        print(f"Tool      : {result.selected_tool.value}")
        print(f"Project   : {result.project_id}")
        print(f"Confidence: {result.confidence}")
        print(f"Reasoning : {result.reasoning}")
        print(f"Execute   : {result.requires_tool_execution}")
        print("=" * 40)
    except Exception as e:
        print(f"\n❌ FAILED! The schema is too heavy or conflicting.")
        print(f"Error details: {e}")

if __name__ == "__main__":
    run_schema_verification()
from pydantic import BaseModel
from src.week4_agents.models import get_router_llm

class TestSchema(BaseModel):
    answer: str

def run_diagnostics():
    llm = get_router_llm()
    
    print("--- Test 1: Raw LLM Invocation ---")
    raw_result = llm.invoke("Say hello.")
    print(f"Raw Output: {raw_result.content}\n")
    
    print("--- Test 2: Simple Structured Output ---")
    structured_llm = llm.with_structured_output(TestSchema)
    struct_result = structured_llm.invoke("Say hello.")
    print(f"Structured Output: {struct_result}\n")

if __name__ == "__main__":
    run_diagnostics()
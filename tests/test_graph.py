"""
Verifies the Phase A LangGraph Foundation.
"""
from src.week5_agent_workflow.graph import build_workflow
from src.week5_agent_workflow.state import AgentState

def run_graph_test():
    print("=" * 60)
    print("Test Suite: Phase A LangGraph Orchestration")
    print("=" * 60 + "\n")
    
    try:
        app = build_workflow()
    except Exception as e:
        print(f"❌ Graph initialization failed: {e}")
        return

    query = "What are the blockers for customer_portal?"
    print(f"Executing Query: '{query}'\n")
    
    # Initialize the raw state
    initial_state = AgentState(query=query)
    
    # Let LangGraph drive the execution
    final_state = app.invoke(initial_state)
    
    print("--- RAW STATE (DEBUG) ---")
    print(final_state)
    print("\n✅ SUCCESS: Graph Execution Complete\n")
    
    print("--- Final Response ---")
    print(final_state.get("final_response", "No response generated."))
    
    print("\n--- Routing Decision ---")
    decision = final_state.get("decision")
    
    # Robust check for LangGraph serialization (dict vs Pydantic model)
    if isinstance(decision, dict):
        print(f"Tool selected: {decision.get('selected_tool', 'Unknown')}")
    elif decision:
        print(f"Tool selected: {getattr(decision, 'selected_tool', 'Unknown')}")
        
    print("\n--- Telemetry ---")
    print(final_state.get("telemetry"))
    print("=" * 60 + "\n")

if __name__ == "__main__":
    run_graph_test()
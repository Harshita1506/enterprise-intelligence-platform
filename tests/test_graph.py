"""
Verifies Phase B LangGraph Orchestration with Conditional Edges.
"""
from src.week5_agent_workflow.graph import build_workflow
from src.week5_agent_workflow.state import AgentState

def run_dynamic_graph_test():
    print("=" * 60)
    print("Test Suite: Phase B Dynamic LangGraph")
    print("=" * 60 + "\n")
    
    try:
        app = build_workflow()
    except Exception as e:
        print(f"❌ Graph initialization failed: {e}")
        return

    queries = [
        "What are the blockers for customer_portal?", # Expected: Router -> Executor -> Synthesizer
        "Hello! How are you?"                           # Expected: Router -> Synthesizer
    ]
    
    for query in queries:
        print(f"Executing Query: '{query}'\n")
        initial_state = AgentState(query=query)
        final_state = app.invoke(initial_state)
        
        print(f"✅ SUCCESS: {final_state.get('status')}")
        print("--- Final Response ---")
        print(final_state.get("final_response", "No response generated."))
        
        decision = final_state.get("decision")
        if decision:
            # Print the exact boolean dictating the path
            requires_tool = getattr(decision, 'requires_tool_execution', 'Unknown')
            print(f"\n--- Routing Logic ---")
            print(f"Tool selected : {getattr(decision, 'selected_tool', 'Unknown')}")
            print(f"Requires Tool : {requires_tool}")
        
        print("\n--- Telemetry & Trace ---")
        print(f"Node History : {' -> '.join(final_state.get('node_history', []))}")
        print(f"Total Time   : {final_state.get('telemetry').total_latency_sec}s")
        print("=" * 60 + "\n")

if __name__ == "__main__":
    run_dynamic_graph_test()
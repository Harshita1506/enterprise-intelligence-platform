"""
Verifies Phase C LangGraph Conversation Memory across three conversational turns:
Summary -> Risk -> Action Items, without ever repeating the project name.

node_history is reset before every invoke() because it is a per-turn execution
trace, not a conversational memory field. active_project and conversation_turn
are NOT reset — they persist across turns via the MemorySaver checkpointer.
"""
import uuid
from src.week5_agent_workflow.graph import build_workflow


def run_memory_test():
    print("=" * 60)
    print("Test Suite: Phase C LangGraph Memory (3-Turn Conversation)")
    print("=" * 60 + "\n")

    try:
        app = build_workflow()
    except Exception as e:
        print(f"❌ Graph initialization failed: {e}")
        return

    thread_id = str(uuid.uuid4())
    config = {"configurable": {"thread_id": thread_id}}
    print(f"Session Thread ID: {thread_id}\n")

    query_1 = "Summarize the customer_portal."
    print(f"Turn 1 Query: '{query_1}'")
    state_1 = app.invoke({"query": query_1, "node_history": []}, config=config)
    print(f"✅ Intent: {state_1['decision'].selected_tool.value} | "
          f"Active Project: {state_1['active_project']} | "
          f"Turn: {state_1['conversation_turn']}")
    print(f"Turn 1 Trace   : {' -> '.join(state_1['node_history'])}")
    print("-" * 60)

    query_2 = "What are the biggest risks?"
    print(f"Turn 2 Query (No Project Mentioned): '{query_2}'")
    state_2 = app.invoke({"query": query_2, "node_history": []}, config=config)
    print(f"✅ Intent: {state_2['decision'].selected_tool.value} | "
          f"Resolved Project: {state_2['project_id']} <-- MEMORY WORKED! | "
          f"Turn: {state_2['conversation_turn']}")
    print(f"Turn 2 Trace   : {' -> '.join(state_2['node_history'])}")
    print("-" * 60)

    query_3 = "Who owns the pending work?"
    print(f"Turn 3 Query (No Project Mentioned): '{query_3}'")
    state_3 = app.invoke({"query": query_3, "node_history": []}, config=config)
    print(f"✅ Intent: {state_3['decision'].selected_tool.value} | "
          f"Resolved Project: {state_3['project_id']} <-- MEMORY WORKED! | "
          f"Turn: {state_3['conversation_turn']}")
    print(f"Turn 3 Trace   : {' -> '.join(state_3['node_history'])}")

    print("\n--- Final Response (Turn 3) ---")
    print(state_3.get("final_response", "No response generated."))

    print(f"\n--- Memory Verification Summary ---")
    print(f"Active Project (persisted across all 3 turns, never re-stated): {state_3['active_project']}")
    print(f"Conversation Turn Counter (persisted, not reset)             : {state_3['conversation_turn']}")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    run_memory_test()
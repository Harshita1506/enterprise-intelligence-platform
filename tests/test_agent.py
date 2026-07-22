from src.week4_agents.agent import ProjectIntelligenceAgent

def run_agent_test():
    print("=" * 60 + "\nTest Suite: Full Agent Orchestration\n" + "=" * 60)
    try:
        agent = ProjectIntelligenceAgent()
    except Exception as e:
        print(f"❌ Initialization failed: {e}")
        return

    queries = [
    "Summarize customer_portal",
    "Find risks in customer_portal",
    "Who owns pending tasks in customer_portal?",
    "Give executive insights for customer_portal"
]

    for i, query in enumerate(queries, 1):
        print(f"\nExecuting Query {i}: '{query}'")
        result = agent.run(query)
        
        if result.success:
            print("\n✅ SUCCESS")
            print(f"Response: {result.response}\n")
            print(f"Node Path : {' -> '.join(result.node_history)}")
            print(f"Intent    : {result.metadata.tool_used} | Project: {result.metadata.project_id}")
            print(f"Latencies : {result.telemetry.model_dump()}")
        else:
            print(f"❌ FAILED. Status: {result.status.value}\nResponse: {result.response}")
        print("-" * 60)

if __name__ == "__main__":
    run_agent_test()
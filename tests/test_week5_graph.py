"""
Smoke test for the simplified Week 5 LangGraph workflow.
"""

from src.week5_langgraph.runner import LangGraphProjectAgent


def main():

    query = "Summarize customer_portal"

    print("=" * 60)
    print("INPUT")
    print(query)
    print("=" * 60)

    agent = LangGraphProjectAgent()

    response = agent.run(query)

    print("\nFINAL RESPONSE\n")

    print(response.response)

    print("\nSTATUS")

    print(response.status)

    print("\nNODE HISTORY")

    print(response.node_history)
    
    print("\nTELEMETRY")

    print(f"Router Latency      : {response.telemetry.router_latency_sec} sec")
    print(f"Tool Latency        : {response.telemetry.tool_latency_sec} sec")
    print(f"Synthesis Latency   : {response.telemetry.synthesis_latency_sec} sec")
    print(f"Total Latency       : {response.telemetry.total_latency_sec} sec")

if __name__ == "__main__":
    main()
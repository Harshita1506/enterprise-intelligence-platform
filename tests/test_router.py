from src.week4_agents.router import SemanticRouter
from src.week4_agents.extractor import ProjectIdentifier

def run_routing_tests():
    print("=" * 60 + "\nTest Suite: Intent Router & Entity Extractor\n" + "=" * 60)
    router = SemanticRouter()
    extractor = ProjectIdentifier()
    
    queries = [
        "Give me a summary of customer_portal.",
        "What are the major blockers preventing deployment?",
        "Who owns the database migration for customer_portal?",
        "Should leadership intervene?",
        "Good morning AI!"
    ]
    
    for q in queries:
        print(f"\nQUERY: '{q}'")
        try:
            decision = router.route_query(q)
            proj_id = extractor.extract(q)
            print(f"  ↳ INTENT     : {decision.selected_tool.value}")
            print(f"  ↳ PROJECT ID : {proj_id}")
            print(f"  ↳ EXECUTE?   : {decision.requires_tool_execution}")
        except Exception as e:
            print(f"  ❌ FAILED: {e}")

if __name__ == "__main__":
    run_routing_tests()
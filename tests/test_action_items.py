"""
Verifies the Action Item Extraction Engine.
Ensures the LLM correctly parses targeted context and outputs a structured list of tasks.
"""
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.services.action_items import ActionItemExtractor

def run_action_items_test():
    print("=" * 60)
    print("Test Suite: Action Item Extraction")
    print("=" * 60 + "\n")
    
    try:
        kb = EnterpriseKnowledgeBase()
        tools = ProjectIntelligenceTools(kb)
        extractor = ActionItemExtractor(tools)
    except Exception as e:
        print(f"❌ Initialization failed: {e}")
        return

    try:
        # Extract tasks from the customer_portal project
        result = extractor.extract_tasks("customer_portal")
        
        if result["success"]:
            collection = result["data"]
            print(f"\n✅ SUCCESS: Extracted {len(collection.items)} action items!")
            print("-" * 60)
            
            for i, item in enumerate(collection.items, 1):
                print(f"Task {i}   : {item.task}")
                print(f"Owner    : {item.owner}")
                print(f"Status   : {item.status}")
                print(f"Source   : {item.source}")
                print("-" * 60)
        else:
            print(f"\n❌ Extraction failed: {result['error']}")
            
    except Exception as e:
        print(f"\n❌ Unexpected test failure: {e}")

if __name__ == "__main__":
    run_action_items_test()
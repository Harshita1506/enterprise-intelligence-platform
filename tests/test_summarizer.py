"""
Verifies that the Summarizer correctly consumes tools and returns a structured Pydantic model.
"""
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.services.summarizer import ProjectSummarizer

def run_summarizer_test():
    print("=" * 60)
    print("Test Suite: Project Summarizer (Structured Output)")
    print("=" * 60 + "\n")
    
    try:
        kb = EnterpriseKnowledgeBase()
        tools = ProjectIntelligenceTools(kb)
        summarizer = ProjectSummarizer(tools)
    except Exception as e:
        print(f"❌ Initialization failed: {e}")
        return

    try:
        # Test on the customer_portal
        result = summarizer.generate_summary("customer_portal")
        
        if result["success"]:
            summary = result["data"]
            print("\n✅ SUCCESS: LLM successfully returned a structured Pydantic object!")
            print("-" * 60)
            print(f"Project Name      : {summary.project_name}")
            print(f"Executive Summary : {summary.executive_summary[:100]}...")
            print(f"Action Items Found: {len(summary.action_items)}")
            print(f"Risks Detected    : {len(summary.blockers_and_risks)}")
            print(f"Sources Used      : {summary.sources_used}")
            print("-" * 60)
            
            # Let's peek at the first action item if it exists
            if summary.action_items:
                print(f"Sample Action Item: {summary.action_items[0].task} (Owner: {summary.action_items[0].owner})")
        else:
            print(f"\n❌ Summarization failed: {result['error']}")
            
    except Exception as e:
        print(f"\n❌ Unexpected test failure: {e}")

if __name__ == "__main__":
    run_summarizer_test()
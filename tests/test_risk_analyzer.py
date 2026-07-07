"""
Verifies the Risk Analyzer service.
"""
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.services.risk_analyzer import RiskAnalyzer

def run_risk_test():
    print("=" * 60)
    print("Test Suite: Risk Analyzer")
    print("=" * 60 + "\n")
    
    try:
        kb = EnterpriseKnowledgeBase()
        tools = ProjectIntelligenceTools(kb)
        analyzer = RiskAnalyzer(tools)
    except Exception as e:
        print(f"❌ Initialization failed: {e}")
        return

    result = analyzer.analyze_risks("customer_portal")
    
    if result["success"]:
        collection = result["data"]
        print(f"\n✅ SUCCESS: Identified {len(collection.risks)} risks!")
        
        for i, r in enumerate(collection.risks, 1):
            print("=" * 60)
            print(f"Risk {i}        : {r.risk_title}")
            print(f"Severity     : {r.severity}")
            print(f"Reason       : {r.reasoning}")
            print(f"Recommendation: {r.recommendation}")
        print("=" * 60)
    else:
        print(f"\n❌ Analysis failed: {result['error']}")

if __name__ == "__main__":
    run_risk_test()
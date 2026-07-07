from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.week3_project_intelligence.tools.intelligence_tools import ProjectIntelligenceTools
from src.week3_project_intelligence.services.strategic_insight_generator import StrategicInsightGenerator

def run_test():
    kb = EnterpriseKnowledgeBase()
    tools = ProjectIntelligenceTools(kb)
    generator = StrategicInsightGenerator(tools)
    
    result = generator.generate_insights("customer_portal")
    
    if result["success"]:
        insight = result["data"]
        meta = result["metadata"]
        print(f"\n✅ SUCCESS: Executive Report Generated!")
        print(f"⏱️ Gen Time: {meta['generation_time_sec']}s | Sources: {meta['sources']}")
        print("=" * 60)
        print(f"Health       : {insight.project_health}")
        print(f"Forecast     : {insight.delivery_forecast}")
        print(f"Critical Area: {insight.critical_focus_area}")
        print(f"Priorities   : {insight.top_priorities}")
        print(f"Recs         : {insight.management_recommendations}")
        print("=" * 60)
    else:
        print(f"❌ Failed: {result['error']}")

if __name__ == "__main__":
    run_test()
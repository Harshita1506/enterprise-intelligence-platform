"""
Verifies the Enterprise Knowledge Base API.
Tests retrieval, filtering, formatting, and edge cases independently.
"""
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase

def print_result(test_name: str, passed: bool, details: str = ""):
    """Helper to standardize test output and make the console highly scannable."""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} | {test_name}")
    if details:
        print(f"         -> {details}")

def test_initialization() -> EnterpriseKnowledgeBase:
    """Verifies that the Knowledge Base and underlying Vector Store load correctly."""
    try:
        kb = EnterpriseKnowledgeBase()
        print_result("Initialization", True)
        return kb
    except Exception as e:
        print_result("Initialization", False, f"Error: {e}")
        return None

def test_global_search(kb: EnterpriseKnowledgeBase):
    """Verifies retrieval across the entire enterprise database."""
    try:
        docs = kb.retrieve_documents("What is the budget?", top_k=2)
        passed = len(docs) > 0
        print_result("Global Search", passed, f"Retrieved {len(docs)} documents.")
    except Exception as e:
        print_result("Global Search", False, f"Exception: {e}")

def test_project_filter(kb: EnterpriseKnowledgeBase):
    """Verifies that metadata filtering strictly isolates project data."""
    try:
        docs = kb.retrieve_documents("What is the budget?", project_id="customer_portal", top_k=2)
        # Check that documents were found AND that every single one matches the requested project
        is_valid = len(docs) > 0 and all(d.metadata.get("project_id") == "customer_portal" for d in docs)
        print_result("Project Filtering", is_valid, f"Retrieved {len(docs)} strictly filtered documents.")
    except Exception as e:
        print_result("Project Filtering", False, f"Exception: {e}")

def test_context_format(kb: EnterpriseKnowledgeBase):
    """Verifies that the context string is formatted with data provenance (source citations)."""
    try:
        context = kb.retrieve_context("What is the budget?", top_k=1)
        passed = "[Source:" in context
        print_result("Context Formatting", passed, "Source citations successfully embedded." if passed else "Missing citations.")
    except Exception as e:
        print_result("Context Formatting", False, f"Exception: {e}")

def test_graceful_unknown_query(kb: EnterpriseKnowledgeBase):
    """
    Verifies the system handles unknown queries without crashing.
    Note: Due to the nature of semantic search (nearest neighbor), 
    this will return the least-irrelevant chunks rather than 'nothing'.
    Relevance thresholds will be added in later optimization phases.
    """
    try:
        nonsense_query = "What is the airspeed velocity of an unladen swallow?"
        context = kb.retrieve_context(nonsense_query)
        
        # We only assert that the pipeline completed and returned a string
        passed = isinstance(context, str) and len(context.strip()) > 0
        print_result("Graceful Unknown Query Handling", passed, "API returned a string without crashing.")
    except Exception as e:
        print_result("Graceful Unknown Query Handling", False, f"Exception: {e}")

def run_all_tests():
    """Test runner orchestration."""
    print("=" * 60)
    print("Test Suite: Enterprise Knowledge Base API")
    print("=" * 60 + "\n")
    
    # 1. Initialize (The Gateway Test)
    kb = test_initialization()
    
    if not kb:
        print("\n⚠️ Aborting downstream tests due to initialization failure.")
        print("Check if ChromaDB is locked or if ingestion.py ran successfully.")
        return
        
    # 2. Run Atomic Tests
    test_global_search(kb)
    test_project_filter(kb)
    test_context_format(kb)
    test_graceful_unknown_query(kb)
    
    print("\n" + "=" * 60)
    print("Test Suite Complete.")

if __name__ == "__main__":
    run_all_tests()
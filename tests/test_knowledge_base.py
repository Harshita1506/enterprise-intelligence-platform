import pytest
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase


@pytest.fixture(scope="module")
def kb():
    """Initialize the Enterprise Knowledge Base once for all tests."""
    return EnterpriseKnowledgeBase()


def test_initialization(kb):
    """Knowledge Base initializes successfully."""
    assert kb is not None


def test_global_search(kb):
    """Documents can be retrieved globally."""
    docs = kb.retrieve_documents("What is the budget?", top_k=2)

    assert isinstance(docs, list)
    assert len(docs) > 0


def test_project_filter(kb):
    """Project metadata filtering works."""
    docs = kb.retrieve_documents(
        "What is the budget?",
        project_id="customer_portal",
        top_k=2
    )

    assert len(docs) > 0

    assert all(
        d.metadata.get("project_id") == "customer_portal"
        for d in docs
    )


def test_context_format(kb):
    """Context includes source citations."""
    context = kb.retrieve_context(
        "What is the budget?",
        top_k=1
    )

    assert isinstance(context, str)
    assert "[Source:" in context


def test_graceful_unknown_query(kb):
    """Unknown queries should not crash."""
    context = kb.retrieve_context(
        "What is the airspeed velocity of an unladen swallow?"
    )

    assert isinstance(context, str)
    assert len(context.strip()) > 0
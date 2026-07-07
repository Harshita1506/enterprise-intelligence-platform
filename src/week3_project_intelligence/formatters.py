"""
Response formatting layer. 
Decouples LangChain-specific Document objects from the rest of the application.
"""
from langchain_core.documents import Document

def format_structured_response(docs: list[Document], message: str = "", stats: dict = None) -> dict:
    """Converts raw LangChain documents into a rich, structured dictionary."""
    if not docs:
        return {
            "success": False,
            "message": message or "No relevant documents found.",
            "stats": stats or {"retrieved_chunks": 0},
            "context": "",
            "sources": [],
            "documents": []
        }
        
    context = "\n\n".join([f"[Source: {d.metadata.get('source', 'Unknown')}]\n{d.page_content}" for d in docs])
    sources = list({d.metadata.get("source", "Unknown") for d in docs})
    
    return {
        "success": True,
        "message": message or f"Successfully retrieved data.",
        "stats": stats or {"retrieved_chunks": len(docs)},
        "context": context,
        "sources": sources,
        "documents": docs
    }
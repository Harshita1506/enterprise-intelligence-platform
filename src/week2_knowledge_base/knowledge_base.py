"""
The Enterprise Knowledge API.
Acts as the central Facade for all AI agents and dashboards to retrieve information.
"""
from src.core.vector_store import VectorStoreManager
from src.core.config import TOP_K

class EnterpriseKnowledgeBase:
    """
    The public interface for enterprise data. 
    Agents interact with this class, completely blind to the underlying vector database.
    """
    
    def __init__(self):
        # Initialize the storage backend, keeping it strictly private
        self._vsm = VectorStoreManager()
        self._db = self._vsm.load()

    def retrieve_documents(self, query: str, project_id: str = None, top_k: int = TOP_K) -> list:
        """
        Core search engine. Returns rich Document objects containing both text and metadata.
        Allows downstream systems (agents, dashboards) to inspect data provenance.
        """
        search_kwargs = {"k": top_k}
        
        # Apply metadata filtering if a specific project is targeted
        if project_id:
            search_kwargs["filter"] = {"project_id": project_id}

        try:
            # Returns a list of LangChain Document objects
            return self._db.similarity_search(query, **search_kwargs)
        except Exception as e:
            # Library boundary: Raise the error so the calling application can handle it
            raise RuntimeError(f"Database search failed: {e}") from e

    def retrieve_context(self, query: str, project_id: str = None, top_k: int = TOP_K) -> str:
        """
        Convenience method for LLM prompting. 
        Fetches documents and formats them into a single context string with source citations.
        """
        try:
            results = self.retrieve_documents(query, project_id, top_k)
        except RuntimeError:
            return "Error retrieving context from the enterprise database."

        if not results:
            return "No relevant enterprise context found."

        # Format the context, preserving data provenance for the LLM
        context_blocks = []
        for doc in results:
            source = doc.metadata.get("source", "Unknown Source")
            context_blocks.append(f"[Source: {source}]\n{doc.page_content}")

        return "\n\n".join(context_blocks)
    
    def get_available_projects(self) -> dict:
        """Returns the dictionary of available enterprise projects."""
        from src.core.config import PROJECTS
        return PROJECTS
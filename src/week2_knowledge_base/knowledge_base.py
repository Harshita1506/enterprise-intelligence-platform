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

    def retrieve_documents(
        self,
        query: str,
        project_id: str = None,
        top_k: int = TOP_K,
    ) -> list:
        """
        Core search engine. Returns rich Document objects containing both
        text and metadata.
        """
        search_kwargs = {"k": top_k}

        if project_id:
            search_kwargs["filter"] = {"project_id": project_id}

        try:
            return self._db.similarity_search(query, **search_kwargs)

        except Exception as e:
            raise RuntimeError(
                f"Database search failed: {e}"
            ) from e

    def retrieve_context(
        self,
        query: str,
        project_id: str = None,
        top_k: int = TOP_K,
    ) -> str:
        """
        Convenience method for LLM prompting.
        """

        try:
            results = self.retrieve_documents(
                query,
                project_id,
                top_k,
            )

        except RuntimeError:
            return "Error retrieving context from the enterprise database."

        if not results:
            return "No relevant enterprise context found."

        context_blocks = []

        for doc in results:
            source = doc.metadata.get(
                "source",
                "Unknown Source",
            )

            context_blocks.append(
                f"[Source: {source}]\n{doc.page_content}"
            )

        return "\n\n".join(context_blocks)

    def get_available_projects(self) -> dict:
        """
        Returns the configured enterprise projects.
        """
        from src.core.config import PROJECTS

        return PROJECTS

    def get_all_documents(self) -> list[dict]:
        """
        Returns metadata for every unique document stored in Chroma.
        """

        try:
            data = self._db.get(include=["metadatas"])

            documents = {}

            for metadata in data["metadatas"]:

                if metadata is None:
                    continue

                path = metadata.get("path")

                if path not in documents:

                    documents[path] = {
                        "project_id": metadata.get("project_id"),
                        "document_type": metadata.get("document_type"),
                        "source": metadata.get("source"),
                        "path": metadata.get("path"),
                    }

            return list(documents.values())

        except Exception as e:
            raise RuntimeError(
                f"Failed to retrieve document metadata: {e}"
            ) from e

    def get_document(self, document_id: str) -> dict | None:
        """
        Returns metadata for a single document.
        """

        documents = self.get_all_documents()

        for document in documents:

            current_id = (
                f'{document["project_id"]}/{document["source"]}'
            )

            if current_id == document_id:
                return document

        return None
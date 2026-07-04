"""Handles vector database operations (storing and retrieving embeddings)."""
import shutil
from pathlib import Path
from langchain_chroma import Chroma
from src.core.config import CHROMA_DIR, TOP_K, ENTERPRISE_COLLECTION
from src.core.models import get_embeddings

class VectorStoreManager:
    """Manages the lifecycle and operations of the Chroma vector database."""
    
    def __init__(self, collection_name: str = ENTERPRISE_COLLECTION):
        self.collection_name = collection_name
        self.persist_dir = str(CHROMA_DIR)
        self.embeddings = get_embeddings()

    def create(self, chunks: list[str]) -> Chroma:
        """
        Legacy Week 1 Method: Stores raw text chunks without enterprise metadata.
        Maintained strictly for backward compatibility with Week 1 tests.
        """
        if not chunks:
            raise ValueError("No chunks provided.")
            
        return Chroma.from_texts(
            texts=chunks,
            embedding=self.embeddings,
            persist_directory=self.persist_dir,
            collection_name=self.collection_name
        )

    def store_documents(self, document_batches: list[dict]) -> Chroma:
        """
        Week 2+ Method: Ingests enterprise documents with metadata tags.
        Appends to the existing knowledge base without destroying old data.
        
        Expected payload format:
        [
            {"chunks": ["chunk1", "chunk2"], "metadata": {"project_id": "alpha", ...}},
            ...
        ]
        """
        if not document_batches:
            raise ValueError("No documents provided to store.")

        flat_chunks = []
        flat_metadatas = []

        # The implementation detail (replication) stays hidden inside the manager
        for doc in document_batches:
            chunks = doc["chunks"]
            metadata = doc["metadata"]
            
            flat_chunks.extend(chunks)
            flat_metadatas.extend([metadata] * len(chunks))

        # Chroma natively appends to existing collections if the persist_dir and name match
        return Chroma.from_texts(
            texts=flat_chunks,
            embedding=self.embeddings,
            metadatas=flat_metadatas,
            persist_directory=self.persist_dir,
            collection_name=self.collection_name
        )

    def load(self) -> Chroma:
        """Loads an existing vector store from disk."""
        return Chroma(
            persist_directory=self.persist_dir,
            embedding_function=self.embeddings,
            collection_name=self.collection_name
        )

    def get_retriever(self, vector_store: Chroma = None):
        """Returns a retriever interface for the vector store."""
        if vector_store is None:
            vector_store = self.load()
            
        return vector_store.as_retriever(search_kwargs={"k": TOP_K})
        
    def wipe_database(self):
        """
        Destructive operation: Completely deletes the existing database tied to this instance.
        Use this when you need a completely clean rebuild.
        """
        persist_path = Path(self.persist_dir)
        if persist_path.exists():
            shutil.rmtree(persist_path, ignore_errors=True)
            persist_path.mkdir(parents=True, exist_ok=True)
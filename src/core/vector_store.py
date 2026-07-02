"""Handles vector database operations (storing and retrieving embeddings)."""
import shutil
from langchain_chroma import Chroma  # Updated to modern package
from src.core.config import CHROMA_DIR, TOP_K
from src.core.models import get_embeddings

class VectorStoreManager:
    """Manages the lifecycle and operations of the Chroma vector database."""
    
    def __init__(self, collection_name: str = "enterprise_knowledge"):
        self.collection_name = collection_name
        self.persist_dir = str(CHROMA_DIR)
        self.embeddings = get_embeddings()

    def create(self, chunks: list[str]) -> Chroma:
        """Creates a new vector store from text chunks and saves it to disk."""
        if not chunks:
            raise ValueError("No chunks provided to create the vector store. Did the text splitter fail?")
            
        return Chroma.from_texts(
            texts=chunks,
            embedding=self.embeddings,
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
        """
        Returns a retriever interface. 
        If no store is provided, it automatically loads the existing one.
        """
        if not vector_store:
            vector_store = self.load()
            
        return vector_store.as_retriever(search_kwargs={"k": TOP_K})

   
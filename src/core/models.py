"""
Ollama LLM and Embeddings setup.
"""

from langchain_ollama import OllamaLLM, OllamaEmbeddings
from src.core.config import LLM_MODEL, EMBEDDING_MODEL

def get_llm(temperature: float = 0.1) -> OllamaLLM:
    """
    Returns the configured Ollama LLM.
    """
    return OllamaLLM(
        model=LLM_MODEL,
        temperature=temperature,
    )

def get_embeddings() -> OllamaEmbeddings:
    """
    Returns the embedding model used for vector generation.
    """
    return OllamaEmbeddings(
        model=EMBEDDING_MODEL
    )
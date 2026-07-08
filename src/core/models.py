"""
Core LLM and Embeddings configuration.
Provides standard completion models for text generation and
Chat models for structured outputs and agent workflows.
"""

from langchain_ollama import OllamaLLM, ChatOllama, OllamaEmbeddings
from src.core.config import LLM_MODEL, EMBEDDING_MODEL, LLM_TEMPERATURE


def get_llm(
    temperature: float = LLM_TEMPERATURE,
    **kwargs
) -> OllamaLLM:
    """
    Returns a completion-style LLM.

    Used by retrieval pipelines that only require text generation.
    """
    return OllamaLLM(
        model=LLM_MODEL,
        temperature=temperature,
        **kwargs
    )


def get_chat_llm(
    temperature: float = LLM_TEMPERATURE,
    **kwargs
) -> ChatOllama:
    """
    Returns a chat-based LLM.

    Used by routing, planning, structured outputs,
    tool calling and LangGraph workflows.
    """
    return ChatOllama(
        model=LLM_MODEL,
        temperature=temperature,
        **kwargs
    )


def get_embeddings() -> OllamaEmbeddings:
    """
    Returns the embedding model used for vector generation.
    """
    return OllamaEmbeddings(
        model=EMBEDDING_MODEL
    )
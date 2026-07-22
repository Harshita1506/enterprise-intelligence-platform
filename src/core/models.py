"""
Core LLM and Embeddings configuration.

Provides centralized factory methods for:
- Completion/Text Generation LLMs
- Chat LLMs
- Embedding Models

The public API of this module is intentionally stable.
All other project layers should only call:

    get_llm()
    get_chat_llm()
    get_embeddings()

without caring about the underlying provider.
"""

import os

from dotenv import load_dotenv

from langchain_ollama import (
    OllamaLLM,
    ChatOllama,
    OllamaEmbeddings,
)

from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from src.core.config import (
    LLM_PROVIDER,
    LLM_MODEL,
    EMBEDDING_PROVIDER,
    EMBEDDING_MODEL,
    LLM_TEMPERATURE,
)

load_dotenv()


# ---------------------------------------------------------------------
# LLM Factory
# ---------------------------------------------------------------------

def get_llm(
    temperature: float = LLM_TEMPERATURE,
    **kwargs,
):
    """
    Returns the project's primary language model.

    For Groq we return ChatGroq.
    For Ollama we return OllamaLLM.
    """

    if LLM_PROVIDER.lower() == "groq":
    

        return ChatGroq(
            model=LLM_MODEL,
            temperature=temperature,
            api_key=os.getenv("GROQ_API_KEY"),
            **kwargs,
        )
    elif LLM_PROVIDER.lower() == "openrouter":
        return ChatOpenAI(
        model=LLM_MODEL,
        temperature=temperature,
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1",
        **kwargs,
    )

    return OllamaLLM(
        model=LLM_MODEL,
        temperature=temperature,
        **kwargs,
    )


# ---------------------------------------------------------------------
# Chat Model Factory
# ---------------------------------------------------------------------

def get_chat_llm(
    temperature: float = LLM_TEMPERATURE,
    **kwargs,
):
    """
    Returns the project's chat model.

    Used by:
    - Week 3 Intelligence Services
    - Week 4 Agent
    - Week 5 LangGraph
    """

    if LLM_PROVIDER.lower() == "groq":

        return ChatGroq(
            model=LLM_MODEL,
            temperature=temperature,
            api_key=os.getenv("GROQ_API_KEY"),
            **kwargs,
        )
    elif LLM_PROVIDER.lower() == "openrouter":
        return ChatOpenAI(
        model=LLM_MODEL,
        temperature=temperature,
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1",
        **kwargs,
    )

    return ChatOllama(
        model=LLM_MODEL,
        temperature=temperature,
        **kwargs,
    )


# ---------------------------------------------------------------------
# Embedding Factory
# ---------------------------------------------------------------------

def get_embeddings():
    """
    Returns the configured embedding model.

    Currently embeddings remain on Ollama.
    """

    if EMBEDDING_PROVIDER.lower() == "ollama":

        return OllamaEmbeddings(
            model=EMBEDDING_MODEL
        )

    raise ValueError(
        f"Unsupported embedding provider: {EMBEDDING_PROVIDER}"
    )
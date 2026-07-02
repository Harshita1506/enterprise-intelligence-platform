"""Handles breaking down large documents into manageable text chunks."""
from langchain_text_splitters import RecursiveCharacterTextSplitter
from src.core.config import CHUNK_SIZE, CHUNK_OVERLAP

def get_text_splitter() -> RecursiveCharacterTextSplitter:
    """
    Initializes and returns the configured RecursiveCharacterTextSplitter.
    Uses the standardized CHUNK_SIZE and CHUNK_OVERLAP from config.
    """
    return RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        length_function=len,
        is_separator_regex=False,
    )

def split_text(text: str) -> list[str]:
    """
    Takes a raw text string, validates it, and returns a list of chunked strings.
    """
    if not text.strip():
        raise ValueError("Input text is empty. Document extraction may have failed.")
        
    splitter = get_text_splitter()
    return splitter.split_text(text)
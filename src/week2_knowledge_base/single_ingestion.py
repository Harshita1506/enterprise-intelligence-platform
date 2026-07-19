"""
Single-document ingestion pipeline.

Processes one enterprise document through the complete ingestion workflow:
metadata extraction -> document loading -> text splitting -> optional vector storage.

This pipeline is designed for incremental ingestion (e.g. Upload API) and
can also be reused by the batch ingestion pipeline.
"""

from pathlib import Path

from src.core.document_loader import load_document
from src.core.text_splitter import split_text
from src.core.vector_store import VectorStoreManager
from src.week2_knowledge_base.metadata import extract_metadata


def ingest_single_document(
    file_path: str | Path,
    store: bool = True,
) -> dict:
    """
    Process a single enterprise document.

    Args:
        file_path:
            Path to the document.

        store:
            If True, immediately stores the document in Chroma.
            If False, only prepares the payload and returns it.

    Returns:
        {
            "status": "success" | "error",
            "document": {...} | None,
            "chunks_created": int,
            "stored": bool,
            "error": str | None
        }
    """

    file_path = Path(file_path)

    try:
        # Extract enterprise metadata
        metadata = extract_metadata(str(file_path))

        # Load and chunk document
        raw_text = load_document(str(file_path))
        chunks = split_text(raw_text)

        # Build payload expected by VectorStoreManager
        document = {
            "chunks": chunks,
            "metadata": metadata,
        }

        # Store immediately only when requested
        if store:
            vsm = VectorStoreManager()
            vsm.store_documents([document])

        return {
            "status": "success",
            "document": document,
            "chunks_created": len(chunks),
            "stored": store,
            "error": None,
        }

    except Exception as e:
        return {
            "status": "error",
            "document": None,
            "chunks_created": 0,
            "stored": False,
            "error": str(e),
        }
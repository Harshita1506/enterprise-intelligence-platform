"""
Extracts enterprise metadata from a document path.

This metadata is attached to every document chunk
before it is stored in the vector database,
allowing enterprise-level filtering and retrieval.
"""
from pathlib import Path
from src.core.config import PROJECTS

def extract_metadata(file_path: str) -> dict:
    path = Path(file_path)
    
    # 1. Extract components using pathlib
    source_file = path.name
    document_type = path.stem.lower()
    project_id = path.parent.name.lower()
    
    # 2. Validation (Fail-Fast)
    # Checks against the dictionary keys defined in config.py
    if project_id not in PROJECTS:
        raise ValueError(
            f"Unknown project folder: '{project_id}'. "
            f"Must be one of {list(PROJECTS.keys())}"
        )
        
    # 3. Return the enterprise metadata payload
    return {
        "project_id": project_id,
        "document_type": document_type,
        "source": source_file,
        "path": str(path)
    }
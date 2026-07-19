from pathlib import Path
import shutil

from src.core.config import DATA_DIR, PROJECTS
from src.week2_knowledge_base.single_ingestion import ingest_single_document


class UploadService:
    """
    Handles document upload and incremental ingestion.
    """

    def upload_document(self, project_id: str, file) -> dict:

        project_id = project_id.lower()

        if project_id not in PROJECTS:
            raise ValueError(
                f"Unknown project '{project_id}'. "
                f"Must be one of {list(PROJECTS.keys())}"
            )

        project_folder = DATA_DIR / project_id
        project_folder.mkdir(parents=True, exist_ok=True)

        destination = project_folder / file.filename

        with destination.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = ingest_single_document(destination, store=True)

        if result["status"] != "success":
            raise RuntimeError(result["error"])

        return {
            "project_id": project_id,
            "filename": file.filename,
            "chunks_created": result["chunks_created"],
            "status": "success",
        }
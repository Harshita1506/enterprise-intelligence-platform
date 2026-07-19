from src.core.config import DATA_DIR, PROJECTS, SUPPORTED_FILE_TYPES
from src.core.document_loader import load_document
from src.core.text_splitter import split_text


class ProjectMetadataService:
    """
    Lightweight metadata service.

    Reads the enterprise data directory directly instead of querying
    the vector database.

    This keeps the dashboard independent from Chroma and makes the
    service reusable for Dashboard, Projects and Knowledge Base pages.
    """

    def get_dashboard_stats(self) -> dict:
        total_projects = 0
        active_projects = 0
        total_documents = 0
        total_chunks = 0

        for project_id in PROJECTS.keys():

            total_projects += 1

            project_path = DATA_DIR / project_id

            if not project_path.exists():
                continue

            active_projects += 1

            for file in project_path.rglob("*"):

                if (
                    file.is_file()
                    and file.suffix.lower() in SUPPORTED_FILE_TYPES
                ):

                    total_documents += 1

                    try:
                        raw_text = load_document(str(file))
                        chunks = split_text(raw_text)
                        total_chunks += len(chunks)

                    except Exception:
                        # Ignore unreadable documents
                        continue

        return {
            "total_projects": total_projects,
            "active_projects": active_projects,
            "total_documents": total_documents,
            "total_chunks": total_chunks,
        }

    def get_projects_metadata(self) -> list[dict]:
        """
        Returns metadata for every available project.

        Used by the Projects API to build project cards without
        querying the vector database.
        """

        projects = []

        for project_id, project_name in PROJECTS.items():

            project_path = DATA_DIR / project_id

            document_count = 0
            chunk_count = 0

            if project_path.exists():

                for file in project_path.rglob("*"):

                    if (
                        file.is_file()
                        and file.suffix.lower() in SUPPORTED_FILE_TYPES
                    ):

                        document_count += 1

                        try:
                            raw_text = load_document(str(file))
                            chunks = split_text(raw_text)
                            chunk_count += len(chunks)

                        except Exception:
                            continue

            projects.append(
                {
                    "project_id": project_id,
                    "project_name": project_name,
                    "status": "Active" if project_path.exists() else "Inactive",
                    "documents": document_count,
                    "chunks": chunk_count,
                }
            )

        return projects
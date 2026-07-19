from pathlib import Path

from src.models.document_models import DocumentResponse
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase


class DocumentService:
    """
    Service responsible for returning the original
    content of an enterprise document.
    """

    def __init__(self):
        self.kb = EnterpriseKnowledgeBase()

    def get_document(self, document_id: str) -> DocumentResponse:
        print("=" * 60)
        print(type(self.kb))
        print(hasattr(self.kb, "get_document"))
        print(dir(self.kb))
        print("=" * 60)

        metadata = self.kb.get_document(document_id)

        if metadata is None:
            raise ValueError("Document not found.")

        path = Path(metadata["path"])

        if not path.exists():
            raise FileNotFoundError(f"File not found: {path}")

        suffix = path.suffix.lower()

        if suffix == ".txt":
            content = path.read_text(encoding="utf-8")

        elif suffix == ".docx":
            from docx import Document

            doc = Document(path)

            content = "\n".join(
                paragraph.text
                for paragraph in doc.paragraphs
            )

        else:
            raise ValueError(f"Unsupported file type: {suffix}")

        return DocumentResponse(
            id=document_id,
            project_id=metadata["project_id"],
            document_type=metadata["document_type"],
            source=metadata["source"],
            content=content,
        )
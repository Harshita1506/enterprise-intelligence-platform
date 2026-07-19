"""
Orchestrates the batch ingestion of enterprise documents.

Acts as a pure coordinator between project scanning,
single-document processing, and batch storage.
"""

from src.core.config import DATA_DIR, PROJECTS, SUPPORTED_FILE_TYPES
from src.core.vector_store import VectorStoreManager
from src.week2_knowledge_base.single_ingestion import ingest_single_document


def run_ingestion_pipeline(rebuild: bool = False) -> dict:
    print("=" * 60)
    print("Starting Enterprise Ingestion Pipeline...")
    print("=" * 60)

    # Initialize manager early to handle potential wipe
    vsm = VectorStoreManager()

    if rebuild:
        print("⚠️ REBUILD MODE: Wiping existing enterprise knowledge base...")
        vsm.wipe_database()
        print("✅ Database wiped cleanly.\n")

    documents_to_store = []
    total_chunks = 0

    # Scan configured enterprise projects
    for project_id, display_name in PROJECTS.items():
        project_path = DATA_DIR / project_id

        if not project_path.exists():
            print(
                f"⚠️ Skipping '{display_name}': "
                f"Directory not found at {project_path.name}"
            )
            continue

        print(f"\n📂 Scanning Project: {display_name}")

        # Scan supported files
        for file_path in project_path.rglob("*"):
            if (
                not file_path.is_file()
                or file_path.suffix.lower() not in SUPPORTED_FILE_TYPES
            ):
                continue

            print(f"   📄 Processing: {file_path.name}")

            result = ingest_single_document(
                file_path=file_path,
                store=False
            )

            if result["status"] == "success":
                documents_to_store.append(result["document"])
                total_chunks += result["chunks_created"]

                print(
                    f"      -> Prepared "
                    f"{result['chunks_created']} chunks."
                )
            else:
                print(
                    f"      ❌ Error processing "
                    f"{file_path.name}: {result['error']}"
                )

    # Batch insertion
    if not documents_to_store:
        print("\n❌ Ingestion failed: No documents were successfully processed.")

        return {
            "status": "failed",
            "documents_processed": 0,
            "chunks_created": 0,
        }

    print(
        f"\n🚀 Final Assembly: Handing "
        f"{len(documents_to_store)} documents "
        f"({total_chunks} total chunks) "
        f"to Vector Store..."
    )

    try:
        vsm.store_documents(documents_to_store)

        print("\n✅ SUCCESS: Enterprise Knowledge Base is fully ingested and tagged!")
        print("=" * 60)

        return {
            "status": "success",
            "documents_processed": len(documents_to_store),
            "chunks_created": total_chunks,
        }

    except Exception as e:
        print(f"\n❌ CRITICAL ERROR saving to vector store: {e}")

        return {
            "status": "error",
            "documents_processed": 0,
            "chunks_created": 0,
            "error": str(e),
        }


if __name__ == "__main__":
    stats = run_ingestion_pipeline(rebuild=True)
    print(f"Pipeline Telemetry: {stats}")
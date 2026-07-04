"""
Orchestrates the batch ingestion of enterprise documents.
Acts as a pure coordinator between file loading, chunking, metadata extraction, and storage.
"""
from pathlib import Path
from src.core.config import DATA_DIR, PROJECTS, SUPPORTED_FILE_TYPES
from src.core.document_loader import load_document
from src.core.text_splitter import split_text
from src.week2_knowledge_base.metadata import extract_metadata
from src.core.vector_store import VectorStoreManager

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
    
    # 1. Scan the approved projects in the data directory
    for project_id, display_name in PROJECTS.items():
        project_path = DATA_DIR / project_id
        
        if not project_path.exists():
            print(f"⚠️ Skipping '{display_name}': Directory not found at {project_path.name}")
            continue
            
        print(f"\n📂 Scanning Project: {display_name}")
        
        # 2. Recursive scan for supported files
        for file_path in project_path.rglob("*"):
            if not file_path.is_file() or file_path.suffix.lower() not in SUPPORTED_FILE_TYPES:
                continue
                
            print(f"   📄 Processing: {file_path.name}")
            
            try:
                # --- The Core Orchestration ---
                metadata = extract_metadata(str(file_path))
                raw_text = load_document(str(file_path))
                chunks = split_text(raw_text)
                
                documents_to_store.append({
                    "chunks": chunks,
                    "metadata": metadata
                })
                
                total_chunks += len(chunks)
                print(f"      -> Prepared {len(chunks)} chunks.")
                
            except Exception as e:
                print(f"      ❌ Error processing {file_path.name}: {e}")
                
    # 3. Batch Insertion
    if not documents_to_store:
        print("\n❌ Ingestion failed: No documents were successfully processed.")
        return {
            "status": "failed",
            "documents_processed": 0,
            "chunks_created": 0
        }
        
    print(f"\n🚀 Final Assembly: Handing {len(documents_to_store)} documents ({total_chunks} total chunks) to Vector Store...")
    
    try:
        vsm.store_documents(documents_to_store)
        print("\n✅ SUCCESS: Enterprise Knowledge Base is fully ingested and tagged!")
        print("=" * 60)
        
        # 4. Return Telemetry for Week 6 Dashboards
        return {
            "status": "success",
            "documents_processed": len(documents_to_store),
            "chunks_created": total_chunks
        }
        
    except Exception as e:
        print(f"\n❌ CRITICAL ERROR saving to vector store: {e}")
        return {
            "status": "error",
            "documents_processed": 0,
            "chunks_created": 0,
            "error": str(e)
        }

if __name__ == "__main__":
    # During development, we default to rebuild=True to avoid stacking duplicates
    stats = run_ingestion_pipeline(rebuild=True)
    print(f"Pipeline Telemetry: {stats}")
from src.core.config import DATA_DIR
from src.core.document_loader import load_document
from src.core.text_splitter import split_text
from src.core.vector_store import VectorStoreManager

def test_vector_store():
    print("=" * 50)
    print("Testing Vector Store (Class-Based)")
    print("=" * 50)
    
    target_file = DATA_DIR / "customer_portal" / "requirements.txt"
    
    try:
        # 1. Preparation
        print("1. Extracting and chunking text...")
        text = load_document(str(target_file))
        chunks = split_text(text)
        print(f"   -> Got {len(chunks)} chunks.")
        
        # 2. Initialize Manager
        print("\n2. Initializing VectorStoreManager...")
        vsm = VectorStoreManager(collection_name="test_collection")
        
        # WE REMOVED THIS:
        # print("   -> Resetting old database for a clean test...")
        # vsm.reset()
        
        # 3. Create Store
        print("\n3. Generating embeddings and storing in ChromaDB...")
        print("   (This takes a few seconds, Nomic is working...)")
        vector_store = vsm.create(chunks)
        print("   ✅ SUCCESS: Vector store created.")
        
        # 4. Test Retrieval
        print("\n4. Testing similarity search...")
        retriever = vsm.get_retriever(vector_store)
        
        question = "What is the budget for the project?"
        print(f"   -> Asking: '{question}'")
        
        results = retriever.invoke(question)
        
        if not results:
            raise RuntimeError("Retriever returned no documents. Something is wrong with the similarity search.")
            
        print(f"   ✅ SUCCESS: Retrieved {len(results)} chunks.\n")
        print("--- Top Retrieved Chunk ---")
        print(results[0].page_content.strip())
        print("---------------------------\n")
        print("✅ Vector Store Phase Complete! Your RAG foundation is solid.")
        
    except Exception as e:
        print(f"❌ ERROR: Vector store execution failed: {e}")

if __name__ == "__main__":
    test_vector_store()
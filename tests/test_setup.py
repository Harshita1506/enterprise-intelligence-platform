import chromadb
from src.core.models import get_llm, get_embeddings
from src.core.config import CHROMA_DIR

def run_tests():
    print("Starting System Checks...\n")
    all_tests_passed = True
    
    # 1. Test LLM
    print("1. Testing LLM (Qwen 2.5 7B)...")
    try:
        llm = get_llm()
        response = llm.invoke("Respond with exactly: READY")
        print(f"   Success! LLM says: {response.strip()}\n")
    except Exception as e:
        print(f"   Failed! Is Ollama running? Error: {e}\n")
        all_tests_passed = False

    # 2. Test Embeddings
    print("2. Testing Embeddings (Nomic)...")
    try:
        embedder = get_embeddings()
        vector = embedder.embed_query("Testing my embedding model.")
        print(f"   Success! Generated a vector with {len(vector)} dimensions.\n")
    except Exception as e:
        print(f"   Failed! Did you pull nomic-embed-text? Error: {e}\n")
        all_tests_passed = False

    # 3. Test ChromaDB
    print("3. Testing ChromaDB...")
    try:
        # Using pathlib directly!
        CHROMA_DIR.mkdir(parents=True, exist_ok=True)
        client = chromadb.PersistentClient(path=str(CHROMA_DIR))
        
        # Rigorous test: create, write, and delete
        collection = client.get_or_create_collection("test_collection")
        collection.add(
            documents=["Test document"],
            ids=["1"]
        )
        client.delete_collection("test_collection")
        
        print(f"   Success! ChromaDB connected, wrote, and deleted test data at: {CHROMA_DIR}\n")
    except Exception as e:
        print(f"   Failed! Check your path configuration or permissions. Error: {e}\n")
        all_tests_passed = False

    # Summary Output
    print("=" * 50)
    if all_tests_passed:
        print("All system checks passed.")
    else:
        print("Some system checks failed.")
    print("=" * 50)

if __name__ == "__main__":
    run_tests()
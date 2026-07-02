"""Week 1: RAG Chat System combining Retrieval and Generation."""
from src.core.config import DATA_DIR
from src.core.models import get_llm
from src.core.document_loader import load_document
from src.core.text_splitter import split_text
from src.core.vector_store import VectorStoreManager

def initialize_retriever():
    """Loads the existing vector store, or creates it if it does not exist."""
    print("1/2: Initializing Knowledge Base...")
    
    vsm = VectorStoreManager(collection_name="week1_rag")
    vector_store = vsm.load()
    
    # Check if the database actually has documents stored
    if len(vector_store.get()['ids']) == 0:
        print("     No existing database found. Generating embeddings...")
        target_file = DATA_DIR / "customer_portal" / "requirements.txt"
        
        text = load_document(str(target_file))
        chunks = split_text(text)
        
        vector_store = vsm.create(chunks)
    else:
        print("     Successfully loaded existing database.")
        
    return vsm.get_retriever(vector_store)

def build_prompt(context: str, question: str) -> str:
    """Constructs the prompt to enforce strict context boundaries."""
    return f"""
Answer the question ONLY using the provided context.

If the answer is not found in the context, say:
"I don't have that information."

Context:
{context}

Question:
{question}

Answer:
"""

def main():
    print("=" * 60)
    print("WEEK 1: Enterprise Knowledge Assistant (RAG Pipeline)")
    print("=" * 60)
    
    try:
        # Step 1: Setup Retriever
        retriever = initialize_retriever()
        
        # Step 2: Setup LLM
        print("2/2: Warming up Qwen 2.5 7B...")
        llm = get_llm()
        
        print("\nSystem initialized successfully. Ask questions about the Customer Portal.")
        print("(Type 'quit' to exit)\n")
        
        # Chat Loop
        while True:
            question = input("You: ").strip()
            if question.lower() in ['quit', 'exit', 'q']:
                print("Shutting down...")
                break
            if not question:
                continue
            
            print("Retrieving context & thinking...")
            
            # Step 3: Semantic Retrieval
            results = retriever.invoke(question)
            
            if not results:
                print("\nAssistant: I couldn't find any relevant information in the documents.\n")
                print("-" * 60)
                continue
                
            print(f"(Retrieved {len(results)} relevant chunks)")
            context = "\n\n".join([doc.page_content for doc in results])
            
            # Step 4: Generation
            prompt = build_prompt(context, question)
            answer = llm.invoke(prompt)
            
            print(f"\nAssistant: {answer.strip()}\n")
            print("-" * 60)
            
    except Exception as e:
        print(f"\nCRITICAL ERROR: {e}")

if __name__ == "__main__":
    main()
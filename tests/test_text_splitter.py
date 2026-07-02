from src.core.config import DATA_DIR
from src.core.document_loader import load_document
from src.core.text_splitter import split_text

def test_chunking():
    print("=" * 50)
    print("Testing Text Splitter Module")
    print("=" * 50)
    
    # Target the real PDF document we finalized earlier
    target_file = DATA_DIR / "customer_portal" / "requirements.txt"
    
    print(f"\nAttempting to load text from: {target_file.name}")
    print("-" * 50)
    
    try:
        # 1. Load the text (using our tested dispatcher)
        text = load_document(str(target_file))
        print("✅ SUCCESS: Text extracted.")
        
        # 2. Process text through the splitter
        print("\nProcessing text through RecursiveCharacterTextSplitter...")
        chunks = split_text(text)
        
        # 3. Verify chunk generation
        print(f"Total chunks generated: {len(chunks)}\n")
        
        if len(chunks) == 0:
            print(" WARNING: No chunks generated. Is the document empty?")
            return

        # 4. Print the first 3 chunks to verify size and overlap boundaries
        chunks_to_print = min(3, len(chunks))
        for i in range(chunks_to_print):
            print(f"--- Chunk {i + 1} ---")
            # Print the first 300 characters to keep the terminal readable
            print(chunks[i][:300].strip())
            if len(chunks[i]) > 300:
                print("... [Truncated]")
            print("-" * 25 + "\n")
            
        print(" Verification complete. If the text repeats slightly between chunks, overlap is working!")
        
    except FileNotFoundError:
        print(f"ERROR: Could not find the file at {target_file}")
    except ValueError as ve:
        print(f"FAIL-FAST TRIGGERED: {ve}")
    except Exception as e:
        print(f" ERROR: Chunking execution failed: {e}")

if __name__ == "__main__":
    test_chunking()
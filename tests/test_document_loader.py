from src.core.config import DATA_DIR
from src.core.document_loader import load_document

def test_extraction():
    print("=" * 50)
    print("Testing Document Loader")
    print("=" * 50)
    
    # Target the test file we created earlier
    target_file = DATA_DIR / "customer_portal" / "requirements.txt"
    
    print(f"\nAttempting to load: {target_file.name}")
    print("-" * 50)
    
    try:
        # 1. Test if it loads (using our dispatcher function)
        text = load_document(str(target_file))
        print("SUCCESS: File loaded.")
        
        # 2. Check the length
        print(f"Total characters extracted: {len(text)}")
        
        # 3. Print a snippet to verify it is readable
        print("\n--- Content Preview (First 250 chars) ---")
        print(text[:250])
        print("-----------------------------------------\n")
        
    except FileNotFoundError:
        print(f" ERROR: Could not find the file at {target_file}")
        print("Did you create the requirements.txt file and put it in the customer_portal folder?")
    except Exception as e:
        print(f" ERROR: Something went wrong during extraction: {e}")

if __name__ == "__main__":
    test_extraction()
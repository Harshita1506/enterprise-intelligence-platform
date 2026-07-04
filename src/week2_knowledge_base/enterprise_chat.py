"""
Week 2: HashBot - Enterprise Chat Interface.
Features numbered project selection, application-level error handling, 
structured source extraction, and robust LLM output parsing.
"""
from src.core.models import get_llm
from src.week2_knowledge_base.knowledge_base import EnterpriseKnowledgeBase
from src.core.config import PROJECTS

def build_prompt(context: str, question: str) -> str:
    """Formats the prompt with strict anti-hallucination rules."""
    return f"""Answer the question based ONLY on the following context.
If the answer is not in the context, say "I don't have that information."

Context:
{context}

Question: {question}

Answer:"""

def main():
    print("=" * 60)
    print("WEEK 2: HashBot - Enterprise Knowledge Assistant")
    print("=" * 60)
    
    print("Initializing Knowledge Base API...")
    try:
        kb = EnterpriseKnowledgeBase()
    except Exception as e:
        print(f"❌ Failed to initialize Knowledge Base: {e}")
        return
        
    print("Warming up Qwen 2.5 7B...")
    llm = get_llm()
    
    print("\nSystem Ready!")
    print("(Type 'quit' to exit at any prompt)\n")
    
    project_keys = list(PROJECTS.keys())
    
    while True:
        print("-" * 60)
        print("Available Projects:")
        print("  0. [Global Search - All Projects]")
        for i, key in enumerate(project_keys, 1):
            print(f"  {i}. {PROJECTS[key]}")
        
        # 1. UX Improvement: Project Selection First
        proj_choice = input("\nSelect a project number (0-3): ").strip()
        
        if proj_choice.lower() in ['quit', 'exit', 'q']:
            print("Shutting down...")
            break
            
        project_filter = None
        if proj_choice.isdigit():
            idx = int(proj_choice)
            if 1 <= idx <= len(project_keys):
                project_filter = project_keys[idx - 1]
            elif idx != 0:
                print("⚠️ Invalid number. Defaulting to Global Search.")
        else:
            print("⚠️ Invalid input. Defaulting to Global Search.")
            
        # 2. UX Improvement: Question Second
        question = input("\nYou: ").strip()
        if question.lower() in ['quit', 'exit', 'q']:
            print("Shutting down...")
            break
        if not question:
            continue
            
        print("\nRetrieving context & thinking...")
        
        # 3. Application-Level Exception Handling & Structured Retrieval
        try:
            docs = kb.retrieve_documents(query=question, project_id=project_filter)
        except RuntimeError as e:
            print(f"\n❌ Retrieval Error: {e}\n")
            continue
            
        if not docs:
            print("\nHashBot: I couldn't find any relevant information.\n")
            continue
            
        # 4. Structured Source Extraction (No Regex!)
        sources = {d.metadata.get("source", "Unknown Source") for d in docs}
        if sources:
            print(f"📚 Sources retrieved: {', '.join(sources)}")
        
        # 5. Format Context for the Prompt
        context_blocks = [f"[Source: {d.metadata.get('source', 'Unknown Source')}]\n{d.page_content}" for d in docs]
        context_string = "\n\n".join(context_blocks)
        
        prompt = build_prompt(context_string, question)
        
        try:
            response = llm.invoke(prompt)
            
            # Robust Output Parsing
            if hasattr(response, "content"):
                answer = response.content
            else:
                answer = str(response)
                
            print(f"\nHashBot: {answer.strip()}\n")
            
        except Exception as e:
            print(f"\n❌ LLM Generation Error: {e}\n")

if __name__ == "__main__":
    main()
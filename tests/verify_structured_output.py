"""
Verifies if the installed version of langchain-ollama supports 
.with_structured_output() natively using an enterprise domain test.
"""
import traceback
from pydantic import BaseModel, Field
from src.core.models import get_chat_llm

class ProjectStatus(BaseModel):
    project_name: str = Field(description="The name of the project")
    status: str = Field(description="Current status (e.g., On Track, Blocked, In Progress)")
    summary: str = Field(description="A brief summary of the project state")

def run_verification():
    print("=" * 60)
    print("Verifying ChatOllama Structured Output Compatibility")
    print("=" * 60 + "\n")
    
    try:
        llm = get_chat_llm()
        print(f"⚙️ Using model: {llm.model}")
        
        structured_llm = llm.with_structured_output(ProjectStatus)
        
        print("🧠 Asking LLM to generate a structured Pydantic object...")
        
        prompt = """
        Project Name: Customer Portal
        
        Meeting Notes:
        API integration completed.
        UI testing is in progress.
        Deployment scheduled next week.
        
        Generate a structured project status based on this information.
        """
        
        result: ProjectStatus = structured_llm.invoke(prompt)
        
        print("\n✅ SUCCESS: Native structured output is supported!")
        print(f"Returned Type: {type(result)}")
        print("-" * 40)
        print(f"Project Name : {result.project_name}")
        print(f"Status       : {result.status}")
        print(f"Summary      : {result.summary}")
        print("-" * 40)
        print("\nWe are clear to build the ProjectSummarizer!")
        
    except NotImplementedError:
        print("\n❌ FAIL: .with_structured_output() is NOT implemented in your version.")
        print("We will need to use a JSON parsing fallback (OutputParser) for the Summarizer.")
    except Exception as e:
        print(f"\n❌ FAIL: An unexpected error occurred: {e}\n")
        traceback.print_exc()

if __name__ == "__main__":
    run_verification()
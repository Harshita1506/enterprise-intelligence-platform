import langchain
import langchain_core
import langchain_ollama
import pydantic

print("=" * 60)
print("Environment Information")
print("=" * 60)

print("LangChain        :", langchain.__version__)
print("LangChain Core   :", langchain_core.__version__)
print("LangChain Ollama :", langchain_ollama.__version__)
print("Pydantic         :", pydantic.__version__)
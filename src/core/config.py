"""Configuration for the entire platform."""
from pathlib import Path

# Base paths using pathlib (cleaner and more robust than os.path)
# This assumes config.py is inside src/core/
BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
CHROMA_DIR = DATA_DIR / "chroma_db"
'''
# Ollama models optimized for 16GB RAM running entirely on CPU
LLM_MODEL = "qwen2.5:7b"            # Main reasoning model
EMBEDDING_MODEL = "nomic-embed-text" # Vector embedding model
LLM_TEMPERATURE = 0.1               # Low temperature for enterprise consistency
'''
# ==========================
# LLM Configuration
# ==========================

LLM_PROVIDER = "groq"        # "groq" or "ollama"

LLM_MODEL = "openai/gpt-oss-20b"

LLM_TEMPERATURE = 0.1

# ==========================
# Embedding Configuration
# ==========================

EMBEDDING_PROVIDER = "ollama"

EMBEDDING_MODEL = "nomic-embed-text"
# Text Processing Hyperparameters
CHUNK_SIZE = 500       # Maximum characters per sliced chunk
CHUNK_OVERLAP = 50     # Overlapping characters between consecutive chunks
TOP_K = 3          # Number of relevant document chunks to pull during retrieval

# Validated System Projects (Dictionary mapping internal IDs to Display Names)
PROJECTS = {
    "customer_portal_modernization": "Customer Portal Modernization",
    "inventory_management_ai": "Inventory Management AI",
    "healthcare_appointment_system": "Healthcare Appointment System",
    "hr_recruitment_platform": "HR Recruitment Platform",
    "smart_manufacturing_dashboard": "Smart Manufacturing Dashboard"
}
# Knowledge Base Settings
ENTERPRISE_COLLECTION = "enterprise_knowledge"
SUPPORTED_FILE_TYPES = {".txt", ".pdf", ".docx"}
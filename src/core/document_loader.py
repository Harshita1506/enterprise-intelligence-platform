"""Load PDF, DOCX, and TXT files."""
from pathlib import Path
from PyPDF2 import PdfReader
from docx import Document

def load_pdf(file_path: str) -> str:
    """Extract text from a PDF file."""
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

def load_docx(file_path: str) -> str:
    """Extract text from a Word document."""
    doc = Document(file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

def load_txt(file_path: str) -> str:
    """Extract text from a text file."""
    path = Path(file_path)
    with path.open("r", encoding="utf-8") as f:
        return f.read()

def load_document(file_path: str) -> str:
    """
    Dispatcher: Load any supported document type.
    Routes the file to the appropriate loader based on its extension.
    """
    path = Path(file_path)
    
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
        
    suffix = path.suffix.lower()
    
    if suffix == '.pdf':
        return load_pdf(str(path))
    elif suffix == '.docx':
        return load_docx(str(path))
    elif suffix == '.txt':
        return load_txt(str(path))
    else:
        raise ValueError(f"Unsupported file type: {suffix}")
# Enterprise AI Platform

An AI-powered Enterprise Knowledge & Project Intelligence Platform that transforms unstructured organizational knowledge into actionable insights through Retrieval-Augmented Generation (RAG), intelligent agent orchestration, and semantic project understanding.

The platform enables users to interact with enterprise knowledge using natural language, retrieve project-specific information, generate executive summaries, identify project risks, extract action items, and visualize project health through an interactive dashboard.

Developed as part of an **AI Engineering Internship**, this project demonstrates the practical implementation of modern enterprise AI systems using **LangGraph, LangChain, FastAPI, Next.js, ChromaDB, and Ollama**.

---

# Features

## AI Companion

- Conversational AI assistant for enterprise project intelligence
- Context-aware follow-up conversations
- Intelligent project resolution
- Multi-step reasoning using LangGraph
- Tool-based workflow orchestration
- Enterprise knowledge retrieval with source grounding

---

## Enterprise Knowledge Base

- Semantic document search
- Project-aware retrieval
- Vector similarity search
- Source citation support
- Document upload and indexing
- Context generation for grounded LLM responses

---

## Project Intelligence

Generate AI-powered project insights including:

- Executive project summaries
- Risk analysis
- Action item extraction
- Strategic recommendations
- Project health assessment

---

## Enterprise Dashboard

Interactive dashboard providing:

- Portfolio overview
- AI-generated insights
- Project health metrics
- Risk indicators
- Knowledge base statistics
- Project analytics

---

## Project Management

- Project metadata management
- Intelligent project resolution
- Workspace navigation
- Project-specific document retrieval
- Enterprise project organization

---

# System Architecture

```
                          ┌──────────────────────────┐
                          │     Next.js Frontend      │
                          └─────────────┬────────────┘
                                        │
                                   REST API
                                        │
                          ┌─────────────▼────────────┐
                          │     FastAPI Backend       │
                          └─────────────┬────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              │                         │                         │
              ▼                         ▼                         ▼
       LangGraph Workflow      Knowledge Base Services    Project Intelligence
              │                         │                         │
              ▼                         ▼                         ▼
      Semantic Router           Chroma Vector Store       AI Intelligence Tools
              │
              ▼
        Ollama (Llama 3)
```

---

# Technology Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

---

## Backend

- FastAPI
- Python
- LangChain
- LangGraph
- ChromaDB
- Ollama
- SQLAlchemy
- Pydantic

---

# Project Structure

```
enterprise-ai-platform/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   └── styles/
│
├── backend/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── services/
│   ├── week1_rag/
│   ├── week2_knowledge_base/
│   ├── week3_project_intelligence/
│   ├── week4_agents/
│   ├── week5_langgraph/
│   └── week5_evaluation/
│
├── uploads/
├── chroma_db/
├── requirements.txt
└── README.md
```

---

# AI Workflow

The platform follows a multi-stage enterprise AI workflow:

1. User submits a natural language query.
2. The semantic router determines the required workflow.
3. The project resolver identifies the active project context.
4. LangGraph orchestrates intelligent tool execution.
5. Enterprise knowledge is retrieved from ChromaDB.
6. Project Intelligence services generate structured insights.
7. The final response is synthesized and returned to the user.

---

# Installation

## Pre-generated Chroma Vector Database

This repository includes a pre-generated Chroma vector database to simplify evaluation and demonstration.

Instead of rebuilding embeddings and indexing all documents during the first startup, the application can immediately perform semantic search over the provided knowledge base.

### Why is it included?

- Faster project setup.
- Immediate access to AI-powered document retrieval.
- Consistent demonstration results.
- Avoids lengthy indexing during evaluation.

> **Note:** In a production environment, the vector database would typically be generated during the document ingestion process rather than being committed to the repository. It is included here solely to improve the demonstration and evaluation experience.

## Prerequisites

- Python 3.11+
- Node.js 20+
- Ollama

---

## Clone the Repository

```bash
git clone <repository-url>
cd enterprise-ai-platform
```

---

## Backend Setup

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

Install dependencies.

```bash
pip install -r requirements.txt
```

---

## Ollama Setup

Download the required models.

```bash
ollama pull llama3
```

```bash
ollama pull nomic-embed-text
```

Start the Ollama server.

```bash
ollama serve
```

---

## Frontend Setup

```bash
npm install
```

---

# Running the Application

## Backend

Start the FastAPI server.

```bash
uvicorn main:app --reload
```

Backend URL

```
http://localhost:8000
```

---

## Frontend

Start the Next.js development server.

```bash
npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# API Overview

| Endpoint | Description |
|-----------|-------------|
| `/chat` | AI Companion |
| `/dashboard` | Dashboard analytics |
| `/projects` | Project management |
| `/knowledge-base` | Enterprise knowledge retrieval |
| `/upload` | Document upload and ingestion |
| `/documents` | Document management |

---

# Core Components

## Retrieval-Augmented Generation (RAG)

Enterprise documents are embedded using Ollama embeddings and stored inside ChromaDB. Relevant information is retrieved and supplied to the language model to produce grounded, context-aware responses.

---

## LangGraph Orchestration

The platform uses LangGraph to coordinate:

- Semantic routing
- Tool execution
- Context management
- Multi-step workflows
- Response synthesis

---

## Project Intelligence Services

Specialized AI services include:

- Executive summarization
- Risk analysis
- Action item extraction
- Strategic insight generation

---

## Enterprise Dashboard

The dashboard aggregates enterprise information into a unified interface featuring AI-generated summaries, portfolio statistics, project intelligence, and key performance indicators.

---

# Testing

The project includes dedicated testing modules covering:

- Knowledge base retrieval
- Semantic routing
- LangGraph orchestration
- Execution engine
- Project intelligence services
- Evaluation benchmarks

---

# Known Limitations

- Optimized for local Ollama deployment.
- Performance depends on available system resources.
- PDF preview functionality may vary depending on browser support.
- Newly uploaded documents may require re-indexing depending on deployment configuration.

---

# Future Enhancements

Potential future improvements include:

- Multi-user authentication
- Role-based access control
- Cloud deployment
- Persistent relational database integration
- Streaming AI responses
- CI/CD pipeline
- Advanced analytics dashboard
- Multi-agent collaboration
- Enterprise SSO integration

---

# Learning Outcomes

This project demonstrates practical implementation of:

- Retrieval-Augmented Generation (RAG)
- Agentic AI workflows
- LangGraph orchestration
- Semantic search
- Vector databases
- Enterprise AI architecture
- FastAPI backend development
- Next.js frontend development
- Full-stack AI application engineering

---

# Author

**Harshita Singhal**

**AI Engineering Intern**

This project was developed as part of an AI Engineering Internship to demonstrate the design and implementation of an enterprise-grade AI platform using Retrieval-Augmented Generation (RAG), LangGraph orchestration, semantic search, and modern full-stack technologies.

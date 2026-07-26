# Enterprise AI Platform

An AI-powered Enterprise Knowledge & Project Intelligence Platform that transforms unstructured organizational knowledge into actionable insights through Retrieval-Augmented Generation (RAG), intelligent agent orchestration, and semantic project understanding.

The platform enables users to interact with enterprise knowledge using natural language, retrieve project-specific information, generate executive summaries, identify project risks, extract action items, and visualize project health through an interactive dashboard.

Developed as part of an **AI Engineering Internship**, this project demonstrates the practical implementation of modern enterprise AI systems using **LangGraph, LangChain, FastAPI, Next.js, ChromaDB, Ollama Embeddings, Groq API, and Docker Compose**.

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

## Deployment

- Dockerized frontend and backend
- Docker Compose orchestration
- Portable local deployment
- Consistent development and demonstration environment

---

# System Architecture

```text
                          ┌──────────────────────────┐
                          │     Next.js Frontend     │
                          └─────────────┬────────────┘
                                        │
                                   REST API
                                        │
                          ┌─────────────▼────────────┐
                          │     FastAPI Backend      │
                          └─────────────┬────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              │                         │                         │
              ▼                         ▼                         ▼
       LangGraph Workflow      Knowledge Base Services    Project Intelligence
              │                         │
              ▼                         ▼
     Groq API (GPT-OSS-20B)     ChromaDB + Ollama Embeddings
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
- Groq API
- Ollama (Embeddings)
- SQLAlchemy
- Pydantic
- Docker
- Docker Compose

---

# Project Structure

```text
enterprise-ai-platform/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   └── styles/
│
├── frontend/
├── src/
│   ├── core/
│   ├── api/
│   ├── week1_ingestion/
│   ├── week2_knowledge_base/
│   ├── week3_project_intelligence/
│   ├── week4_agents/
│   └── week5_langgraph/
├── uploads/
├── data/
│   └── chroma_db/
├── main.py
├── requirements.txt
├── docker-compose.yml
├── Dockerfile
├── .env
├── .env.docker
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

- Faster project setup
- Immediate access to AI-powered document retrieval
- Consistent demonstration results
- Avoids lengthy indexing during evaluation

> **Note:** In a production environment, the vector database would typically be generated during the document ingestion process rather than being committed to the repository. It is included here solely to improve the demonstration and evaluation experience.

---

## Prerequisites

- Python 3.11+
- Node.js 20+
- Ollama
- Docker (optional for containerized deployment)

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

Install dependencies.

```bash
pip install -r requirements.txt
```

---

## Ollama Setup

Download the embedding model.

```bash
ollama pull nomic-embed-text
```

Start Ollama.

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

## Local Development

### Backend

```bash
uvicorn main:app --reload
```

Backend:

```
http://localhost:8000
```

### Frontend

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

# Docker Deployment

The platform has been fully containerized using Docker and Docker Compose, enabling a reproducible and portable deployment environment.

## Build

```bash
docker compose build
```

## Start

```bash
docker compose up
```

or

```bash
docker compose up -d
```

## Stop

```bash
docker compose down
```

The Docker deployment launches:

- Frontend (Next.js)
- Backend (FastAPI)

Frontend:

```
http://localhost:3000
```

Backend API:

```
http://localhost:8000
```


---

# Quick Start Guide

## Running Locally

1. Install prerequisites:
   - Python 3.11+
   - Node.js 20+
   - Docker Desktop (optional)
   - Ollama

2. Pull the embedding model:

```bash
ollama pull nomic-embed-text
```

3. Create a `.env` file:

```env
GROQ_API_KEY2=YOUR_API_KEY
OLLAMA_BASE_URL=http://127.0.0.1:11434
```

4. Start Ollama:

```bash
ollama serve
```

5. Start the backend from the project root:

```bash
python -m venv venv
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend:
- http://localhost:8000
- Swagger: http://localhost:8000/docs

6. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
- http://localhost:3000

---

## Running with Docker

Create a `.env.docker` file:

```env
GROQ_API_KEY2=YOUR_API_KEY
OLLAMA_BASE_URL=http://host.docker.internal:11434
```

Run:

```bash
docker compose up --build
```

Stop:

```bash
docker compose down
```

Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

---

# Troubleshooting

## Failed to connect to Ollama

Verify:

```bash
ollama serve
ollama list
```

Local:
`OLLAMA_BASE_URL=http://127.0.0.1:11434`

Docker:
`OLLAMA_BASE_URL=http://host.docker.internal:11434`

## Backend Import Error

Always start the backend from the project root:

```bash
uvicorn main:app --reload
```

---

# Screenshots

Add screenshots here:

- Home Dashboard
- Projects
- Knowledge Base
- AI Companion
- Document Upload
- Docker Deployment


# API Overview

| Endpoint | Description |
|----------|-------------|
| `/chat` | AI Companion |
| `/dashboard` | Dashboard analytics |
| `/projects` | Project management |
| `/knowledge-base` | Enterprise knowledge retrieval |
| `/upload` | Document upload and ingestion |
| `/documents` | Document management |

---

# Core Components

## Retrieval-Augmented Generation (RAG)

Enterprise documents are embedded using **Ollama Embeddings** and stored in **ChromaDB**. Relevant information is retrieved and supplied to the **Groq-hosted GPT-OSS-20B model** to produce grounded, context-aware responses.

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

- Executive summarization
- Risk analysis
- Action item extraction
- Strategic insight generation

---

## Enterprise Dashboard

The dashboard aggregates enterprise information into a unified interface featuring AI-generated summaries, portfolio statistics, project intelligence, and key performance indicators.

---

# Testing

The project includes testing for:

- Knowledge base retrieval
- Semantic routing
- LangGraph orchestration
- Execution engine
- Project intelligence services
- Evaluation benchmarks

---

# Known Limitations

- Optimized for local Ollama embedding deployment with Groq-hosted inference.
- Performance depends on available system resources and network latency.
- PDF preview functionality may vary depending on browser support.
- Newly uploaded documents may require re-indexing depending on deployment configuration.

---

# Future Enhancements

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
- Docker containerization
- Docker Compose orchestration
- Enterprise deployment workflows
- API-driven AI system integration

---

# Author

**Harshita Singhal**

**AI Engineering Intern**

This project was developed as part of an AI Engineering Internship to demonstrate the design and implementation of an enterprise-grade AI platform using Retrieval-Augmented Generation (RAG), LangGraph orchestration, semantic search, and modern full-stack technologies.
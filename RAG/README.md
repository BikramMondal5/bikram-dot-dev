# Gemini RAG System

A complete Retrieval-Augmented Generation (RAG) system using Gemini 2.5 Flash, ChromaDB, and FastAPI - integrated with the ChatWidget.

## Features
- **PDF Ingestion**: Parses, chunks, and embeds PDF documents
- **RAG Pipeline**: Retrieves relevant context and generates accurate answers using Gemini
- **Vector Search**: Uses ChromaDB for efficient semantic search
- **FastAPI Backend**: Provides `ingest` and `ask` endpoints
- **ChatWidget Integration**: Seamlessly integrated with the Next.js ChatWidget

## Quick Start

### Automated Setup (Recommended)

From the **project root directory**, run:

```bash
python setup_rag.py
```

This will automatically:
1. Check Python version
2. Create/verify environment configuration
3. Install dependencies
4. Check for PDF documents
5. Ingest documents into the vector database

### Manual Setup

1. **Install dependencies**:
   ```bash
   cd RAG
   pip install -r requirements.txt
   ```

2. **Configure Environment**:
   Create/edit the `.env` file in the RAG folder:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Get your API key from: https://makersuite.google.com/app/apikey

3. **Add Documents**:
   Place PDF files in the `pdfs/` directory

4. **Ingest Documents**:
   ```bash
   python -m app.ingest
   ```

## Running the Servers

### Option 1: Using the Startup Script (Windows)

From the project root:
```bash
start_servers.bat
```

### Option 2: Using the Shell Script (macOS/Linux)

From the project root:
```bash
chmod +x start_servers.sh
./start_servers.sh
```

### Option 3: Manual Start

**Terminal 1 - RAG Backend:**
```bash
cd RAG
python -m app.main
```
Server starts at `http://localhost:8000`

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```
App starts at `http://localhost:3000`

## Prerequisites
1. Python 3.8 or higher
2. Node.js 18 or higher
3. A Google Gemini API Key (get from https://makersuite.google.com/app/apikey)

## Usage

### 1. Ingest a PDF
Place your PDF files in the `pdfs/` directory.

**Endpoint**: `POST /ingest`
**Body**:
```json
{
    "pdf_path": "pdfs/yourdocument.pdf"
}
```
**Response**:
```json
{
    "status": "indexed",
    "chunks": 42
}
```

### 2. Ask a Question
**Endpoint**: `POST /ask`
**Body**:
```json
{
    "question": "What is the main topic of chapter 2?"
}
```
**Response**:
```json
{
    "answer": "The main topic of chapter 2 is..."
}
```

## Project Structure
```
project/
│── app/
│   │── main.py            # API Entry point
│   │── rag.py             # RAG Logic (Retrieval + Generation)
│   │── ingest.py          # Ingestion Logic (PDF -> VectorDB)
│   │── config.py          # Configuration & Database setup
│   │── utils/
│       │── pdf_loader.py  # PDF text extraction
│       │── chunker.py     # Text chunking
│       │── embeddings.py  # Gemini embeddings wrapper
│       │── vectorstore.py # ChromaDB wrapper
│── db/                    # Persistent Vector Database
│── pdfs/                  # Storage for input PDFs
│── requirements.txt
│── .env
│── README.md
```

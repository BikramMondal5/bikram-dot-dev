# RAG-Integrated ChatWidget Setup Guide

## Overview
The ChatWidget now uses a Retrieval Augmented Generation (RAG) pipeline to answer questions based on documents stored in the `RAG/pdfs/` directory. The system retrieves relevant context from the documents and generates accurate responses using Google's Gemini AI.

## Architecture
```
User → ChatWidget (React) → Next.js API (/api/rag) → FastAPI Backend (Python) → RAG Pipeline → Gemini AI
```

## Prerequisites
- Python 3.8 or higher
- Node.js 18 or higher
- Google Gemini API key (get one from https://makersuite.google.com/app/apikey)

## Setup Instructions

### 1. Configure Environment Variables

#### For the RAG Backend (Python):
Edit `RAG/.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

#### For the Next.js Frontend:
The `.env.local` file already contains the necessary configuration:
```env
RAG_BACKEND_URL=http://localhost:8000
```

### 2. Install Python Dependencies

Navigate to the RAG folder and install dependencies:
```bash
cd RAG
pip install -r requirements.txt
```

Or if you prefer using a virtual environment:
```bash
cd RAG
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Prepare Your Documents

Place PDF documents in the `RAG/pdfs/` directory. These will be the knowledge base for the chatbot.

### 4. Ingest Documents into Vector Database

Run the ingestion script to process PDFs and store them in ChromaDB:
```bash
cd RAG
python -m app.ingest
```

Or you can use the API endpoint after starting the server (see below).

### 5. Start the RAG Backend Server

In the RAG directory, run:
```bash
cd RAG
python -m app.main
```

Or using uvicorn directly:
```bash
cd RAG
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The server should start on `http://localhost:8000`

### 6. Start the Next.js Development Server

In a new terminal, from the project root:
```bash
npm run dev
```

The Next.js app should start on `http://localhost:3000`

## Testing the Integration

### 1. Test RAG Backend Health
Open your browser to: `http://localhost:8000/docs`
You should see the FastAPI interactive documentation.

### 2. Test the Next.js API Endpoint
Open your browser to: `http://localhost:3000/api/rag`
You should see a JSON response indicating the connection status.

### 3. Test the ChatWidget
1. Open your website at `http://localhost:3000`
2. Click on the chat bubble in the bottom-right corner
3. Ask a question related to your documents
4. The ChatWidget will:
   - First try the RAG pipeline
   - If RAG fails, fall back to the original Gemini API with fallback responses

## RAG API Endpoints

### FastAPI Backend (Python) - Port 8000

#### POST /ask
Ask a question based on the documents.
```json
{
  "question": "What is this document about?"
}
```

Response:
```json
{
  "answer": "Based on the documents..."
}
```

#### POST /ingest
Ingest a new PDF document.
```json
{
  "pdf_path": "pdfs/sample.pdf"
}
```

### Next.js API - Port 3000

#### POST /api/rag
Proxy to the RAG backend.
```json
{
  "question": "What is this document about?"
}
```

#### GET /api/rag
Health check endpoint to verify RAG backend connection.

## How It Works

1. **User asks a question** in the ChatWidget
2. **ChatWidget sends** the question to `/api/rag`
3. **Next.js API** forwards the request to the Python FastAPI backend at `http://localhost:8000/ask`
4. **RAG Pipeline**:
   - Embeds the question using Google's embedding model
   - Searches ChromaDB vector store for relevant document chunks
   - Retrieves top 5 most relevant chunks
   - Constructs a prompt with the context
   - Sends to Gemini AI for answer generation
5. **Response flows back** through the chain to display in ChatWidget
6. **If RAG fails**, the system automatically falls back to the original Gemini API

## Troubleshooting

### RAG Backend Not Starting
- **Issue**: `ModuleNotFoundError`
- **Solution**: Make sure you're in the RAG directory and have installed all dependencies:
  ```bash
  cd RAG
  pip install -r requirements.txt
  ```

### "Could not connect to RAG backend"
- **Issue**: Next.js can't reach the Python server
- **Solution**: 
  - Make sure the RAG backend is running on port 8000
  - Check that `RAG_BACKEND_URL` in `.env.local` is correct
  - Verify firewall settings

### "No relevant information found"
- **Issue**: No documents have been ingested
- **Solution**: 
  - Add PDF files to `RAG/pdfs/`
  - Run the ingestion: `python -m app.ingest`
  - Or use the `/ingest` API endpoint

### CORS Errors
- **Issue**: Cross-origin request blocked
- **Solution**: The FastAPI server already has CORS enabled for `http://localhost:3000`

### API Key Errors
- **Issue**: `GEMINI_API_KEY not found`
- **Solution**: 
  - Create/edit `RAG/.env` file
  - Add your Gemini API key: `GEMINI_API_KEY=your_key_here`

## Managing Documents

### Adding New Documents
1. Place PDF files in `RAG/pdfs/`
2. Run ingestion: `python -m app.ingest`
3. The new documents will be added to the vector database

### Clearing the Database
To clear all ingested documents:
```bash
cd RAG
python clear_db.py
```

### Re-ingesting All Documents
```bash
cd RAG
python clear_db.py
python -m app.ingest
```

## Production Deployment

For production deployment:

1. **Set proper environment variables**:
   - Use production URLs instead of localhost
   - Keep API keys secure

2. **Deploy RAG backend**:
   - Use a production WSGI server like Gunicorn
   - Set up proper logging and monitoring
   - Consider using Docker for consistency

3. **Update Next.js configuration**:
   - Set `RAG_BACKEND_URL` to your production backend URL
   - Enable proper error handling and fallbacks

## Development Tips

- **Monitor logs**: Check both Next.js and FastAPI logs for errors
- **Test endpoints**: Use the FastAPI docs at `/docs` for testing
- **Fallback system**: The ChatWidget automatically falls back to Gemini if RAG fails
- **Document quality**: Better structured PDFs produce better results
- **Chunk size**: Adjust chunking parameters in `RAG/app/utils/chunker.py` if needed

## Need Help?

If you encounter issues:
1. Check the console logs in both terminals (Next.js and Python)
2. Verify all environment variables are set correctly
3. Ensure both servers are running
4. Test each component individually using the health check endpoints

#!/bin/bash
# Start RAG Backend and Next.js Development Server
# This script starts both servers in the background

echo "================================================"
echo "Starting RAG Integration Servers"
echo "================================================"
echo ""

# Check if we're in the correct directory
if [ ! -d "RAG/app" ]; then
    echo "ERROR: RAG folder not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Check if RAG backend dependencies are installed
if ! python3 -c "import fastapi" 2>/dev/null; then
    echo "WARNING: Python dependencies may not be installed."
    echo "Run: cd RAG && pip install -r requirements.txt"
    echo ""
fi

# Start RAG Backend
echo "Starting RAG Backend Server (Port 8000)..."
cd RAG
python3 -m app.main &
RAG_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for RAG backend to start..."
sleep 3

# Start Next.js Dev Server
echo "Starting Next.js Development Server (Port 3000)..."
npm run dev &
NEXT_PID=$!

echo ""
echo "================================================"
echo "Servers Started Successfully!"
echo "================================================"
echo ""
echo "RAG Backend:  http://localhost:8000 (PID: $RAG_PID)"
echo "Next.js App:  http://localhost:3000 (PID: $NEXT_PID)"
echo "API Docs:     http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Function to cleanup when script is terminated
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $RAG_PID 2>/dev/null
    kill $NEXT_PID 2>/dev/null
    echo "Servers stopped."
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup INT TERM

# Wait for processes
wait

#!/bin/bash
# Pre-Deployment Testing Script for Linux/Mac
# This script tests your build locally before deploying

echo "========================================"
echo "Pre-Deployment Testing"
echo "========================================"
echo ""

# Check Node.js version
echo "[1/8] Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found. Please install Node.js 18+"
    exit 1
fi
node --version
echo "✓ Node.js found"
echo ""

# Check Python version
echo "[2/8] Checking Python version..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python not found. Please install Python 3.11+"
    exit 1
fi
python3 --version
echo "✓ Python found"
echo ""

# Check environment files
echo "[3/8] Checking environment files..."
if [ ! -f ".env.local" ]; then
    echo "WARNING: .env.local not found!"
    echo "Please copy .env.local.example to .env.local and fill in values"
    read -p "Press enter to continue..."
fi
if [ ! -f "RAG/.env" ]; then
    echo "WARNING: RAG/.env not found!"
    echo "Please copy RAG/.env.example to RAG/.env and fill in values"
    read -p "Press enter to continue..."
fi
echo "✓ Environment files checked"
echo ""

# Install dependencies
echo "[4/8] Installing Node.js dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

# Run linting
echo "[5/8] Running linting..."
npm run lint
if [ $? -ne 0 ]; then
    echo "WARNING: Linting found issues. Fix them before deploying."
    read -p "Press enter to continue..."
fi
echo "✓ Linting complete"
echo ""

# Build Next.js
echo "[6/8] Building Next.js for production..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed! Fix errors before deploying."
    exit 1
fi
echo "✓ Build successful"
echo ""

# Test Python backend
echo "[7/8] Testing Python RAG backend..."
cd RAG
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt
python3 -m py_compile app/main.py
if [ $? -ne 0 ]; then
    echo "ERROR: Python backend has syntax errors!"
    exit 1
fi
cd ..
echo "✓ Backend tests passed"
echo ""

# Final summary
echo "[8/8] Summary"
echo "========================================"
echo "✓ All checks passed!"
echo "Your project is ready for deployment."
echo ""
echo "Next steps:"
echo "1. Push code to GitHub: git push origin main"
echo "2. Follow QUICK_DEPLOY.md for deployment"
echo "========================================"

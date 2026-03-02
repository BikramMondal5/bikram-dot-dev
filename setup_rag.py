#!/usr/bin/env python3
"""
Quick setup script for RAG integration
Run this script to set up the RAG system for the first time
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is 3.8 or higher"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        print(f"   Current version: {sys.version}")
        sys.exit(1)
    print("✅ Python version check passed")

def check_env_file():
    """Check if .env file exists and has required variables"""
    env_path = os.path.join("RAG", ".env")
    
    if not os.path.exists(env_path):
        print("❌ RAG/.env file not found")
        print("   Creating template .env file...")
        with open(env_path, "w") as f:
            f.write("# Gemini API Key - Required for RAG system\n")
            f.write("GEMINI_API_KEY=your_gemini_api_key_here\n")
        print("✅ Created RAG/.env template")
        print("   ⚠️  Please add your Gemini API key to RAG/.env")
        return False
    
    with open(env_path, "r") as f:
        content = f.read()
        if "your_gemini_api_key_here" in content or "GEMINI_API_KEY=" not in content:
            print("⚠️  GEMINI_API_KEY not configured in RAG/.env")
            print("   Please add your API key to RAG/.env")
            return False
    
    print("✅ Environment file configured")
    return True

def install_dependencies():
    """Install Python dependencies"""
    print("\n📦 Installing Python dependencies...")
    try:
        subprocess.run([
            sys.executable, "-m", "pip", "install", "-r", "RAG/requirements.txt"
        ], check=True)
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False

def check_pdfs():
    """Check if PDF files exist"""
    pdf_dir = os.path.join("RAG", "pdfs")
    
    if not os.path.exists(pdf_dir):
        print("❌ RAG/pdfs directory not found")
        os.makedirs(pdf_dir)
        print("✅ Created RAG/pdfs directory")
    
    pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    
    if not pdf_files:
        print("⚠️  No PDF files found in RAG/pdfs/")
        print("   Add PDF documents to RAG/pdfs/ to create your knowledge base")
        return False
    
    print(f"✅ Found {len(pdf_files)} PDF file(s) in RAG/pdfs/")
    for pdf in pdf_files:
        print(f"   - {pdf}")
    return True

def ingest_documents():
    """Run document ingestion"""
    print("\n📚 Ingesting documents into vector database...")
    print("   This may take a few moments...")
    
    try:
        # Change to RAG directory
        original_dir = os.getcwd()
        os.chdir("RAG")
        
        subprocess.run([
            sys.executable, "-m", "app.ingest"
        ], check=True)
        
        os.chdir(original_dir)
        print("✅ Documents ingested successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to ingest documents")
        os.chdir(original_dir)
        return False
    except FileNotFoundError:
        print("⚠️  Ingestion skipped - no PDFs found")
        os.chdir(original_dir)
        return True

def main():
    """Main setup process"""
    print("=" * 60)
    print("RAG Integration Setup")
    print("=" * 60)
    print()
    
    # Check Python version
    check_python_version()
    
    # Check environment file
    env_ok = check_env_file()
    
    # Install dependencies
    deps_ok = install_dependencies()
    
    if not deps_ok:
        print("\n❌ Setup failed: Could not install dependencies")
        sys.exit(1)
    
    # Check for PDFs
    pdfs_exist = check_pdfs()
    
    # Ingest documents if env is configured and PDFs exist
    if env_ok and pdfs_exist:
        ingest_ok = ingest_documents()
    else:
        print("\n⚠️  Skipping document ingestion")
        if not env_ok:
            print("   Reason: API key not configured")
        if not pdfs_exist:
            print("   Reason: No PDF files found")
        ingest_ok = False
    
    # Final instructions
    print("\n" + "=" * 60)
    print("Setup Summary")
    print("=" * 60)
    
    if env_ok and deps_ok and ingest_ok:
        print("✅ Setup completed successfully!")
        print("\nNext steps:")
        print("1. Start the RAG backend:")
        print("   cd RAG")
        print("   python -m app.main")
        print()
        print("2. In another terminal, start Next.js:")
        print("   npm run dev")
        print()
        print("3. Open http://localhost:3000 and test the chat!")
    else:
        print("⚠️  Setup completed with warnings")
        print("\nPlease address the issues above and try again.")
        print("\nTo manually complete setup:")
        if not env_ok:
            print("1. Add your Gemini API key to RAG/.env")
        if not pdfs_exist:
            print("2. Add PDF files to RAG/pdfs/")
        if not ingest_ok:
            print("3. Run: python -m app.ingest (from RAG directory)")
        print("4. Start servers as shown above")
    
    print("=" * 60)

if __name__ == "__main__":
    main()

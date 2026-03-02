import uuid
from app.utils.pdf_loader import extract_pdf_text
from app.utils.chunker import chunk_text
from app.utils.embeddings import embed_text
from app.utils.vectorstore import add_to_vectorstore

def ingest_pdf(file_path: str):
    """
    Orchestrates the PDF ingestion process:
    1. Extract text
    2. Chunk text
    3. Embed chunks
    4. Store in VectorDB
    """
    print(f"Starting ingestion for: {file_path}")
    
    # 1. Extract
    text = extract_pdf_text(file_path)
    if not text:
        print("No text extracted.")
        return 0
        
    # 2. Chunk
    chunks = chunk_text(text)
    print(f"Created {len(chunks)} chunks.")
    if not chunks:
        return 0
        
    embeddings = []
    ids = []
    
    # 3. Embed
    # Note: For production, batch embedding is better. 
    # Here we do one by one or we could pass a list if the embed function supports it.
    # Our embed_text currently does one string. We'll loop.
    for i, chunk in enumerate(chunks):
        try:
            emb = embed_text(chunk)
            embeddings.append(emb)
            ids.append(str(uuid.uuid4()))
        except Exception as e:
            print(f"Failed to embed chunk {i}: {e}")
            
    # 4. Store
    if embeddings:
        add_to_vectorstore(documents=chunks, embeddings=embeddings, ids=ids)
        print(f"Stored {len(embeddings)} chunks in ChromaDB.")
        return len(embeddings)
    
    return 0

if __name__ == "__main__":
    import os
    import glob
    
    # Ingest all PDFs in the pdfs folder
    pdf_dir = "pdfs"
    pdf_files = glob.glob(os.path.join(pdf_dir, "*.pdf"))
    
    if not pdf_files:
        print(f"No PDF files found in {pdf_dir}/")
        print("Please add PDF files to the pdfs/ directory.")
    else:
        print(f"Found {len(pdf_files)} PDF file(s)")
        total_chunks = 0
        for pdf_file in pdf_files:
            chunks = ingest_pdf(pdf_file)
            total_chunks += chunks
        print(f"\n=== Ingestion Complete ===")
        print(f"Total chunks ingested: {total_chunks}")

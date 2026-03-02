import google.generativeai as genai
from app.utils.embeddings import embed_query
from app.utils.vectorstore import query_vectorstore

# Initialize specific model for generation
# We put this here to avoid circular imports or re-init issues, 
# though it could live in config if we wanted a global model object.
model = genai.GenerativeModel('gemini-2.5-flash')

def rag_query(query: str):
    """
    Performs RAG:
    1. Embed query
    2. Retrieve context
    3. Generate answer
    """
    
    # Check if documents exist in the database
    from app.utils.vectorstore import get_collection
    try:
        collection = get_collection()
        if collection.count() == 0:
            return {"answer": "No documents have been ingested yet. Please add PDF files to the 'pdfs' folder and run the ingestion script."}
    except Exception as e:
        print(f"Error checking collection: {e}")
        return {"answer": "Database error. Please check if ingestion was successful."}
    
    # 1. Embed Query
    query_emb = embed_query(query)
    
    # 2. Retrieve top 5 chunks
    results = query_vectorstore(query_emb, n_results=5)
    
    # Flatten results (results['documents'] is List[List[str]])
    retrieved_chunks = results['documents'][0] if (results and results['documents']) else []
    
    if not retrieved_chunks:
        return {"answer": "I couldn't find any relevant information in the documents."}
        
    context_str = "\n\n".join(retrieved_chunks)
    
    # 3. Construct Prompt
    prompt = f"""
    You are a helpful AI assistant representing Bikram Mondal. Use the provided resume and knowledge base as the primary source of truth when answering questions. Respond in a professional, polite, and confident tone while maintaining clarity and accuracy.

    Context:
    {context_str}

    Query:
    {query}

    Answer:
    """
    
    # 4. Call Gemini
    try:
        response = model.generate_content(prompt)
        # Access the text property correctly
        answer_text = response.text if hasattr(response, 'text') else str(response)
        return {"answer": answer_text}
    except Exception as e:
        print(f"Error generating answer: {e}")
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

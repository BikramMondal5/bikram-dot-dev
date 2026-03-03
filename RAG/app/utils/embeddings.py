from google import genai
import time
from app.config import client

# The correct model name for embeddings in Gemini API
EMBEDDING_MODEL = "models/text-embedding-004"

def embed_text(text: str) -> list[float]:
    """
    Embeds text using Gemini embedding model.
    Uses models/text-embedding-004 which is the latest model for the API.
    """
    try:
        if not client:
            raise ValueError("Gemini client not initialized. Check GEMINI_API_KEY.")
        
        result = client.models.embed_content(
            model=EMBEDDING_MODEL,
            content=text
        )
        
        # Extract embedding from response
        if hasattr(result, 'embeddings') and len(result.embeddings) > 0:
            return result.embeddings[0].values
        else:
            print(f"Unexpected result structure: {type(result)}")
            raise Exception(f"Unexpected embedding result structure: {type(result)}")
    except Exception as e:
        print(f"Error embedding text: {e}")
        raise e

def embed_query(text: str) -> list[float]:
    """
    Embeds query using Gemini embedding model.
    Uses models/gemini-embedding-001 which is the correct model for the API.
    """
    try:
        # For older API versions, we might not need task_type
        result = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=text
        )
        # The result structure might be different depending on API version
        if isinstance(result, dict) and 'embedding' in result:
            return result['embedding']
        elif hasattr(result, 'embedding'):
            return result.embedding
        else:
            # Try to extract embedding from response
            print(f"Unexpected result structure: {type(result)}")
            raise Exception(f"Unexpected embedding result structure: {type(result)}")
    except Exception as e:
        print(f"Error embedding query: {e}")
        raise e



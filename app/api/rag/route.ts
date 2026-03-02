import { NextRequest, NextResponse } from 'next/server';

// Get RAG backend URL from environment or use default
const RAG_BACKEND_URL = process.env.RAG_BACKEND_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { question } = body;

        if (!question || typeof question !== 'string') {
            return NextResponse.json(
                { error: 'Question is required and must be a string' },
                { status: 400 }
            );
        }

        // Call the RAG backend
        const ragResponse = await fetch(`${RAG_BACKEND_URL}/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        if (!ragResponse.ok) {
            const errorText = await ragResponse.text();
            console.error('RAG backend error:', errorText);

            // Try to parse error details
            let errorDetail = errorText;
            try {
                const errorJson = JSON.parse(errorText);
                errorDetail = errorJson.detail || errorJson.error || errorText;
            } catch {
                // If not JSON, use raw text
            }

            return NextResponse.json(
                {
                    error: `RAG backend error: ${ragResponse.status}`,
                    details: errorDetail
                },
                { status: ragResponse.status }
            );
        }

        const data = await ragResponse.json();

        // Return the answer from RAG
        return NextResponse.json({
            answer: data.answer || "I couldn't find relevant information in the documents.",
            error: data.error || null,
        });
    } catch (error) {
        console.error('Error in RAG API route:', error);
        return NextResponse.json(
            {
                error: 'Failed to connect to RAG backend. Make sure the Python server is running on port 8000.',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// Health check endpoint
export async function GET() {
    try {
        const healthCheck = await fetch(`${RAG_BACKEND_URL}/docs`, {
            method: 'GET',
        });

        if (healthCheck.ok) {
            return NextResponse.json({
                status: 'connected',
                ragBackend: RAG_BACKEND_URL,
            });
        } else {
            return NextResponse.json({
                status: 'disconnected',
                ragBackend: RAG_BACKEND_URL,
                message: 'RAG backend is not responding',
            }, { status: 503 });
        }
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            ragBackend: RAG_BACKEND_URL,
            message: 'Could not reach RAG backend',
            error: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 503 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChatMessage from '@/lib/models/ChatMessage';

// GET: Fetch chat history for a session
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json(
                { success: false, error: 'Session ID is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Get last 20 messages for context
        const messages = await ChatMessage.find({ sessionId })
            .sort({ timestamp: 1 })
            .limit(20)
            .lean();

        return NextResponse.json({
            success: true,
            data: messages,
        });
    } catch (error: any) {
        console.error('GET /api/chat-history error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch chat history' },
            { status: 500 }
        );
    }
}

// POST: Save a chat message
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        const { sessionId, role, content } = body;

        if (!sessionId || !role || !content) {
            return NextResponse.json(
                { success: false, error: 'sessionId, role, and content are required' },
                { status: 400 }
            );
        }

        const message = await ChatMessage.create({
            sessionId,
            role,
            content,
            timestamp: new Date(),
        });

        return NextResponse.json(
            { success: true, data: message },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('POST /api/chat-history error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to save message' },
            { status: 500 }
        );
    }
}

// DELETE: Clear chat history for a session
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json(
                { success: false, error: 'Session ID is required' },
                { status: 400 }
            );
        }

        await dbConnect();
        await ChatMessage.deleteMany({ sessionId });

        return NextResponse.json({
            success: true,
            message: 'Chat history cleared',
        });
    } catch (error: any) {
        console.error('DELETE /api/chat-history error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to clear history' },
            { status: 500 }
        );
    }
}

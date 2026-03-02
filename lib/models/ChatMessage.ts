import mongoose, { Schema, Model, models } from 'mongoose';

export interface IChatMessage {
    sessionId: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
    {
        sessionId: {
            type: String,
            required: true,
            index: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['user', 'assistant'],
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient querying
ChatMessageSchema.index({ sessionId: 1, timestamp: 1 });

const ChatMessage: Model<IChatMessage> =
    models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatMessage;

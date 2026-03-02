/**
 * Chat memory manager - MongoDB version
 * Stores conversation history in MongoDB for persistence across devices
 */

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

class ChatMemoryManager {
    private sessionId: string;
    private messages: ChatMessage[] = [];
    private maxMessages: number = 20;

    constructor() {
        // Generate or retrieve session ID from localStorage
        if (typeof window !== 'undefined') {
            this.sessionId = localStorage.getItem('chat_session_id') || this.generateSessionId();
            localStorage.setItem('chat_session_id', this.sessionId);
        } else {
            this.sessionId = '';
        }

        // Load existing conversation from MongoDB
        this.loadFromMongoDB();
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Add a user message to memory
     */
    async addUserMessage(message: string): Promise<void> {
        const chatMessage = {
            role: 'user' as const,
            content: message,
            timestamp: Date.now()
        };

        this.messages.push(chatMessage);
        this.trimMessages();

        // Save to MongoDB
        await this.saveToMongoDB(chatMessage);
    }

    /**
     * Add an AI message to memory
     */
    async addAIMessage(message: string): Promise<void> {
        const chatMessage = {
            role: 'assistant' as const,
            content: message,
            timestamp: Date.now()
        };

        this.messages.push(chatMessage);
        this.trimMessages();

        // Save to MongoDB
        await this.saveToMongoDB(chatMessage);
    }

    /**
     * Get conversation history formatted for LLM context
     */
    async getFormattedHistory(): Promise<string> {
        if (this.messages.length === 0) {
            return "";
        }

        return this.messages
            .map((msg) => {
                const role = msg.role === "user" ? "User" : "Assistant";
                return `${role}: ${msg.content}`;
            })
            .join("\n");
    }

    /**
     * Get all messages as array
     */
    async getMessages(): Promise<ChatMessage[]> {
        return [...this.messages];
    }

    /**
     * Clear conversation history
     */
    async clearHistory(): Promise<void> {
        this.messages = [];
        await this.clearMongoDB();
    }

    /**
     * Trim messages to max limit
     */
    private trimMessages(): void {
        if (this.messages.length > this.maxMessages) {
            this.messages = this.messages.slice(-this.maxMessages);
        }
    }

    /**
     * Save message to MongoDB
     */
    private async saveToMongoDB(message: ChatMessage): Promise<void> {
        if (typeof window === 'undefined') return;

        try {
            await fetch('/api/chat-history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    role: message.role,
                    content: message.content,
                }),
            });
        } catch (error) {
            console.error("Failed to save chat message to MongoDB:", error);
        }
    }

    /**
     * Load conversation from MongoDB
     */
    private async loadFromMongoDB(): Promise<void> {
        if (typeof window === 'undefined') return;

        try {
            const response = await fetch(`/api/chat-history?sessionId=${this.sessionId}`);
            const data = await response.json();

            if (data.success && data.data) {
                this.messages = data.data.map((msg: any) => ({
                    role: msg.role,
                    content: msg.content,
                    timestamp: new Date(msg.timestamp).getTime(),
                }));
            }
        } catch (error) {
            console.error("Failed to load chat history from MongoDB:", error);
            this.messages = [];
        }
    }

    /**
     * Clear MongoDB history
     */
    private async clearMongoDB(): Promise<void> {
        if (typeof window === 'undefined') return;

        try {
            await fetch(`/api/chat-history?sessionId=${this.sessionId}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error("Failed to clear chat history from MongoDB:", error);
        }
    }

    /**
     * Get conversation summary (last N messages)
     */
    async getRecentContext(count: number = 5): Promise<string> {
        const recentMessages = this.messages.slice(-count);

        return recentMessages
            .map((msg) => {
                const role = msg.role === "user" ? "User" : "Assistant";
                return `${role}: ${msg.content}`;
            })
            .join("\n");
    }
}

// Export singleton instance
let memoryInstance: ChatMemoryManager | null = null;

export const getChatMemory = (): ChatMemoryManager => {
    if (!memoryInstance) {
        memoryInstance = new ChatMemoryManager();
    }
    return memoryInstance;
};

export { ChatMemoryManager };

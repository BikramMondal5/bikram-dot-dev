/**
 * Chat memory manager - Browser-compatible version
 * Stores conversation history in browser's localStorage for persistence
 */

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

class ChatMemoryManager {
    private messages: ChatMessage[] = [];
    private storageKey: string = "bikram_ai_chat_history";
    private maxMessages: number = 5; // Keep last 5 messages for context

    constructor() {
        // Load existing conversation from localStorage
        this.loadFromStorage();
    }

    /**
     * Add a user message to memory
     */
    async addUserMessage(message: string): Promise<void> {
        this.messages.push({
            role: 'user',
            content: message,
            timestamp: Date.now()
        });
        this.trimMessages();
        this.saveToStorage();
    }

    /**
     * Add an AI message to memory
     */
    async addAIMessage(message: string): Promise<void> {
        this.messages.push({
            role: 'assistant',
            content: message,
            timestamp: Date.now()
        });
        this.trimMessages();
        this.saveToStorage();
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
        this.clearStorage();
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
     * Save conversation to localStorage
     */
    private saveToStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
        } catch (error) {
            console.error("Failed to save chat history:", error);
        }
    }

    /**
     * Load conversation from localStorage
     */
    private loadFromStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return;

            this.messages = JSON.parse(stored);
        } catch (error) {
            console.error("Failed to load chat history:", error);
            this.messages = [];
        }
    }

    /**
     * Clear localStorage
     */
    private clearStorage(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(this.storageKey);
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
}// Export singleton instance
let memoryInstance: ChatMemoryManager | null = null;

export const getChatMemory = (): ChatMemoryManager => {
    if (!memoryInstance) {
        memoryInstance = new ChatMemoryManager();
    }
    return memoryInstance;
};

export { ChatMemoryManager };

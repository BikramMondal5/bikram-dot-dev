"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiMic, FiMinimize2, FiMaximize2 } from "react-icons/fi";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

// Import process stub to prevent browser errors
import '@/utils/process-stub';

// Import Three.js context to manage Three.js when chat is open
import { useThreeJs } from "@/utils/ThreeJsContext";

// Import VAPI client (commented out for now)
// import { getVapi } from "@/utils/vapi";
// import type Vapi from "@vapi-ai/web";

// Import LangChain memory
import { getChatMemory } from "@/utils/chatMemory";

// TypeScript declarations for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onstart: ((event: Event) => void) | null;
    onend: ((event: Event) => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

// API configuration - Get from environment variables
const getApiKey = () => {
    if (typeof window !== 'undefined') {
        return process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    }
    return '';
};

const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

// Simple fallback prompt for when RAG fails (without using my-details.json)
const SIMPLE_FALLBACK_PROMPT = `You are Reactz agent, the AI assistant for Bikram Mondal’s portfolio.
Bikram is a B.Tech CSE (AI/ML) student at Heritage Institute of Technology, Kolkata, with expertise in full-stack development (Python, Js, MongoDB, Express, React, Next.js, Node.js) and AI systems.
Provide helpful, concise, and technically accurate responses about web development, AI, software engineering, and general technology topics. Maintain a professional and polite tone.`;

// Get system instruction from environment variable
const BIKRAM_AI_PROMPT = process.env.NEXT_PUBLIC_SYSTEM_INSTRUCTION || 'You are a knowledgeable, concise, and helpful AI assistant. Respond clearly and politely.';

interface Message {
    id: number | string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
    isTemporary?: boolean;
}

type EmailStage =
    | "idle"
    | "checking_purpose"
    | "asking_content_choice"
    | "waiting_for_content"
    | "asking_sender_email"
    | "previewing"
    | "done";

interface EmailFlow {
    stage: EmailStage;
    purpose: string;
    hasContent: boolean | null;
    content: string;
    senderEmail: string;
    subject: string;
}

const SPAM_KEYWORDS = [
    "spam", "advertisement", "promo", "discount", "offer", "buy now",
    "click here", "free money", "lottery", "winner", "prize", "adult",
    "xxx", "casino", "gambling", "viagra", "pills", "lose weight",
];

function isSpamPurpose(text: string): boolean {
    const lower = text.toLowerCase();
    return SPAM_KEYWORDS.some(k => lower.includes(k));
}

const ChatWidget = () => {
    // Use the ThreeJs context to manage Three.js rendering
    const { pauseThreeJs, resumeThreeJs } = useThreeJs();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [minimized, setMinimized] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);
    const [emailFlow, setEmailFlow] = useState<EmailFlow>({
        stage: "idle",
        purpose: "",
        hasContent: null,
        content: "",
        senderEmail: "",
        subject: "",
    });
    // Dedicated payload ref — set EXPLICITLY and SYNCHRONOUSLY when data is known.
    // Never relies on React render cycles or state batching.
    const emailPayloadRef = useRef({ subject: "", content: "", senderEmail: "" });
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 2;
    const [isListening, setIsListening] = useState(false);
    // Removed knowledgeBase - now using RAG pipeline for document-based responses

    // Speech-to-text state
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [speechSupported, setSpeechSupported] = useState(false);

    // VAPI state (commented out for now)
    // const [vapi, setVapi] = useState<Vapi | null>(null);
    // const [isCallActive, setIsCallActive] = useState(false);
    // const [callStatus, setCallStatus] = useState<string>("");

    // Initialize chat memory
    const chatMemory = useRef(typeof window !== 'undefined' ? getChatMemory() : null);

    // Auto scroll to bottom of chat
    useEffect(() => {
        try {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.warn('Scroll error:', error);
        }
    }, [messages]);

    // Handle pausing/resuming Three.js when chat opens/closes
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // If chat is open, pause Three.js, otherwise resume it
        if (isOpen) {
            pauseThreeJs();
        } else {
            resumeThreeJs();
        }

        return () => {
            // Always resume Three.js when component unmounts
            resumeThreeJs();
        };
    }, [isOpen, pauseThreeJs, resumeThreeJs]);

    // Initialize speech recognition only on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check for speech recognition support
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                setSpeechSupported(true);
                const recognitionInstance = new SpeechRecognition();

                // Configure speech recognition
                recognitionInstance.continuous = false;
                recognitionInstance.interimResults = false;
                recognitionInstance.lang = 'en-US';

                // Setup event listeners
                recognitionInstance.onstart = () => {
                    console.log('Speech recognition started');
                    setIsListening(true);
                };

                recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                    const transcript = event.results[0][0].transcript;
                    console.log('Speech recognition result:', transcript);

                    // Remove temporary listening message
                    setMessages((prev) => prev.filter(msg => !msg.isTemporary));

                    setInputMessage(transcript);
                    setIsListening(false);
                };

                recognitionInstance.onend = () => {
                    console.log('Speech recognition ended');
                    setIsListening(false);

                    // Remove temporary listening message
                    setMessages((prev) => prev.filter(msg => !msg.isTemporary));
                };

                recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                    console.error('Speech recognition error:', event.error);
                    setIsListening(false);

                    // Remove temporary listening message
                    setMessages((prev) => prev.filter(msg => !msg.isTemporary));

                    const errorMsg: Message = {
                        id: Date.now(),
                        text: `Speech recognition error: ${event.error}. Please try again.`,
                        sender: "bot",
                        timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, errorMsg]);
                };

                setRecognition(recognitionInstance);
            } else {
                setSpeechSupported(false);
                console.warn('Speech recognition not supported in this browser');
            }
        }

        return () => {
            // Cleanup speech recognition
            if (recognition && isListening) {
                recognition.stop();
            }
        };

        // VAPI initialization (commented out)
        /*
        if (typeof window !== 'undefined') {
            try {
                const vapiClient = getVapi();
                setVapi(vapiClient);
                // ... VAPI event listeners ...
            } catch (error) {
                console.error("Failed to initialize VAPI:", error);
            }
        }
        */
    }, []);

    // Function to fetch with timeout
    const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000) => {
        const controller = new AbortController();
        const { signal } = controller;

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                controller.abort();
                reject(new Error("Request timed out"));
            }, timeout);
        });

        return Promise.race([
            fetch(url, { ...options, signal }),
            timeoutPromise
        ]) as Promise<Response>;
    };

    // Get fallback response using simple Gemini call (no knowledge base)
    const getFallbackResponse = async (userMessage: string) => {
        try {
            const API_KEY = getApiKey();
            if (!API_KEY) return "I'm having trouble connecting right now. Please try again later.";

            const requestBody = {
                contents: [{
                    parts: [{
                        text: `${SIMPLE_FALLBACK_PROMPT}\n\nUser: ${userMessage}\n\nAssistant:`
                    }]
                }]
            };

            const response = await fetchWithTimeout(
                `${API_URL}?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                },
                10000
            );

            if (response.ok) {
                const data = await response.json();
                if (data.candidates?.[0]?.content) {
                    return data.candidates[0].content.parts[0].text;
                }
            }
        } catch (error) {
            console.error('Fallback error:', error);
        }
        return "I'm having trouble connecting right now. Please try again later.";
    };

    const fetchRAGResponse = async (userMessage: string) => {
        try {
            console.log('Sending request to RAG API...');

            const response = await fetchWithTimeout(
                '/api/rag',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: userMessage })
                },
                20000 // Increased timeout for RAG processing
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('RAG API Error:', errorData);

                // Extract detailed error message
                const errorMessage = errorData.details
                    ? `${errorData.error} - ${errorData.details}`
                    : errorData.error || `API request failed with status ${response.status}`;

                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('RAG API Response:', data);

            if (data.answer) {
                setRetryCount(0);
                return data.answer;
            } else if (data.error) {
                console.error("RAG Error:", data.error);
                throw new Error(`RAG Error: ${data.error}`);
            } else {
                console.error("Invalid response format:", data);
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching RAG response:", error);
            throw error;
        }
    };

    const fetchGeminiResponse = async (userMessage: string) => {
        const API_KEY = getApiKey();

        // Check if API key is available
        if (!API_KEY) {
            console.error('Gemini API key not found in environment variables');
            console.log('Expected: NEXT_PUBLIC_GEMINI_API_KEY');
            throw new Error('API key not configured');
        }

        console.log('Using API key:', API_KEY.substring(0, 10) + '...');

        try {
            // Get conversation history from memory
            const conversationHistory = chatMemory.current
                ? await chatMemory.current.getFormattedHistory()
                : "";

            // Build context with system prompt and conversation history
            let contextText = BIKRAM_AI_PROMPT;

            // Note: Not using my-details.json anymore - RAG handles document queries

            if (conversationHistory) {
                contextText += `\n\nPrevious conversation:\n${conversationHistory}`;
            }

            contextText += `\n\nUser message: ${userMessage}`;

            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: contextText
                            }
                        ]
                    }
                ]
            };

            console.log('Sending request to Gemini API...');

            const response = await fetchWithTimeout(
                `${API_URL}?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                },
                15000
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Response Error:', response.status, errorText);
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log('Gemini API Response:', data);

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                setRetryCount(0);
                return data.candidates[0].content.parts[0].text;
            } else if (data.error) {
                console.error("API Error:", data.error);
                throw new Error(`API Error: ${data.error.message || "Unknown error"}`);
            } else {
                console.error("Invalid response format:", data);
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching response:", error);
            throw error;
        }
    };

    const addBotMessage = (text: string) => {
        const msg: Message = {
            id: Date.now(),
            text,
            sender: "bot",
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, msg]);
    };

    // Returns true if the message was handled by email flow (skip normal AI)
    const handleEmailFlow = async (userText: string): Promise<boolean> => {
        const lower = userText.toLowerCase();

        // Detect email intent from idle stage
        if (emailFlow.stage === "idle") {
            // Flexible regex — matches natural variations like:
            // "send a mail to bikram", "craft a mail and send", "email to bikram",
            // "I want to contact bikram", "reach out to bikram", "drop him a mail"
            const emailTriggers = [
                /\b(send|write|draft|craft|compose|drop)\b.{0,40}\b(email|mail|message)\b/i,
                /\b(email|mail|message|contact|reach\s*out)\b.{0,30}\b(bikram|him|you)\b/i,
                /\b(bikram)\b.{0,20}\b(email|mail|message|contact)\b/i,
                /\bsend\b.{0,20}\b(bikram|him)\b/i,
                /\b(collaborate|collaboration|hackathon|project|job|hire|hiring|internship|resume)\b.{0,30}\b(email|mail|contact|reach|send)\b/i,
                /\b(email|mail|contact|reach|send)\b.{0,30}\b(collaborate|collaboration|hackathon|project|job|hire|hiring|internship|resume)\b/i,
            ];
            const triggered = emailTriggers.some(r => r.test(userText));
            if (!triggered) return false;

            // If the message ALSO contains a clear purpose, skip the purpose-asking step
            const purposeHints = [
                "hackathon", "collaboration", "collab", "project", "job", "hire", "internship",
                "freelance", "resume", "opportunity", "work together", "business",
            ];
            const inlinePurpose = purposeHints.find(p => lower.includes(p));

            if (inlinePurpose) {
                // We already have a purpose — jump straight to content choice
                const purpose = userText.trim();
                setEmailFlow(prev => ({ ...prev, stage: "asking_content_choice", purpose }));
                addBotMessage(
                    `Got it ✅ — I'll help you send an email to Bikram regarding **${inlinePurpose}**.\n\n` +
                    "Do you already have the email content / a template ready?\n\n" +
                    "Reply **yes** to paste your content, or **no** and I'll craft the email for you."
                );
            } else {
                setEmailFlow(prev => ({ ...prev, stage: "checking_purpose" }));
                addBotMessage(
                    "Sure! I can help you send an email to Bikram. ✉️\n\n" +
                    "**Could you briefly tell me the purpose?**\n" +
                    "(e.g. job opportunity, collaboration, hackathon, project inquiry, etc.)"
                );
            }
            return true;
        }

        // Stage: checking purpose
        if (emailFlow.stage === "checking_purpose") {
            if (isSpamPurpose(userText)) {
                setEmailFlow(prev => ({ ...prev, stage: "idle" }));
                addBotMessage(
                    "⚠️ Sorry, I can't send that kind of email. It appears to be promotional or spam-like content.\n\n" +
                    "I'm only able to send emails for genuine professional or collaborative purposes."
                );
                return true;
            }
            setEmailFlow(prev => ({ ...prev, stage: "asking_content_choice", purpose: userText }));
            addBotMessage(
                `Got it — **${userText}** sounds like a legit reason! 👍\n\n` +
                "Do you already have the email content / a template ready?\n\n" +
                "Reply **yes** to paste your own content, or **no** and I'll craft the email for you."
            );
            return true;
        }

        // Stage: asking if they have content
        if (emailFlow.stage === "asking_content_choice") {
            // Also treat standalone craft/write commands as "no, craft it"
            const craftDirect = /\b(craft|write|compose|draft|make)\b.{0,20}\b(mail|email|message)\b/i.test(userText);
            const yes = /^(yes|yep|yeah|sure|i have|i do|i've got)/i.test(userText.trim());
            const no = /^(no|nope|nah|please craft|you craft|craft it)/i.test(userText.trim()) || craftDirect;

            if (yes) {
                setEmailFlow(prev => ({ ...prev, stage: "waiting_for_content", hasContent: true }));
                addBotMessage("Great! Please paste your email content below and I'll get it ready to send. 📋");
                return true;
            } else if (no) {
                // AI crafts the email
                setIsTyping(true);
                const API_KEY = getApiKey();
                let crafted = "";
                try {
                    const prompt = `You are an email writing assistant. Write a professional, concise email FROM a potential contact TO Bikram Mondal (a full-stack developer / AI/ML student at Heritage Institute of Technology, Kolkata) regarding: "${emailFlow.purpose}". The email should have a subject line on the first line prefixed with 'Subject: ', then a blank line, then the body. Keep it warm, professional and under 150 words.`;
                    const resp = await fetchWithTimeout(
                        `${API_URL}?key=${API_KEY}`,
                        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) },
                        12000
                    );
                    const data = await resp.json();
                    crafted = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                } catch (e) {
                    console.error("Email craft error:", e);
                }
                setIsTyping(false);

                if (!crafted.trim()) {
                    // AI failed or returned empty — ask user to paste their own content
                    setEmailFlow(prev => ({ ...prev, stage: "waiting_for_content", hasContent: true }));
                    addBotMessage(
                        "⚠️ I had trouble crafting the email automatically. " +
                        "Please paste your own email content below and I'll send it for you."
                    );
                    return true;
                }

                // Parse subject — take FIRST subject line, rest is body
                const allLines = crafted.split("\n");
                const subjectIdx = allLines.findIndex(l => l.toLowerCase().startsWith("subject:"));
                const subject = subjectIdx >= 0
                    ? allLines[subjectIdx].replace(/^subject:\s*/i, "").trim()
                    : `${emailFlow.purpose} — via Reactz Agent`;
                const bodyLines = subjectIdx >= 0
                    ? allLines.slice(subjectIdx + 1)
                    : allLines;
                const body = bodyLines.join("\n").trim() || crafted.trim();

                // ✅ Store in dedicated ref immediately — no render cycle dependency
                emailPayloadRef.current = { subject, content: body, senderEmail: "" };

                setEmailFlow(prev => ({ ...prev, stage: "asking_sender_email", hasContent: false, content: body, subject }));
                addBotMessage(
                    `Here's the email I've crafted for you:\n\n` +
                    `**Subject:** ${subject}\n\n${body}\n\n` +
                    "---\n" +
                    "What's your email address so Bikram knows who to reply to? (type **skip** to remain anonymous)"
                );
                return true;
            } else {
                addBotMessage("Please reply **yes** (I have content) or **no** (please craft it for me).");
                return true;
            }
        }

        // Stage: waiting for user to paste their content
        if (emailFlow.stage === "waiting_for_content") {
            const lines = userText.split("\n");
            const subjectLine = lines.find(l => l.toLowerCase().startsWith("subject:"));
            const subject = subjectLine
                ? subjectLine.replace(/^subject:\s*/i, "").trim()
                : `${emailFlow.purpose} — via Reactz Agent`;
            const body = userText.trim();

            // ✅ Store in dedicated ref immediately
            emailPayloadRef.current = { subject, content: body, senderEmail: "" };

            setEmailFlow(prev => ({ ...prev, stage: "asking_sender_email", content: body, subject }));
            addBotMessage(
                "Got your content! ✅\n\n" +
                "What's your email address so Bikram knows who to reply to? (type **skip** to remain anonymous)"
            );
            return true;
        }

        // Stage: asking for sender email
        if (emailFlow.stage === "asking_sender_email") {
            const senderEmail = /^skip$/i.test(userText.trim()) ? "" : userText.trim();

            // ✅ Store senderEmail in dedicated ref immediately
            emailPayloadRef.current.senderEmail = senderEmail;

            const { subject, content } = emailPayloadRef.current;
            setEmailFlow(prev => ({ ...prev, stage: "previewing", senderEmail }));
            addBotMessage(
                `Here's a preview of the email that will be sent to Bikram:\n\n` +
                `**Subject:** ${subject}\n\n${content}\n\n` +
                (senderEmail ? `**Reply-To:** ${senderEmail}\n\n` : "") +
                "---\n" +
                "Reply **send** to send it now, or tell me what to **modify**."
            );
            return true;
        }

        // Stage: previewing — waiting for send or modify
        if (emailFlow.stage === "previewing") {
            if (/^send$/i.test(userText.trim()) || /^(yes|send it|go ahead|confirm)/i.test(userText.trim())) {
                setIsTyping(true);
                // Read directly from dedicated payload ref — 100% reliable, no state/render dependency
                const { subject, content, senderEmail } = emailPayloadRef.current;

                // Guard: should never be empty, but show helpful error if so
                if (!subject || !content) {
                    setIsTyping(false);
                    addBotMessage(
                        "⚠️ It looks like the email content got lost. Let's start over — please paste your email content:"
                    );
                    setEmailFlow(prev => ({ ...prev, stage: "waiting_for_content" }));
                    return true;
                }

                try {
                    const res = await fetch("/api/send-email", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ senderEmail, subject, body: content }),
                    });
                    const data = await res.json();
                    setIsTyping(false);
                    if (data.success) {
                        emailPayloadRef.current = { subject: "", content: "", senderEmail: "" };
                        setEmailFlow({ stage: "idle", purpose: "", hasContent: null, content: "", senderEmail: "", subject: "" });
                        addBotMessage(
                            "✅ **Email sent successfully!** Bikram will get back to you soon.\n\n" +
                            "Is there anything else I can help you with?"
                        );
                    } else {
                        addBotMessage(`❌ Failed to send the email: ${data.error}. Please try again.`);
                    }
                } catch (e) {
                    setIsTyping(false);
                    addBotMessage("❌ Something went wrong while sending the email. Please try again.");
                }
                return true;
            } else {
                // User wants to modify — treat their text as modification instruction
                setIsTyping(true);
                const { subject: currentSubject, content: currentContent, senderEmail } = emailPayloadRef.current;
                const API_KEY = getApiKey();
                let revisedSubject = currentSubject;
                let revised = currentContent;
                try {
                    const prompt = `Here is an email draft:\n\nSubject: ${currentSubject}\n\n${currentContent}\n\nThe user wants the following change: "${userText}"\n\nPlease return the revised email. First line should be 'Subject: <subject>', then blank line, then body only. No explanations.`;
                    const resp = await fetchWithTimeout(
                        `${API_URL}?key=${API_KEY}`,
                        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) },
                        12000
                    );
                    const data = await resp.json();
                    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                    const lines = raw.split("\n");
                    const sl = lines.find((l: string) => l.toLowerCase().startsWith("subject:"));
                    if (sl) revisedSubject = sl.replace(/^subject:\s*/i, "").trim();
                    revised = lines.filter((l: string) => !l.toLowerCase().startsWith("subject:")).join("\n").trim() || currentContent;
                } catch (e) {
                    console.error("Email revise error:", e);
                }
                setIsTyping(false);
                // ✅ Update payload ref immediately
                emailPayloadRef.current = { subject: revisedSubject, content: revised, senderEmail };
                setEmailFlow(prev => ({ ...prev, content: revised, subject: revisedSubject }));
                addBotMessage(
                    `Here's the updated email:\n\n` +
                    `**Subject:** ${revisedSubject}\n\n${revised}\n\n` +
                    (senderEmail ? `**Reply-To:** ${senderEmail}\n\n` : "") +
                    "---\n" +
                    "Reply **send** to send it, or tell me further changes."
                );
                return true;
            }
        }

        return false;
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() === "") return;

        try {
            const newUserMessage: Message = {
                id: messages.length + 1,
                text: inputMessage,
                sender: "user",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, newUserMessage]);
            setInputMessage("");
            setIsTyping(true);

            const currentMessage = inputMessage;

            // Check email flow first — if handled, skip normal AI response
            const handledByEmail = await handleEmailFlow(currentMessage);
            if (handledByEmail) {
                setIsTyping(false);
                return;
            }

            // Add user message to memory
            if (chatMemory.current) {
                await chatMemory.current.addUserMessage(currentMessage);
            }

            const typingTimeout = setTimeout(() => {
                if (isTyping) {
                    const tempMessage: Message = {
                        id: `temp-${Date.now()}`,
                        text: "I'm still thinking about your question. One moment please...",
                        sender: "bot",
                        timestamp: new Date(),
                        isTemporary: true
                    };
                    setMessages(prev => [...prev, tempMessage]);
                }
            }, 20000);

            try {
                let response;
                try {
                    // Try RAG first
                    response = await fetchRAGResponse(currentMessage);
                } catch (error) {
                    console.log('RAG failed, falling back to Gemini:', error);
                    // If RAG fails, fall back to Gemini
                    if (retryCount < maxRetries) {
                        setRetryCount(prev => prev + 1);
                        console.log(`Retry attempt ${retryCount + 1}/${maxRetries}`);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        response = await fetchGeminiResponse(currentMessage);
                    } else {
                        throw new Error("Max retries reached");
                    }
                }

                setMessages(prev => prev.filter(msg => !msg.isTemporary));

                const botResponse: Message = {
                    id: messages.length + 2,
                    text: response,
                    sender: "bot",
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, botResponse]);

                // Add AI response to memory
                if (chatMemory.current) {
                    await chatMemory.current.addAIMessage(response);
                }
            } catch (error) {
                console.error("Error in AI response:", error);

                setMessages(prev => prev.filter(msg => !msg.isTemporary));

                const fallbackText = await getFallbackResponse(currentMessage);
                const errorResponse: Message = {
                    id: messages.length + 2,
                    text: fallbackText,
                    sender: "bot",
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, errorResponse]);
            } finally {
                clearTimeout(typingTimeout);
                setIsTyping(false);
            }
        } catch (error) {
            console.error("Error in handleSendMessage:", error);
            setIsTyping(false);
        }
    };

    const formatTime = (date: Date) => {
        try {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (error) {
            return "00:00";
        }
    };

    const widgetVariants = {
        closed: { scale: 0, opacity: 0, y: 20 },
        open: { scale: 1, opacity: 1, y: 0 },
    };

    const bubbleVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
    };

    const handleMicClick = async () => {
        if (!speechSupported) {
            const errorMsg: Message = {
                id: Date.now(),
                text: "Speech recognition is not supported in your browser. Please try using a modern browser like Chrome, Edge, or Safari.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
            return;
        }

        if (!recognition) {
            console.error("Speech recognition not initialized");
            const errorMsg: Message = {
                id: Date.now(),
                text: "Speech recognition is not available. Please refresh the page and try again.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
            return;
        }

        try {
            if (isListening) {
                // Stop listening
                recognition.stop();
                setIsListening(false);
            } else {
                // Request microphone permission and start listening
                try {
                    await navigator.mediaDevices.getUserMedia({ audio: true });
                    recognition.start();

                    // Add a message to indicate listening started
                    const listeningMsg: Message = {
                        id: Date.now(),
                        text: "🎤 Listening... Speak now!",
                        sender: "bot",
                        timestamp: new Date(),
                        isTemporary: true
                    };
                    setMessages((prev) => [...prev, listeningMsg]);
                } catch (permissionError) {
                    console.error("Microphone permission denied:", permissionError);
                    const errorMsg: Message = {
                        id: Date.now(),
                        text: "Microphone access denied. Please allow microphone permission to use speech-to-text.",
                        sender: "bot",
                        timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, errorMsg]);
                }
            }
        } catch (error) {
            console.error("Speech recognition error:", error);
            setIsListening(false);

            const errorMsg: Message = {
                id: Date.now(),
                text: "Failed to start speech recognition. Please try again.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        }

        // VAPI code (commented out)
        /*
        if (!vapi) {
            console.error("VAPI client not initialized");
            const errorMsg: Message = {
                id: Date.now(),
                text: "Voice agent is not available. Please check your VAPI API key configuration.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
            return;
        }

        try {
            // if (isCallActive) {
            //     vapi.stop();
            //     // setIsCallActive(false);
            //     // setIsListening(false);
            //     // setCallStatus("");
            // } else {
            //     await vapi.start({
            //         model: { provider: "google", model: "gemini-2.0-flash-exp", systemPrompt: BIKRAM_AI_PROMPT },
            //         transcriber: { provider: "deepgram", model: "nova-2", language: "en" },
            //         voice: { provider: "deepgram", voiceId: "asteria" }
            //     });
            // }
        } catch (error) {
            console.error("VAPI call error:", error);
            // setIsCallActive(false);
            // setIsListening(false);
            // setCallStatus("⚠️ Failed to start voice call");

            const errorMsg: Message = {
                id: Date.now(),
                text: "Failed to start voice call. Please try again or check your internet connection.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        }
        */
    };

    // Safe function to toggle chat widget
    const toggleChatWidget = () => {
        try {
            // Make sure process is defined to prevent Node.js errors
            if (typeof window !== 'undefined' && !(window as any).process) {
                (window as any).process = { cwd: () => '/', env: {}, browser: true };
            }

            // If we're opening the widget, we need to handle Three.js conflicts
            if (!isOpen) {
                // Pause Three.js and ensure WebGL context is preserved
                pauseThreeJs();

                // Force any WebGL renderer to complete current operations before opening chat
                setTimeout(() => {
                    // Set a global flag to help debug WebGL issues
                    if (typeof window !== 'undefined') {
                        (window as any).__chatWidgetOpen = true;
                    }
                    setIsOpen(true);
                }, 50);
            } else {
                if (typeof window !== 'undefined') {
                    (window as any).__chatWidgetOpen = false;
                }
                setIsOpen(false);
                // Resume Three.js rendering with a delay to ensure smooth transition
                setTimeout(() => {
                    resumeThreeJs();
                }, 50);
            }
        } catch (error) {
            console.error("Error toggling chat widget:", error);
            // Fallback in case of error
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            <motion.button
                onClick={toggleChatWidget}
                className="fixed bottom-5 right-5 w-12 h-12 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-0 border border-transparent z-9999"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ zIndex: 9999 }}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden p-0">
                        <img
                            src="/icons/reactz-logo.png"
                            alt="Chat Bot"
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
            </motion.button>

            {isOpen && (
                <motion.div
                    className="fixed bottom-24 right-5 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border border-[#1E293B] z-9998"
                    variants={widgetVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    style={{ zIndex: 9998 }}
                >
                    <div className="bg-linear-to-r from-[#7c3aed] to-[#9b5de5] p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden p-1">
                                <img
                                    src="/icons/reactz-logo.png"
                                    alt="AI Assistant"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Reactz Agent</h3>
                                <p className="text-purple-100 text-xs opacity-80">
                                    {isListening ? "Listening..." : "Online"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                onClick={() => setConfirmClear(true)}
                                title="Clear chat history"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <button
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                onClick={() => setMinimized(!minimized)}
                            >
                                {minimized ? <FiMaximize2 className="text-white" /> : <FiMinimize2 className="text-white" />}
                            </button>
                        </div>
                    </div>

                    {!minimized && (
                        <div
                            className="bg-[#121212] h-96 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent"
                            style={{ scrollbarWidth: 'thin' } as any}
                        >
                            {false /* isCallActive - VAPI disabled */ ? (
                                // Voice Agent UI - Large animated microphone with wave effect
                                <div className="flex items-center justify-center h-full">
                                    <motion.div className="relative flex items-center justify-center w-full h-full">
                                        {/* Wave circles emanating from center */}
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute rounded-full border-2"
                                                style={{
                                                    borderColor: 'rgba(162, 89, 255, 0.6)',
                                                    width: '96px',
                                                    height: '96px',
                                                }}
                                                animate={{
                                                    scale: [1, 3.5],
                                                    opacity: [0.8, 0],
                                                    borderWidth: ['2px', '1px'],
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    ease: "easeOut",
                                                    delay: i * 0.5,
                                                }}
                                            />
                                        ))}

                                        {/* Additional gradient wave circles */}
                                        {isListening && [...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={`gradient-${i}`}
                                                className="absolute rounded-full"
                                                style={{
                                                    background: 'radial-gradient(circle, rgba(162, 89, 255, 0.4) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 70%)',
                                                    width: '96px',
                                                    height: '96px',
                                                }}
                                                animate={{
                                                    scale: [1, 4],
                                                    opacity: [0.6, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeOut",
                                                    delay: i * 0.6,
                                                }}
                                            />
                                        ))}

                                        {/* Central microphone with glow */}
                                        <motion.div
                                            className="relative w-24 h-24 rounded-full flex items-center justify-center z-10"
                                            style={{
                                                background: 'linear-gradient(135deg, #a259ff 0%, #7c3aed 50%, #ec4899 100%)',
                                                boxShadow: '0 0 40px rgba(162, 89, 255, 0.8), 0 0 60px rgba(162, 89, 255, 0.4)',
                                            }}
                                            animate={{
                                                boxShadow: isListening
                                                    ? [
                                                        '0 0 40px rgba(162, 89, 255, 0.8), 0 0 60px rgba(162, 89, 255, 0.4)',
                                                        '0 0 60px rgba(162, 89, 255, 1), 0 0 80px rgba(162, 89, 255, 0.6)',
                                                        '0 0 40px rgba(162, 89, 255, 0.8), 0 0 60px rgba(162, 89, 255, 0.4)',
                                                    ]
                                                    : '0 0 40px rgba(162, 89, 255, 0.8), 0 0 60px rgba(162, 89, 255, 0.4)',
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <FiMic className="w-12 h-12 text-white" />
                                        </motion.div>
                                    </motion.div>

                                    {/* Status text */}
                                    <motion.p
                                        className="absolute bottom-20 text-purple-300 text-center text-sm font-medium"
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {isListening ? "Speech-to-text active" : "Chat mode"}
                                    </motion.p>
                                </div>
                            ) : (
                                // Regular text chat UI
                                <>
                                    {messages.length === 0 ? (
                                        <div className="flex items-center justify-center h-full px-6">
                                            <motion.div
                                                className="bg-[#1e1e1e] rounded-2xl px-6 py-4 max-w-[90%]"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <p className="text-gray-100 text-sm leading-relaxed">
                                                    Hi there! I'm <span className="text-purple-400 font-semibold">Reactz Agent</span>. Think of me as Bikram's digital twin! I can tell you about my skills, projects, or experiences. What would you like to know?
                                                </p>
                                                <span className="text-xs text-gray-400 mt-2 block">
                                                    {formatTime(new Date())}
                                                </span>
                                            </motion.div>
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <motion.div
                                                key={message.id}
                                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                                variants={bubbleVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === "user"
                                                        ? "bg-linear-to-r from-purple-600 to-[#a259ff] text-white rounded-tr-none"
                                                        : "bg-[#1e1e1e] text-gray-100 rounded-tl-none shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                                                        } ${message.isTemporary ? "opacity-70" : ""}`}
                                                >
                                                    {message.sender === "bot" ? (
                                                        <div className="markdown-content text-sm prose prose-invert max-w-none">
                                                            <ReactMarkdown
                                                                remarkPlugins={[remarkGfm]}
                                                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                                                components={{
                                                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-2" {...props} />,
                                                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
                                                                    h3: ({ node, ...props }) => <h3 className="text-base font-bold my-1" {...props} />,
                                                                    p: ({ node, ...props }) => <p className="my-1" {...props} />,
                                                                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-1" {...props} />,
                                                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-1" {...props} />,
                                                                    li: ({ node, ...props }) => <li className="my-0.5" {...props} />,
                                                                    a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                                                    code: ({ node, inline, ...props }: any) =>
                                                                        inline ?
                                                                            <code className="bg-gray-800 px-1 py-0.5 rounded text-xs" {...props} /> :
                                                                            <code className="block bg-gray-800 rounded p-2 my-2 overflow-x-auto text-xs" {...props} />
                                                                }}
                                                            >
                                                                {message.text}
                                                            </ReactMarkdown>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm">{message.text}</p>
                                                    )}
                                                    <span className={`text-xs mt-1 block ${message.sender === "user" ? "text-purple-200" : "text-gray-400"
                                                        }`}>
                                                        {formatTime(message.timestamp)}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}

                                    {isTyping && (
                                        <motion.div
                                            className="flex justify-start"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="bg-[#1e1e1e] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                                                <div className="flex gap-1 items-center">
                                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={chatEndRef} />
                                </>
                            )}
                        </div>
                    )}

                    {!minimized && (
                        <div className="bg-[#1a1a1a] p-3 border-t border-[#333] flex items-center gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-[#262626] text-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm placeholder:text-gray-500"
                            />
                            <button className="text-purple-400 hover:text-purple-300 p-2 rounded-full hover:bg-white/5 transition-colors" onClick={handleMicClick} title={isListening ? "Stop listening" : "Start speech-to-text"}>
                                <FiMic className={`w-5 h-5 ${isListening ? "animate-pulse text-red-400" : ""}`} />
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleSendMessage}
                                className="bg-linear-to-r from-purple-600 to-[#9b5de5] text-white p-2 rounded-full flex items-center justify-center"
                                disabled={isTyping}
                            >
                                <FiSend className="w-5 h-5" />
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Clear history confirmation modal */}
            <AnimatePresence>
                {confirmClear && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="bg-[#1a1a2e] border border-white/10 rounded-2xl shadow-2xl p-6 w-80 mx-4"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-semibold text-base">Clear Conversation</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                                Are you sure you want to clear the entire conversation history? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setConfirmClear(false)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        if (chatMemory.current) {
                                            await chatMemory.current.clearHistory();
                                            setMessages([]);
                                        }
                                        setConfirmClear(false);
                                    }}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    description: string;
    features: string[];
    techStack: {
        name: string;
        icon?: string;
    }[];
    images: string[];
    gradient?: string;
}

const projects: Project[] = [
    {
        id: "runeai",
        title: "RuneAI",
        description:
            "Rune AI featuring a powerful RAG system, three specialized models (Fast, Thinking, Pro), and a massive 500K context limit. Includes advanced Web Search capable of deep research and intelligent Tool Calling automation.",
        features: [
            "Three specialized models: Fast (Groq), Thinking (Gemini), and Pro",
            "Massive 500K context limit for deep document analysis",
            "Advanced Web Search and intelligent automated Tool Calling",
        ],
        techStack: [
            { name: "Rune's AI" },
            { name: "LangGraph" },
            { name: "Tavily" },
            { name: "Appwrite" },
            { name: "Next.js" },
            { name: "Vercel" },
            { name: "Tailwind CSS" },
            { name: "Framer Motion" },
            { name: "Chart.js" },
        ],
        images: ["/1754759267921.jfif", "/avatar.jfif"],
        gradient: "from-orange-500 to-red-500",
    },
    // Add more projects here
];

export default function ProjectShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentProject = projects[currentIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 5000); // Change project every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentProject.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                    >
                        {/* Left Section - Project Info */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Title */}
                            <div className="space-y-2">
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                        {currentProject.title}
                                    </h2>
                                </motion.div>
                            </div>

                            {/* Description */}
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                            >
                                {currentProject.description}
                            </motion.p>

                            {/* Features */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-3"
                            >
                                {currentProject.features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-1.5">
                                            <svg
                                                className="w-4 h-4 text-orange-500 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm md:text-base text-foreground/80">
                                            {feature}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Tech Stack */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="space-y-3"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {currentProject.techStack.map((tech, idx) => (
                                        <motion.span
                                            key={tech.name}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.8 + idx * 0.05 }}
                                            className={cn(
                                                "px-4 py-2 rounded-full text-xs md:text-sm font-medium",
                                                "bg-secondary/50 border border-border/50",
                                                "hover:bg-secondary hover:border-border transition-colors",
                                                "backdrop-blur-sm"
                                            )}
                                        >
                                            {tech.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Progress Indicators */}
                            <div className="flex gap-2 pt-4">
                                {projects.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={cn(
                                            "h-1 rounded-full transition-all duration-300",
                                            idx === currentIndex
                                                ? "w-12 bg-orange-500"
                                                : "w-8 bg-muted hover:bg-muted-foreground/30"
                                        )}
                                        aria-label={`Go to project ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Section - Project Images */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative w-full h-full min-h-[400px] lg:min-h-[600px]"
                        >
                            <div
                                className={cn(
                                    "relative w-full h-full rounded-3xl overflow-hidden",
                                    "bg-gradient-to-br",
                                    currentProject.gradient || "from-gray-500 to-gray-700",
                                    "p-8 md:p-12"
                                )}
                            >
                                {/* Decorative Background Effect */}
                                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

                                {/* Image Grid */}
                                <div className="relative h-full flex items-center justify-center gap-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentProject.id}
                                            initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
                                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                                            exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
                                            transition={{ duration: 0.6 }}
                                            className="grid grid-cols-2 gap-4 w-full h-full"
                                        >
                                            {/* Main large image */}
                                            <motion.div
                                                initial={{ y: 20 }}
                                                animate={{ y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="col-span-2 relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 shadow-2xl"
                                            >
                                                <div className="aspect-[16/10] relative">
                                                    {currentProject.images[0] && (
                                                        <Image
                                                            src={currentProject.images[0]}
                                                            alt={`${currentProject.title} preview 1`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </motion.div>

                                            {/* Two smaller images */}
                                            {currentProject.images.slice(1, 3).map((img, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ y: 40, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                                    className="relative rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 shadow-xl"
                                                >
                                                    <div className="aspect-square relative">
                                                        <Image
                                                            src={img}
                                                            alt={`${currentProject.title} preview ${idx + 2}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

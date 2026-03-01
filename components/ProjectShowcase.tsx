"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Layers, Zap, Globe, ChevronLeft, ChevronRight, Briefcase, ExternalLink, Sparkles } from 'lucide-react';
import { SectionHeader } from "@/components/ui/SectionHeader";

interface TechStack {
    name: string;
    icon: React.ReactNode;
}

interface Project {
    id: number;
    title: string;
    description: string;
    features: string[];
    techStack: TechStack[];
    image: string;
    avatar: string;
    repoUrl: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Articuno.AI",
        description: "A multi-modal AI platform providing unified access to 20+ AI models, tools, and utilities to simplify coding, analysis, and developer workflows.",
        features: [
            "Unified interface for multiple AI models",
            "Code assistance and automation tools",
            "Supports analysis, generation, and integrations",
            "Developer-focused utilities with plug-and-play experience"
        ],
        techStack: [
            { name: "Python", icon: <Code2 className="w-3 h-3" /> },
            { name: "JavaScript", icon: <Code2 className="w-3 h-3" /> },
            { name: "FastAPI", icon: <Zap className="w-3 h-3" /> },
            { name: "Tailwind CSS", icon: <Layers className="w-3 h-3" /> },
            { name: "LLMs", icon: <Database className="w-3 h-3" /> },
            { name: "Agent Frameworks", icon: <Globe className="w-3 h-3" /> }
        ],
        image: "/ArticunoAI.png",
        avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/Articuno.AI"
    },
    {
        id: 2,
        title: "DevOps-Ghostwriter",
        description: "An autonomous DevOps AI assistant that automates CI/CD tasks, environment setup, and deployment orchestration — acting like a virtual DevOps engineer.",
        features: [
            "Automated pipeline generation",
            "Infrastructure configuration assistant",
            "Cloud service integrations",
            "Modular DevOps scripting"
        ],
        techStack: [
            { name: "Node.js", icon: <Code2 className="w-3 h-3" /> },
            { name: "Bash", icon: <Code2 className="w-3 h-3" /> },
            { name: "GitHub Actions", icon: <Globe className="w-3 h-3" /> },
            { name: "Docker", icon: <Layers className="w-3 h-3" /> },
            { name: "Cloud SDKs", icon: <Database className="w-3 h-3" /> }
        ],
        image: "/ghostwriter.png",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/DevOps-Ghostwriter"
    },
    {
        id: 3,
        title: "MoleculeInsight",
        description: "A molecular analysis and visualization toolkit powered by AI — offering molecule insights, property prediction, and structured graph interpretations.",
        features: [
            "AI-driven molecular property analysis",
            "Graph representation for chemical structures",
            "Visual molecular graphs and predictions",
            "Interactive research interface"
        ],
        techStack: [
            { name: "Python", icon: <Code2 className="w-3 h-3" /> },
            { name: "TensorFlow", icon: <Zap className="w-3 h-3" /> },
            { name: "RDKit", icon: <Database className="w-3 h-3" /> },
            { name: "Graph Neural Networks", icon: <Layers className="w-3 h-3" /> }
        ],
        image: "/MoleculeInsight.png",
        avatar: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/MoleculeInsight"
    },
    {
        id: 4,
        title: "Nano-Bond",
        description: "A nano-chemistry toolset focused on exploring molecular bonds and interactions, designed to help researchers prototype chemical datasets faster.",
        features: [
            "Nano-scale interaction modeling",
            "Atomic bond visualization",
            "Dataset analysis tools",
            "Exportable structural formats"
        ],
        techStack: [
            { name: "JavaScript", icon: <Code2 className="w-3 h-3" /> },
            { name: "WebGL", icon: <Zap className="w-3 h-3" /> },
            { name: "Three.js", icon: <Globe className="w-3 h-3" /> },
            { name: "Python", icon: <Code2 className="w-3 h-3" /> }
        ],
        image: "/NanoBond.png",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/Nano-Bond"
    }
];

const ProjectShowcase: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const currentProject = projects[currentIndex];

    const handleNext = () => {
        if (currentIndex < projects.length - 1) {
            setDirection(1);
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.9
        })
    };

    return (
        <section id="projects" className="relative bg-[#0A0A0A] py-20 px-4 md:px-8 lg:px-16 min-h-screen flex flex-col items-center justify-center">
            <SectionHeader
                label="Featured Projects"
                icon={<Briefcase className="h-4 w-4" />}
                title={
                    <>
                        Selected <span className="text-[#69E300]">Work & Experiments</span>
                    </>
                }
                subtitle="A collection of high-performance web applications and AI-driven tools built with a focus on scalability, clean architecture, and user experience."
            />
            <div className="max-w-7xl mx-auto w-full relative">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentProject.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 }
                        }}
                        className="flex items-center justify-between gap-8 lg:gap-20 xl:gap-24"
                    >
                        {/* Left - Project Info */}
                        <div className="w-full lg:w-[45%] space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                                    {currentProject.title}
                                </h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {currentProject.description}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-3"
                            >
                                {currentProject.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-gray-300 text-base">
                                        <Sparkles className="text-[#69E300] mt-1 shrink-0 w-4 h-4" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap gap-2"
                            >
                                {currentProject.techStack.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 text-sm flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/50 hover:bg-zinc-700/60 transition-colors rounded-lg text-white"
                                    >
                                        {tech.icon}
                                        {tech.name}
                                    </span>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right - Project Image */}
                        <div className="hidden lg:block w-[50%] relative -mt-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="overflow-hidden rounded-3xl border border-zinc-700/50 shadow-2xl bg-gradient-to-br from-red-900/20 to-orange-900/20 p-1 group relative"
                            >
                                <div className="rounded-[20px] overflow-hidden bg-black relative">
                                    <img
                                        src={currentProject.image}
                                        alt={currentProject.title}
                                        className="w-full h-[500px] object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {/* GitHub Link Overlay */}
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <a
                                            href={currentProject.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-[#69E300] text-black font-bold rounded-full flex items-center gap-2 hover:bg-[#7fff00] transition-colors transform hover:scale-105"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            View on GitHub
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons - Fixed at bottom corners */}
            <motion.button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 left-28 px-4 py-2 rounded-xl bg-[#69E300] text-black font-semibold hover:bg-[#7fff00] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#69E300] transition-all flex items-center gap-2"
            >
                <ChevronLeft className="w-5 h-5" />
                Previous
            </motion.button>

            <motion.button
                onClick={handleNext}
                disabled={currentIndex === projects.length - 1}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 right-28 px-4 py-2 rounded-xl bg-[#69E300] text-black font-semibold hover:bg-[#7fff00] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#69E300] transition-all flex items-center gap-2"
            >
                Next
                <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Progress Dots - Centered at bottom */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2"
            >
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`h-2 rounded-full transition-all ${idx === currentIndex
                            ? 'w-8 bg-[#69E300]'
                            : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                            }`}
                    />
                ))}
            </motion.div>
        </section>
    );
};

export default ProjectShowcase;

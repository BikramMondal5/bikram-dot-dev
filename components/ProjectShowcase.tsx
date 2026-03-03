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
        description: "Articuno.AI is a cutting-edge AI-powered platform that brings together 20+ advanced AI models and specialized agents in one unified interface. From weather forecasting to code generation, video analysis to web development assistance - everything at no cost!",
        features: [
            "Engineered multiple contextual AI agents (weather, dev companion, video analysis, knowledge retrieval) for task-specific expert interaction.",
            "Integrated 20+ advanced AI models including GPT-4o, Gemini flash variants, Grok, Llama, and others for diverse reasoning and generation tasks.",
            "Built session-aware chat with MongoDB storage, session search, and analytics to enable context continuity and conversation tracking.",
            "Supported multi-modal inputs including text, images, and voice, enhancing accessibility and user engagement.",
            "Designed a sleek dark-theme interface with categorized agent selection, real-time message updates, and session analytics for superior user experience."
        ],
        techStack: [
            { name: "Python", icon: <Code2 className="w-3 h-3" /> },
            { name: "Flask", icon: <Code2 className="w-3 h-3" /> },
            { name: "MongoDB", icon: <Zap className="w-3 h-3" /> },
            { name: "LLMs", icon: <Database className="w-3 h-3" /> },
            { name: "Agents", icon: <Globe className="w-3 h-3" /> }
        ],
        image: "/ArticunoAI.png",
        avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/Articuno.AI"
    },
    {
        id: 2,
        title: "DevOps-Ghostwriter",
        description: "An intelligent multi-agent AI system that acts as your virtual DevOps engineer. Monitor GitHub Pull Requests, perform deep security audits, and auto-generate documentation — all while maintaining full observability.",
        features: [
            "Performed intelligent pull request analysis with detailed insights on code quality, bugs, and vulnerabilities.",
            "Detected hardcoded secrets, injection risks, and executed sandboxed code to catch logical errors early.",
            "Provided full tracing and monitoring through W&B Weave integration, plus automated Markdown/PDF report generation.",
            "Seamlessly monitored PR events with GitHub webhooks and visualized live agent collaboration activity"
        ],
        techStack: [
            { name: "Node.js", icon: <Code2 className="w-3 h-3" /> },
            { name: "Version Control", icon: <Code2 className="w-3 h-3" /> },
            { name: "GitHub Actions", icon: <Globe className="w-3 h-3" /> },
            { name: "Google ADK", icon: <Layers className="w-3 h-3" /> },
            { name: "Next.js", icon: <Database className="w-3 h-3" /> }
        ],
        image: "/ghostwriter.png",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/DevOps-Ghostwriter"
    },
    {
        id: 3,
        title: "MoleculeInsight",
        description: "An AI-powered Agent platform for molecular research. MoleculeInsight uses specialized Agents to explore chemical properties, trials, patents, and market signals—giving you instant, research-grade insights.",
        features: [
            "Coordinated parallel agent system engineered to gather diverse data streams for comprehensive molecule insights.",
            "Integrated Retrieval-Augmented Generation system that synthesizes internal JSON/PDF document content for context-aware responses.",
            "Real-time 3D molecular structure rendering using PubChem API + 3Dmol.js, with interactive controls and auto-rotation for enhanced exploration.",
            "Unified analysis across multiple scientific sources including ClinicalTrials.gov, PatentsView, UN Comtrade, IQVIA, PubChem, Wikipedia, and web intelligence.",
            "Dynamic agent activity tracking via WebSockets and auto-generated detailed analysis reports in Markdown/PDF formats."
        ],
        techStack: [
            { name: "Python", icon: <Code2 className="w-3 h-3" /> },
            { name: "FastAPI", icon: <Zap className="w-3 h-3" /> },
            { name: "Langchain", icon: <Database className="w-3 h-3" /> },
            { name: "Next.js", icon: <Layers className="w-3 h-3" /> }
        ],
        image: "/MoleculeInsight.png",
        avatar: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/MoleculeInsight"
    },
    {
        id: 4,
        title: "NanoBond",
        description: "A DeFi platform that democratizes access to government bonds. It enables retail users to invest in fractional units of government bonds using stablecoins, providing a transparent, secure, and highly accessible investment experience through blockchain technology.",
        features: [
            "Enables investment in government bonds by splitting large assets into smaller, tokenized units, lowering entry barriers and increasing market participation.",
            "Uses USDT for fast, low-cost, cross-border settlement, improving accessibility and reducing currency friction.",
            "Provides live tracking of interest accrual and return on investment through intuitive dashboards.",
            "Smart contracts autonomously compute and distribute interest, eliminating intermediaries and manual processes."
        ],
        techStack: [
            { name: "Solidity", icon: <Code2 className="w-3 h-3" /> },
            { name: "Rust", icon: <Zap className="w-3 h-3" /> },
            { name: "Next.js", icon: <Globe className="w-3 h-3" /> },
            { name: "Node.js", icon: <Code2 className="w-3 h-3" /> }
        ],
        image: "/NanoBond.png",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/Nano-Bond"
    },
    {
        id: 5,
        title: "Investor Hunter",
        description: "A web application that empowers entrepreneurs to connect directly with real investors through AI-powered video pitch analysis, multilingual support, and smart investor matching.",
        features: [
            "Built an AI-powered pitch analyzer that assesses clarity, uniqueness, and market fit of startup pitches using advanced natural language evaluation techniques.",
            "Enabled instant AI feedback on 3–4 minute video pitch submissions, with automatic translation and analysis across multiple languages.",
            "Incorporated real-time feedback from founders and early backers to enrich AI evaluations and improve pitch quality.",
            "Designed smart investor matchmaking to connect founders with relevant investors based on pitch quality, stage, and market criteria.",
            "Developed a dashboard to track pitch engagement and investor interactions, enabling measurable insights into pitch effectiveness."
        ],
        techStack: [
            { name: "Next.js", icon: <Code2 className="w-3 h-3" /> },
            { name: "Node.js", icon: <Zap className="w-3 h-3" /> },
            { name: "TailwindCSS", icon: <Database className="w-3 h-3" /> },
            { name: "Pitch Analysing", icon: <Layers className="w-3 h-3" /> }
        ],
        image: "investor-hunt.png",
        avatar: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
        repoUrl: "https://github.com/BikramMondal5/Investor-Hunter"
    },
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
        <section id="projects" className="relative bg-[#0A0A0A] py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 min-h-screen flex flex-col items-center justify-center">
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
                        className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-20 xl:gap-24"
                    >
                        {/* Left - Project Info */}
                        <div className="w-full lg:w-[45%] space-y-4 sm:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#69E300] tracking-tight mb-3 sm:mb-4">
                                    {currentProject.title}
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                                    {currentProject.description}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-2 sm:space-y-3"
                            >
                                {currentProject.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm md:text-base">
                                        <Sparkles className="text-[#69E300] mt-1 shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
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
                                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 bg-zinc-800/60 border border-zinc-700/50 hover:bg-zinc-700/60 transition-colors rounded-lg text-white"
                                    >
                                        {tech.icon}
                                        {tech.name}
                                    </span>
                                ))}
                            </motion.div>

                            {/* Mobile GitHub Link */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="lg:hidden pt-2"
                            >
                                <a
                                    href={currentProject.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#69E300] text-black font-bold rounded-full hover:bg-[#7fff00] transition-colors text-sm"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View on GitHub
                                </a>
                            </motion.div>
                        </div>

                        {/* Right - Project Image - Desktop Only */}
                        <div className="hidden lg:block w-[50%] relative">
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
                                        className="w-full h-[400px] xl:h-[500px] object-cover object-center transition-transform duration-300 group-hover:scale-105"
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

            {/* Navigation Buttons - Responsive positioning */}
            <motion.button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 left-4 sm:left-8 md:left-16 lg:left-28 px-3 sm:px-4 py-2 rounded-xl bg-[#69E300] text-black font-semibold hover:bg-[#7fff00] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#69E300] transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">Previous</span>
                </motion.button>

            <motion.button
                onClick={handleNext}
                disabled={currentIndex === projects.length - 1}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 right-4 sm:right-8 md:right-16 lg:right-28 px-3 sm:px-4 py-2 rounded-xl bg-[#69E300] text-black font-semibold hover:bg-[#7fff00] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#69E300] transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                    <span className="hidden xs:inline">Next</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

            {/* Progress Dots - Centered at bottom */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2"
            >
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`h-1.5 sm:h-2 rounded-full transition-all ${idx === currentIndex
                            ? 'w-6 sm:w-8 bg-[#69E300]'
                            : 'w-1.5 sm:w-2 bg-zinc-700 hover:bg-zinc-600'
                            }`}
                    />
                ))}
            </motion.div>
        </section>
    );
};

export default ProjectShowcase;

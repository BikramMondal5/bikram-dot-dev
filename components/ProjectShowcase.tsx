"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Layers, Zap, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
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
}

const projects: Project[] = [
    {
        id: 1,
        title: "Old Portfolio",
        description: "A premium, high-performance portfolio crafted for the modern web. Featuring fluid GSAP animations, physics-based interactions, and a polished aesthetic, this template sets a new standard for creative developers.",
        features: [
            "Premium, high-performance design with fluid GSAP animations",
            "Physics-based interactions and advanced state management",
            "Robust full-stack architecture with Prisma and Node.js",
            "Seamless blend of design excellence and engineering precision"
        ],
        techStack: [
            { name: "React", icon: <Code2 className="w-3 h-3" /> },
            { name: "TypeScript", icon: <Code2 className="w-3 h-3" /> },
            { name: "Next.js", icon: <Globe className="w-3 h-3" /> },
            { name: "GSAP", icon: <Zap className="w-3 h-3" /> },
            { name: "Prisma", icon: <Database className="w-3 h-3" /> },
            { name: "Zustand", icon: <Layers className="w-3 h-3" /> }
        ],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=800&fit=crop",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop"
    },
    {
        id: 2,
        title: "RuneHub",
        description: "RuneHub is a comprehensive programming education platform featuring extensive tutorials and articles on different programming languages, frameworks, and technologies with the latest industry news and insights.",
        features: [
            "Comprehensive programming tutorials across multiple languages",
            "Tech trends section with latest industry news",
            "Sanity CMS integration for efficient content management",
            "Advanced search with Algolia integration"
        ],
        techStack: [
            { name: "React", icon: <Code2 className="w-3 h-3" /> },
            { name: "Next.js", icon: <Globe className="w-3 h-3" /> },
            { name: "Sanity CMS", icon: <Database className="w-3 h-3" /> },
            { name: "Algolia", icon: <Zap className="w-3 h-3" /> },
            { name: "Prisma.js", icon: <Layers className="w-3 h-3" /> },
            { name: "TypeScript", icon: <Code2 className="w-3 h-3" /> }
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop",
        avatar: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop"
    },
    {
        id: 3,
        title: "E-Commerce Platform",
        description: "A modern, scalable e-commerce solution with real-time inventory management and seamless checkout experience powered by cutting-edge technologies.",
        features: [
            "Real-time inventory tracking and management",
            "Secure payment integration with multiple gateways",
            "Advanced search & filtering capabilities",
            "Mobile-responsive design with PWA support"
        ],
        techStack: [
            { name: "React", icon: <Code2 className="w-3 h-3" /> },
            { name: "Node.js", icon: <Database className="w-3 h-3" /> },
            { name: "PostgreSQL", icon: <Layers className="w-3 h-3" /> },
            { name: "Stripe", icon: <Zap className="w-3 h-3" /> }
        ],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=800&fit=crop",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop"
    },
    {
        id: 4,
        title: "AI Content Generator",
        description: "Advanced AI-powered content creation tool for marketers and content creators with multi-language support and intelligent optimization features.",
        features: [
            "Multi-language content generation support",
            "SEO optimization and keyword analysis",
            "Pre-built content templates library",
            "Plagiarism detection and originality checks"
        ],
        techStack: [
            { name: "Vue.js", icon: <Code2 className="w-3 h-3" /> },
            { name: "Python", icon: <Layers className="w-3 h-3" /> },
            { name: "GPT-4", icon: <Zap className="w-3 h-3" /> },
            { name: "Redis", icon: <Database className="w-3 h-3" /> }
        ],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop",
        avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop"
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
        <section id="projects" className="relative bg-[#0A0A0A] py-32 px-4 md:px-8 lg:px-16 min-h-screen flex flex-col items-center justify-center">
            <SectionHeader
                label="Featured Projects"
                title={
                    <>
                        My Creative{" "}
                        <span className="text-[#69E300]">Portfolio</span>
                    </>
                }
                subtitle="Here are some of the projects I'm most proud of. From web apps to AI experiments, each one is a story of learning and creation."
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
                                        <span className="text-red-500 mt-1 shrink-0 font-bold">+</span>
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
                                className="overflow-hidden rounded-3xl border border-zinc-700/50 shadow-2xl bg-gradient-to-br from-red-900/20 to-orange-900/20 p-1"
                            >
                                <div className="rounded-[20px] overflow-hidden bg-black">
                                    <img
                                        src={currentProject.image}
                                        alt={currentProject.title}
                                        className="w-full h-[500px] object-cover"
                                    />
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
                className="absolute bottom-8 left-8 px-4 py-2 rounded-xl bg-[#69E300] text-black font-semibold hover:bg-[#7fff00] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#69E300] transition-all shadow-lg shadow-[#69E300]/30 flex items-center gap-2"
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
                className="absolute bottom-8 right-8 px-4 py-2 rounded-xl bg-[#69E300] text-black font-semibold hover:bg-[#7fff00] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#69E300] transition-all shadow-lg shadow-[#69E300]/30 flex items-center gap-2"
            >
                Next
                <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Progress Dots - Centered at bottom */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
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

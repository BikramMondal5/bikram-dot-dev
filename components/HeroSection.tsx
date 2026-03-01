"use client";

import React, { useRef, useEffect, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code2, Sparkles, Brain, Github, Linkedin, Twitter, Mail, Instagram, FileText, X } from "lucide-react";
import { motion } from "framer-motion";
import { WordRotate } from "@/registry/magicui/word-rotate";
import BentoSection from "@/components/BentoSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import { SectionHeader } from "@/components/ui/SectionHeader";
import OverviewSection from "@/components/OverviewSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

/* -- 3D Wireframe Landscape -- */
function WireframeLandscape() {
    const meshRef = useRef<THREE.Mesh>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(50, 50, 80, 80);
        const vertices = geo.attributes.position.array as Float32Array;

        for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i];
            const y = vertices[i + 1];
            vertices[i + 2] = Math.sin(x * 0.3) * Math.cos(y * 0.3) * 0.8;
        }

        geo.attributes.position.needsUpdate = true;
        return geo;
    }, []);

    useFrame((state) => {
        if (meshRef.current && geometry) {
            const time = state.clock.getElapsedTime();
            const vertices = geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < vertices.length; i += 3) {
                const x = vertices[i];
                const y = vertices[i + 1];
                vertices[i + 2] =
                    Math.sin(x * 0.3 + time * 0.5) * Math.cos(y * 0.3 + time * 0.5) * 0.8 +
                    Math.sin(time * 0.3) * 0.3;
            }

            geometry.attributes.position.needsUpdate = true;
            meshRef.current.rotation.z += 0.002;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]}>
            <meshBasicMaterial color="#69E300" wireframe={true} />
        </mesh>
    );
}

/* -- 3D Scene -- */
function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <WireframeLandscape />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </>
    );
}

/* -- Main Landing Page -- */
export default function HeroSection() {
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    return (
        <div className="relative bg-[#0a0f1e] text-white overflow-hidden">
            {/* Hero Section */}
            <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-4 pb-20 overflow-hidden pt-16">
                {/* 3D Background */}
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 3, 12], fov: 75 }}>
                        <Suspense fallback={null}>
                            <Scene />
                        </Suspense>
                    </Canvas>
                    <div className="absolute inset-0 bg-linear-to-b from-[#0a0f1e]/90 via-[#0a0f1e]/70 to-[#0a0f1e] pointer-events-none" />
                </div>

                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Programming isn’t just my profession, it’s my passion.
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-gray-300 mb-4">
                            Hello, I'm <span className="text-white font-medium">Bikram Mondal</span>
                        </p>

                        {/* Software Developer Badge */}
                        <div className="inline-block mb-8">
                            <WordRotate
                                className="bg-[#69E300] text-black px-6 py-2 rounded-md text-sm font-semibold"
                                words={[
                                    "Software Engineer",
                                    "Full Stack Web Developer",
                                    "AI/ML Expert",
                                    "Moody Artists",
                                    "Blogger",
                                ]}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                            className="flex flex-row gap-4 justify-center items-center"
                        >
                            {/* Social Links */}
                            <a
                                href="https://github.com/BikramMondal5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-white/10 hover:bg-[#69E300] transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/bikram-mondal-a2bb18343/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-white/10 hover:bg-[#69E300] transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </a>

                            <a
                                href="https://x.com/CSnippets62428"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-white/10 hover:bg-[#69E300] transition-all duration-300"
                                aria-label="X (Twitter)"
                            >
                                <Twitter className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </a>

                            <a
                                href="mailto:codesnippets45@gmail.com"
                                className="group p-3 rounded-full bg-white/10 hover:bg-[#69E300] transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </a>

                            <a
                                href="https://www.instagram.com/code_snippets5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-white/10 hover:bg-[#69E300] transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </a>

                            <button
                                onClick={() => setIsResumeModalOpen(true)}
                                className="group p-3 rounded-full bg-white/10 hover:bg-[#69E300] transition-all duration-300"
                                aria-label="Resume"
                            >
                                <FileText className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </button>
                        </motion.div>


                    </motion.div>
                </div>
            </section>

            {/* Resume Modal */}
            {isResumeModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setIsResumeModalOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative bg-[#0a0f1e] border border-[#69E300]/20 rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-[#69E300]/20">
                            <h2 className="text-2xl font-bold text-white">Resume</h2>
                            <button
                                onClick={() => setIsResumeModalOpen(false)}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
                            <iframe
                                src="/resume.pdf"
                                className="w-full h-[calc(90vh-120px)] min-h-[600px] rounded"
                                title="Resume"
                            />
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Bento About Section */}
            <BentoSection />

            {/* Overview Section */}
            <OverviewSection />

            {/* Dynamic Project Showcase Section */}
            <ProjectShowcase />

            {/* Testimonial Carousel */}
            <TestimonialCarousel />

            {/* Footer */}
            <footer className="relative z-10 border-t border-[#69E300]/10 py-12 px-4 bg-[#0a0a0a]">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-[#69E300] flex items-center justify-center shadow-lg shadow-[#69E300]/30">
                                <Code2 className="w-5 h-5 text-black" />
                            </div>
                            <span className="font-bold text-white">bikram.dev</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Bikram. Built with Next.js &amp; ❤️
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

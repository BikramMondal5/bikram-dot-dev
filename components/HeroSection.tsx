"use client";

import React, { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, X, Code2, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import BentoSection from "@/components/BentoSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="relative min-h-screen bg-[#0a0f1e] text-white overflow-hidden">
            {/* Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrollY > 50 ? "bg-[#0a0f1e]/90 backdrop-blur-md shadow-lg" : "bg-transparent"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="h-10 w-10 rounded-lg bg-linear-to-br from-[#69E300] to-[#4aaa00] flex items-center justify-center shadow-lg shadow-[#69E300]/30"
                            >
                                <Brain className="w-6 h-6 text-black" />
                            </motion.div>
                            <span className="font-bold text-xl">bikram.dev</span>
                        </div>

                        <nav className="hidden md:flex gap-6">
                            {["About", "Projects", "Skills", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm font-medium transition-colors hover:text-[#69E300]"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full border-[#69E300] text-[#69E300] hover:bg-[#69E300]/10"
                            >
                                Resume
                            </Button>
                            <Button
                                size="sm"
                                className="rounded-full bg-[#69E300] text-black hover:bg-[#7fff00] font-semibold"
                            >
                                Hire Me
                            </Button>
                        </div>

                        <button className="flex md:hidden text-white" onClick={toggleMenu}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-md border-t border-[#69E300]/20"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                            {["About", "Projects", "Skills", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm font-medium hover:text-[#69E300]"
                                    onClick={toggleMenu}
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="flex flex-col gap-3 pt-4">
                                <Button variant="outline" className="w-full rounded-full border-[#69E300] text-[#69E300]">
                                    Resume
                                </Button>
                                <Button className="w-full rounded-full bg-[#69E300] text-black font-semibold">
                                    Hire Me
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.header>

            {/* Hero Section */}
            <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-4 pb-32 overflow-hidden">
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
                        <SectionHeader
                            label="Full-Stack Developer · Open to Work"
                            title={
                                <>
                                    Hi, I&apos;m{" "}
                                    <span className="bg-linear-to-r from-[#69E300] via-[#a3ff47] to-[#69E300] bg-clip-text text-transparent">
                                        Bikram
                                    </span>
                                    <br />
                                    I build for the web
                                </>
                            }
                            subtitle="I craft fast, accessible, and beautifully interactive products — from pixel-perfect UIs to scalable back-end systems."
                            className="mb-8"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button
                                size="lg"
                                className="group relative overflow-hidden rounded-full bg-[#69E300] text-black hover:bg-[#7fff00] font-semibold px-8 shadow-lg shadow-[#69E300]/30"
                            >
                                <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
                                    View My Work
                                </span>
                                <i className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid w-1/4 place-items-center transition-all duration-500 bg-black/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
                                    <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
                                </i>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full border-[#69E300] text-[#69E300] hover:bg-[#69E300]/10"
                            >
                                Get in Touch
                            </Button>
                        </motion.div>

                        {/* Feature Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.9 }}
                            className="flex flex-wrap gap-4 justify-center items-center mt-12"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#69E300]/10 border border-[#69E300]/20">
                                <Code2 className="w-4 h-4 text-[#69E300]" />
                                <span className="text-sm text-[#69E300]">React &amp; Next.js</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#69E300]/10 border border-[#69E300]/20">
                                <Brain className="w-4 h-4 text-[#69E300]" />
                                <span className="text-sm text-[#69E300]">Node &amp; Databases</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#69E300]/10 border border-[#69E300]/20">
                                <Sparkles className="w-4 h-4 text-[#69E300]" />
                                <span className="text-sm text-[#69E300]">Motion &amp; 3D</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Bento About Section */}
            <BentoSection />

            {/* Dynamic Project Showcase Section */}
            <ProjectShowcase />

            {/* CTA Section */}
            <section id="contact" className="relative z-10 py-32 px-4 bg-[#0a0a0a]">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <SectionHeader
                            label="Ready to Build Something?"
                            title="Let's Collaborate"
                            subtitle="I'm open for freelance work and full-time roles. Have a project in mind or just want to say hello? I'd love to hear from you."
                            className="mb-8"
                        />
                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                className="rounded-full bg-[#69E300] text-black hover:bg-[#7fff00] font-semibold px-8 shadow-lg shadow-[#69E300]/30"
                            >
                                Get in Touch
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-[#69E300]/10 py-12 px-4 bg-[#0a0a0a]">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-[#69E300] flex items-center justify-center shadow-lg shadow-[#69E300]/30">
                                <Brain className="w-5 h-5 text-black" />
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

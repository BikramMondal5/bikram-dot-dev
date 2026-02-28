"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, X, Code2, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import BentoSection from "@/components/BentoSection";

// Utility function for class names
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

// 3D Wireframe Landscape Mesh Component
interface WireframeLandscapeProps {
    mouseX: number;
    mouseY: number;
}

function WireframeLandscape({ mouseX, mouseY }: WireframeLandscapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const geometryRef = useRef<THREE.PlaneGeometry | null>(null);

    useEffect(() => {
        if (!geometryRef.current) {
            const geometry = new THREE.PlaneGeometry(50, 50, 80, 80);
            const vertices = geometry.attributes.position.array;

            for (let i = 0; i < vertices.length; i += 3) {
                const x = vertices[i];
                const y = vertices[i + 1];
                vertices[i + 2] = Math.sin(x * 0.3) * Math.cos(y * 0.3) * 0.8;
            }

            geometry.attributes.position.needsUpdate = true;
            geometryRef.current = geometry;
        }
    }, []);

    useFrame((state) => {
        if (meshRef.current && geometryRef.current) {
            const time = state.clock.getElapsedTime();
            const vertices = geometryRef.current.attributes.position.array;

            for (let i = 0; i < vertices.length; i += 3) {
                const x = vertices[i];
                const y = vertices[i + 1];
                vertices[i + 2] =
                    Math.sin(x * 0.3 + time * 0.5) * Math.cos(y * 0.3 + time * 0.5) * 0.8 +
                    Math.sin(time * 0.3) * 0.3;
            }

            geometryRef.current.attributes.position.needsUpdate = true;

            // Continuous rotation
            meshRef.current.rotation.z += 0.002;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometryRef.current || undefined} rotation={[-Math.PI / 2.2, 0, 0]}>
            <meshBasicMaterial color="#10b981" wireframe={true} />
        </mesh>
    );
}

// 3D Scene Component
interface SceneProps {
    mouseX: number;
    mouseY: number;
}

function Scene({ mouseX, mouseY }: SceneProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <WireframeLandscape mouseX={mouseX} mouseY={mouseY} />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </>
    );
}

// Main Landing Page Component
export function TensorTonicLanding() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1,
            });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                                className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center shadow-lg shadow-emerald-500/30"
                            >
                                <Brain className="w-6 h-6 text-white" />
                            </motion.div>
                            <span className="font-bold text-xl">TensorTonic</span>
                        </div>

                        <nav className="hidden md:flex gap-6">
                            <a href="#features" className="text-sm font-medium transition-colors hover:text-emerald-400">
                                Features
                            </a>
                            <a href="#problems" className="text-sm font-medium transition-colors hover:text-emerald-400">
                                Problems
                            </a>
                            <a href="#research" className="text-sm font-medium transition-colors hover:text-emerald-400">
                                Research
                            </a>
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <Button variant="outline" size="sm" className="rounded-full border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
                                Sign In
                            </Button>
                            <Button size="sm" className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600">
                                Get Started
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
                        className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-md border-t border-emerald-500/20"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                            <a href="#features" className="text-sm font-medium hover:text-emerald-400" onClick={toggleMenu}>
                                Features
                            </a>
                            <a href="#problems" className="text-sm font-medium hover:text-emerald-400" onClick={toggleMenu}>
                                Problems
                            </a>
                            <a href="#research" className="text-sm font-medium hover:text-emerald-400" onClick={toggleMenu}>
                                Research
                            </a>
                            <div className="flex flex-col gap-3 pt-4">
                                <Button variant="outline" className="w-full rounded-full border-emerald-500 text-emerald-400">
                                    Sign In
                                </Button>
                                <Button className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500">
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.header>

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-4 overflow-hidden">
                {/* 3D Background - Only in Hero Section */}
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 3, 12], fov: 75 }}>
                        <Suspense fallback={null}>
                            <Scene mouseX={mousePosition.x} mouseY={mousePosition.y} />
                        </Suspense>
                    </Canvas>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/90 via-[#0a0f1e]/70 to-[#0a0f1e] pointer-events-none" />
                </div>

                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-sm mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400">Now with Research Paper Implementations</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                        >
                            Learn{" "}
                            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                Machine Learning
                            </span>
                            <br />
                            through code
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
                        >
                            Implement 200+ ML algorithms from scratch. From gradients to transformers, learn the math with interactive visualizations and implement research papers.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button size="lg" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 px-8 shadow-lg shadow-emerald-500/30">
                                <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
                                    Start Learning
                                </span>
                                <i className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
                                    <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
                                </i>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                            >
                                Explore Research
                            </Button>
                        </motion.div>

                        {/* Feature Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.9 }}
                            className="flex flex-wrap gap-4 justify-center items-center mt-12"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <Code2 className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-emerald-400">200+ ML Problems</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <Brain className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-emerald-400">AI Research Papers</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-emerald-400">ML Math</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Bento About Section */}
            <BentoSection />

            {/* Features Section */}
            <section id="features" className="relative z-10 py-24 px-4">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Master ML Through Code
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Build a deep understanding of machine learning by implementing algorithms from scratch
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                title: "From Scratch Implementation",
                                description: "Build neural networks, transformers, and more without relying on frameworks",
                            },
                            {
                                title: "Interactive Visualizations",
                                description: "Understand complex concepts with visual, interactive demonstrations",
                            },
                            {
                                title: "Research Paper Guides",
                                description: "Follow along as we implement cutting-edge papers step by step",
                            },
                            {
                                title: "Mathematical Foundations",
                                description: "Learn the math behind ML with clear explanations and examples",
                            },
                            {
                                title: "200+ Exercises",
                                description: "Practice with carefully curated problems that build your skills",
                            },
                            {
                                title: "Community Support",
                                description: "Join a community of learners and get help when you need it",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 backdrop-blur-sm"
                            >
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="relative z-10 py-24 px-4" >
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 backdrop-blur-sm"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of developers mastering machine learning through hands-on coding
                        </p>
                        <Button size="lg" className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 px-8 shadow-lg shadow-emerald-500/30">
                            Start Free Trial
                        </Button>
                    </motion.div>
                </div>
            </section >

            {/* Footer */}
            < footer className="relative z-10 border-t border-emerald-500/20 py-12 px-4" >
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold">TensorTonic</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} TensorTonic. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer >
        </div >
    );
}

export default function App() {
    return <TensorTonicLanding />;
}

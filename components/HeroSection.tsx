"use client";

import React, { useRef, useEffect, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ChevronRight, Code2, Sparkles, Brain, Github, Linkedin, Twitter, Mail, Instagram, FileText, X, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { WordRotate } from "@/registry/ui-registry/word-rotate";
import { Highlighter } from "@/components/ui/highlighter";
import { TypingAnimation } from "@/components/ui/typing-animation";
import BentoSection from "@/components/BentoSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import { SectionHeader } from "@/components/ui/SectionHeader";
import OverviewSection from "@/components/OverviewSection";
import CertificatesSection from "@/components/CertificatesSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
    github: (props: IconProps) => (
        <svg viewBox="0 0 438.549 438.549" {...props}>
            <path
                fill="currentColor"
                d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
            ></path>
        </svg>
    ),
    linkedin: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <title>LinkedIn</title>
            <path
                fill="currentColor"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
        </svg>
    ),
    x: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <title>X</title>
            <path
                fill="currentColor"
                d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
            />
        </svg>
    ),
    email: (props: IconProps) => <Mail {...props} />,
    instagram: (props: IconProps) => <Instagram {...props} />,
    resume: (props: IconProps) => <FileText {...props} />,
};

const SOCIAL_DATA = {
    GitHub: {
        name: "GitHub",
        url: "https://github.com/BikramMondal5",
        icon: Icons.github,
    },
    LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/bikram-mondal-a2bb18343/",
        icon: Icons.linkedin,
    },
    X: {
        name: "X",
        url: "https://x.com/CSnippets62428",
        icon: Icons.x,
    },
    Email: {
        name: "Send Email",
        url: "mailto:codesnippets45@gmail.com",
        icon: Icons.email,
    },
    Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/code_snippets5",
        icon: Icons.instagram,
    },
    Resume: {
        name: "Resume",
        url: "https://drive.google.com/file/d/1tu0QenFZIEciDSA0GerFjF4Ck_mbgOTq/view?usp=sharing",
        icon: Icons.resume,
    },
};

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

/* -- Quote Card Component -- */
function QuoteCard() {
    const quoteData = {
        name: "Bikram",
        avatar: "/avatar.jfif",
        feedback: "Software, art, and life are never perfect, they need to improve over time.",
        rating: 5,
        country: "Developer",
        type: "Philosophy"
    };

    return (
        <div className="w-full">
            <Card
                className="relative group transition-all duration-500 w-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#69E300]/20 rounded-3xl overflow-hidden backdrop-blur-sm"
                style={{ minHeight: "200px" }}
            >
                <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-[#69E300]/10 transition-colors">
                    <Quote className="w-12 h-12 rotate-180" />
                </div>

                <div className="p-8 flex items-center gap-8">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={quoteData.avatar}
                                alt={quoteData.name}
                                width={80}
                                height={80}
                                className="rounded-full border-2 border-white/10 object-cover transition-all duration-500 w-20 h-20"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#69E300] rounded-full border-2 border-[#0a0809]" />
                        </div>
                    </div>

                    {/* Quote Text */}
                    <div className="flex-1">
                        <p className="text-white/90 text-xl md:text-2xl font-medium leading-relaxed group-hover:text-white transition-colors italic">
                            &quot;{quoteData.feedback}&quot;
                        </p>
                    </div>
                </div>
            </Card>
        </div>
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
                        <SectionHeader
                            label="About Me"
                            icon={<Sparkles className="h-4 w-4" />}
                            title=""
                            subtitle=""
                            className="mb-1"
                        />

                        {/* Main Heading */}
                        <h1 className="font-bold mb-6 font-[family-name:var(--font-space-grotesk)]" style={{ fontSize: '80px', lineHeight: '98px' }}>
                            Hi, I'm <span className="text-[#69E300]">Bikram Mondal</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-white mb-8 font-[family-name:var(--font-poppins)]" style={{ fontSize: '30px', lineHeight: '40px' }}>
                            A <span className="inline-flex items-center px-6 py-2 bg-[#69E300] text-black hover:bg-[#7fff00] font-semibold rounded-lg transition-all duration-300">Full Stack Web Developer</span> with a passion for learning and building web applications.
                            I love solving problems and building things through code. Programming isn't just my profession, it's my passion.
                        </p>

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

                            <a
                                href="https://drive.google.com/file/d/1tu0QenFZIEciDSA0GerFjF4Ck_mbgOTq/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-white/10 hover:bg-[#69E300] transition-all duration-300"
                                aria-label="Resume"
                            >
                                <FileText className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            </a>
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

            {/* Certificates Section */}
            <CertificatesSection />

            {/* Testimonial Carousel */}
            <TestimonialCarousel />

            {/* Quote Section */}
            <section className="relative pt-6 pb-12 bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto px-4">
                    <QuoteCard />
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-16 px-4 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-row items-start justify-between gap-12">
                        {/* Left: Let's Connect */}
                        <div className="flex flex-col items-start gap-6">
                            <h2
                                className="pointer-events-none text-5xl md:text-6xl lg:text-7xl leading-tight whitespace-pre-wrap"
                                style={{
                                    background: 'linear-gradient(180deg, #f8fafc 0%, #bfc9d3 40%, #6b7280 100%)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    textShadow: '0 4px 0 rgba(0,0,0,0.55), 0 14px 30px rgba(0,0,0,0.8)'
                                }}
                            >
                                Let&apos;s Connect
                            </h2>

                            <TooltipProvider>
                                <Dock direction="middle" className="bg-white/5 border-white/10">
                                    {Object.entries(SOCIAL_DATA).map(([name, social]) => (
                                        <DockIcon key={name}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={social.name}
                                                        className={cn(
                                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                                            "size-12 rounded-full !bg-transparent hover:!bg-[#69E300] hover:!text-black"
                                                        )}
                                                    >
                                                        <social.icon className="size-5" />
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </DockIcon>
                                    ))}
                                </Dock>
                            </TooltipProvider>
                        </div>

                        {/* Right: Collaboration Text */}
                        <div className="flex-1 flex flex-col gap-4 max-w-2xl">
                            <p className="text-2xl md:text-3xl font-semibold text-[#69E300] leading-relaxed">
                                Have an idea or want to collaborate? I&apos;d love to hear from you.
                            </p>
                            <p className="text-xl md:text-2xl text-gray-400 leading-tight">
                                Looking for a contact form? Skip the traditional way, just ask my{" "}
                                <span className="text-[#69E300] font-semibold">Reactz Agent</span>{" "}
                                and it&apos;ll handle everything for you.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

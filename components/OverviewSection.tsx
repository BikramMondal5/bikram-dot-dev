"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";

export default function OverviewSection() {
    return (
        <section id="overview" className="relative z-10 py-20 px-4 bg-[#0a0a0a] overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <SectionHeader
                    label="Introduction"
                    title={
                        <>
                            Hey! It&apos;s Me <span className="text-[#69E300]">Bikram</span>
                        </>
                    }
                    subtitle="A full-stack developer passionate about AI, scalable architecture, and crafting interactive digital experiences."
                />
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Left: Content */}
                    <div className="space-y-6">
                        <h2
                            className="text-5xl md:text-7xl font-bold text-white mb-6"
                            style={{ fontFamily: 'var(--font-space-grotesk)' }}
                        >
                            Overview.
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-lg md:text-xl">
                            I&apos;m a{" "}
                            <span className="text-white font-semibold">
                                Full-stack Web developer
                            </span>{" "}
                            with experience in{" "}
                            <span className="font-bold">
                                Python, Javascript &amp; TypeScript
                            </span>
                            , and expertise in frameworks like{" "}
                            <span className="font-bold">
                                React, Node.js, and Three.js
                            </span>
                            . I love to explore new technologies to refine my skills and
                            contribute to interactive projects. Also I enjoy to build
                            efficient, scalable, and user-friendly solutions that solve
                            real-world problems. Let&apos;s work together to bring your ideas
                            to life!
                        </p>
                    </div>

                    {/* Right: Image Placeholder */}
                    <div className="relative w-[90%] h-[400px] lg:h-[500px] ml-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#69E300]/10 via-[#0d0d0d] to-[#0d0d0d] border border-white/6 group hover:border-[#69E300]/30 transition-all duration-500">
                        <img
                            src="/avatar.jpeg"
                            alt="Bikram"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Subtle hover glow */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background:
                                    "radial-gradient(circle at 50% 50%, #69E30008 0%, transparent 70%)",
                            }}
                        />
                    </div>
                </motion.div>
            </div >
        </section >
    );
}

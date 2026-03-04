"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Code, GraduationCap, Award, Wrench, Users, Globe, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

interface ExperienceItem {
    id: number;
    date: string;
    title: string;
    organization: string;
    description: string;
    icon: LucideIcon;
}

interface TimelineProps {
    experiences?: ExperienceItem[];
}

const defaultExperiences: ExperienceItem[] = [
    {
        id: 1,
        date: "Jul 2024 – Aug 2024",
        title: "AI/ML Intern",
        organization: "AI Wallah",
        description:
            "Built user-friendly, scalable, and responsive AI-driven web applications featuring real-time weather forecasting and automated email integration.",
        icon: Code,
    },
    {
        id: 2,
        date: "Jul 2025 – Present",
        title: "AI/ML Lead",
        organization: "Digital Dominators",
        description:
            "Leading the AI/ML domain by organizing technical workshops, community events, and innovation-driven initiatives while strengthening leadership and collaborative learning.",
        icon: Users,
    },
    {
        id: 3,
        date: "Dec 2025 – Present",
        title: "Campus Ambassador",
        organization: "Open Source Connect Global",
        description:
            "Promoting open-source contribution culture by onboarding and mentoring developers while strengthening communication, outreach, and developer community building.",
        icon: Globe,
    },
    {
        id: 4,
        date: "Feb 2026 – Present",
        title: "Ambassador",
        organization: "The Girls Who Yap",
        description:
            "Representing a Web3-focused fellowship community, encouraging awareness of decentralized technologies while supporting networking and inclusive community engagement.",
        icon: Award,
    },
];

const InteractiveTimeline: React.FC<TimelineProps> = ({
    experiences = defaultExperiences,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const pathProgress = useTransform(scrollYProgress, [0, 1], [0, pathLength]);

    useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const index = Math.floor(latest * experiences.length);
            setActiveIndex(Math.min(index, experiences.length - 1));
        });
        return () => unsubscribe();
    }, [scrollYProgress, experiences.length]);

    const generatePath = () => {
        const width = 800;
        const height = experiences.length * 400;
        const segments = experiences.length;
        const segmentHeight = height / segments;

        let path = `M ${width / 2} 0`;

        for (let i = 0; i < segments; i++) {
            const y2 = (i + 1) * segmentHeight;
            const xOffset = i % 2 === 0 ? 150 : -150;
            const cp1x = width / 2 + xOffset;
            const cp1y = i * segmentHeight + segmentHeight * 0.3;
            const cp2x = width / 2 + xOffset;
            const cp2y = i * segmentHeight + segmentHeight * 0.7;

            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${width / 2} ${y2}`;
        }

        return path;
    };

    const getNodePosition = (index: number) => {
        const segmentHeight = 400;
        const y = index * segmentHeight + segmentHeight / 2;
        const xOffset = index % 2 === 0 ? 150 : -150;
        return { x: 400 + xOffset, y };
    };

    return (
        <div ref={containerRef} className="relative" style={{ height: `${experiences.length * 400}px` }}>
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 800 1600"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#69E300" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#69E300" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Background dashed path */}
                <path
                    d={generatePath()}
                    stroke="url(#pathGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="8 8"
                    opacity="0.4"
                />

                {/* Animated progress path */}
                <motion.path
                    ref={pathRef}
                    d={generatePath()}
                    stroke="#69E300"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={pathLength}
                    strokeDashoffset={useTransform(pathProgress, (v) => pathLength - v)}
                    strokeLinecap="round"
                />

                {/* Moving circle along path */}
                <motion.g
                    style={{
                        offsetPath: `path('${generatePath()}')`,
                        offsetDistance: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                    }}
                >
                    <motion.circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill="#69E300"
                        className="drop-shadow-[0_0_10px_rgba(105,227,0,0.8)]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.g>

                {/* Node circles */}
                {experiences.map((exp, index) => {
                    const pos = getNodePosition(index);
                    const isActive = activeIndex !== null && index <= activeIndex;

                    return (
                        <g key={exp.id}>
                            <motion.circle
                                cx={pos.x}
                                cy={pos.y}
                                r="20"
                                fill={isActive ? "#69E300" : "#1e293b"}
                                stroke={isActive ? "#69E300" : "#475569"}
                                strokeWidth="3"
                                initial={{ scale: 0 }}
                                animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    repeat: isActive ? Infinity : 0,
                                    repeatDelay: 2,
                                }}
                                className={cn(isActive && "drop-shadow-[0_0_20px_rgba(105,227,0,0.6)]")}
                            />
                            <motion.circle
                                cx={pos.x}
                                cy={pos.y}
                                r="12"
                                fill={isActive ? "#69E300" : "#334155"}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Experience cards */}
            {experiences.map((exp, index) => {
                const pos = getNodePosition(index);
                const isLeft = index % 2 === 0;
                const isActive = activeIndex !== null && index <= activeIndex;
                const isCurrent = exp.date.includes("Present");
                const Icon = exp.icon;

                return (
                    <motion.div
                        key={exp.id}
                        className="absolute"
                        style={{
                            left: isLeft
                                ? "calc(50% + 200px)"
                                : "calc(50% - 200px - 400px)",
                            top: `${pos.y - 100}px`,
                            width: "400px",
                        }}
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <Card
                            className={cn(
                                "bg-slate-900/80 backdrop-blur-lg border-2 transition-all duration-500",
                                isActive
                                    ? "border-[#69E300]/50 shadow-[0_0_30px_rgba(105,227,0,0.3)]"
                                    : "border-slate-700/50"
                            )}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <Badge
                                        className={cn(
                                            "text-xs font-mono",
                                            isCurrent
                                                ? "bg-[#69E300]/20 text-[#69E300] border-[#69E300]/50"
                                                : "bg-slate-700/50 text-slate-300 border-slate-600/50"
                                        )}
                                    >
                                        {exp.date}
                                    </Badge>
                                    <Icon
                                        className={cn(
                                            "w-6 h-6",
                                            isActive ? "text-[#69E300]" : "text-slate-400"
                                        )}
                                    />
                                </div>
                                <CardTitle className="text-xl text-white">{exp.title}</CardTitle>
                                <p className="text-sm text-[#69E300] font-medium">{exp.organization}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {exp.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
};

const MobileTimeline: React.FC<TimelineProps> = ({
    experiences = defaultExperiences,
}) => {
    return (
        <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-linear-to-b from-[#69E300] via-[#69E300]/40 to-[#69E300]/10" />

            <div className="space-y-6">
                {experiences.map((exp, index) => {
                    const Icon = exp.icon;
                    const isCurrent = exp.date.includes("Present");

                    return (
                        <motion.div
                            key={exp.id}
                            className="relative flex gap-4"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Icon circle node */}
                            <div className="relative shrink-0 z-10">
                                <motion.div
                                    className="w-10 h-10 rounded-full bg-slate-900 border-2 border-[#69E300] flex items-center justify-center"
                                    animate={isCurrent ? {
                                        boxShadow: [
                                            "0 0 8px rgba(105,227,0,0.3)",
                                            "0 0 20px rgba(105,227,0,0.7)",
                                            "0 0 8px rgba(105,227,0,0.3)",
                                        ],
                                    } : { boxShadow: "0 0 8px rgba(105,227,0,0.2)" }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Icon className="w-4 h-4 text-[#69E300]" />
                                </motion.div>
                            </div>

                            {/* Card */}
                            <div className="flex-1 min-w-0 pb-2">
                                <Card
                                    className={cn(
                                        "bg-slate-900/80 backdrop-blur-lg border-2 transition-all duration-500",
                                        isCurrent
                                            ? "border-[#69E300]/50 shadow-[0_0_20px_rgba(105,227,0,0.15)]"
                                            : "border-slate-700/50"
                                    )}
                                >
                                    <CardHeader className="pb-3">
                                        <Badge
                                            className={cn(
                                                "text-xs font-mono w-fit mb-2",
                                                isCurrent
                                                    ? "bg-[#69E300]/20 text-[#69E300] border-[#69E300]/50"
                                                    : "bg-slate-700/50 text-slate-300 border-slate-600/50"
                                            )}
                                        >
                                            {exp.date}
                                        </Badge>
                                        <CardTitle className="text-base sm:text-lg text-white leading-snug">
                                            {exp.title}
                                        </CardTitle>
                                        <p className="text-sm text-[#69E300] font-medium">{exp.organization}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

const WorksExperienceSection: React.FC = () => {
    return (
        <section
            id="works-experience"
            className="relative w-full py-12 sm:py-16 md:py-20 px-4 bg-[#0A0A0A]"
        >
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    label="Craft & Experience"
                    icon={<Wrench className="h-4 w-4" />}
                    title={
                        <>
                            My <span className="text-[#69E300]">Works & Experience</span>
                        </>
                    }
                    subtitle="A journey through the projects I've built, the communities I've contributed to, and the experiences that shaped my growth as a developer."
                />

                {/* Mobile / Tablet timeline (< lg) */}
                <div className="block lg:hidden">
                    <MobileTimeline />
                </div>

                {/* Desktop timeline (≥ lg) */}
                <div className="hidden lg:block">
                    <InteractiveTimeline />
                </div>
            </div>

            {/* Ambient glow */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(105, 227, 0, 0.03) 0%, transparent 50%)",
                }}
            />
        </section>
    );
};

export default WorksExperienceSection;

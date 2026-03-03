"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Settings2 } from "lucide-react";
import {
    SiLangchain,
    SiAndroid,
    SiJupyter,
    SiR,
    SiAmazonwebservices,
    SiDocker,
    SiLinux,
    SiGithub,
    SiGooglecloud,
    SiGithubactions,
    SiJavascript,
    SiCss3,
    SiHtml5,
    SiFlutter,
    SiExpress,
    SiFlask,
    SiFastapi,
    SiFirebase,
    SiSupabase,
    SiPostgresql,
    SiFigma,
    SiCanva,
    SiPostman,
    SiPrisma,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { IconType } from "react-icons";
import { SectionHeader } from "./ui/SectionHeader";

type LocalTech = { name: string; type: "local"; src: string };
type IconTech = { name: string; type: "icon"; Icon: IconType; color: string };
type TechItem = LocalTech | IconTech;
type TechCategory = { category: string; techs: TechItem[] };

const techCategories: TechCategory[] = [
    {
        category: "AI & Data",
        techs: [
            { name: "LangChain", type: "icon", Icon: SiLangchain, color: "#1C3C3C" },
            { name: "Android", type: "icon", Icon: SiAndroid, color: "#3DDC84" },
            { name: "Python", type: "local", src: "/icons/python.png" },
            { name: "R", type: "icon", Icon: SiR, color: "#276DC3" },
            { name: "Jupyter", type: "icon", Icon: SiJupyter, color: "#F37626" },
        ],
    },
    {
        category: "Cloud & DevOps",
        techs: [
            { name: "AWS", type: "icon", Icon: SiAmazonwebservices, color: "#FF9900" },
            { name: "Docker", type: "icon", Icon: SiDocker, color: "#2496ED" },
            { name: "Linux", type: "icon", Icon: SiLinux, color: "#FCC624" },
            { name: "Git", type: "local", src: "/icons/git.png" },
            { name: "GitHub", type: "icon", Icon: SiGithub, color: "#E0E0E0" },
            { name: "Google Cloud", type: "icon", Icon: SiGooglecloud, color: "#4285F4" },
            { name: "CI/CD", type: "icon", Icon: SiGithubactions, color: "#2088FF" },
        ],
    },
    {
        category: "Frontend",
        techs: [
            { name: "React", type: "local", src: "/icons/react.png" },
            { name: "Next.js", type: "local", src: "/icons/nextjs.png" },
            { name: "Tailwind CSS", type: "local", src: "/icons/tailwind.svg" },
            { name: "JavaScript", type: "icon", Icon: SiJavascript, color: "#F7DF1E" },
            { name: "TypeScript", type: "local", src: "/icons/typescript-2.svg" },
            { name: "CSS3", type: "icon", Icon: SiCss3, color: "#1572B6" },
            { name: "HTML5", type: "icon", Icon: SiHtml5, color: "#E34F26" },
            { name: "Flutter", type: "icon", Icon: SiFlutter, color: "#02569B" },
        ],
    },
    {
        category: "Backend",
        techs: [
            { name: "Node.js", type: "local", src: "/icons/nodejs-icon.svg" },
            { name: "Express.js", type: "icon", Icon: SiExpress, color: "#E0E0E0" },
            { name: "Flask", type: "icon", Icon: SiFlask, color: "#E0E0E0" },
            { name: "FastAPI", type: "icon", Icon: SiFastapi, color: "#009688" },
            { name: "Prisma", type: "icon", Icon: SiPrisma, color: "#5A67D8" },
        ],
    },
    {
        category: "Database",
        techs: [
            { name: "MongoDB", type: "local", src: "/icons/mongodb.png" },
            { name: "Firebase", type: "icon", Icon: SiFirebase, color: "#FFCA28" },
            { name: "Supabase", type: "icon", Icon: SiSupabase, color: "#3ECF8E" },
            { name: "PostgreSQL", type: "icon", Icon: SiPostgresql, color: "#336791" },
        ],
    },
    {
        category: "Design",
        techs: [
            { name: "Figma", type: "icon", Icon: SiFigma, color: "#F24E1E" },
            { name: "Canva", type: "icon", Icon: SiCanva, color: "#00C4CC" },
        ],
    },
    {
        category: "Tools",
        techs: [
            { name: "VS Code", type: "icon", Icon: VscVscode, color: "#007ACC" },
            { name: "Postman", type: "icon", Icon: SiPostman, color: "#FF6C37" },
            { name: "GitHub", type: "icon", Icon: SiGithub, color: "#E0E0E0" },
        ],
    },
];

function TechPill({ tech, index }: { tech: TechItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            whileHover={{ scale: 1.06, y: -2 }}
            className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 py-2 hover:border-[#69E300]/35 hover:bg-[#69E300]/6 transition-all duration-200 cursor-default group/pill"
        >
            <span className="shrink-0">
                {tech.type === "local" ? (
                    <Image
                        src={tech.src}
                        alt={tech.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                    />
                ) : (
                    <tech.Icon size={20} style={{ color: tech.color }} />
                )}
            </span>
            <span className="text-xs font-medium text-gray-400 group-hover/pill:text-gray-200 transition-colors whitespace-nowrap">
                {tech.name}
            </span>
        </motion.div>
    );
}

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

                {/* Two-column: text + avatar */}
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
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6"
                            style={{ fontFamily: 'var(--font-space-grotesk)' }}
                        >
                            Overview.
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-base sm:text-lg md:text-xl">
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

                    {/* Right: Avatar */}
                    <div className="relative w-full sm:w-[85%] md:w-[90%] h-80 sm:h-96 md:h-100 lg:h-125 mx-auto lg:ml-auto rounded-3xl overflow-hidden bg-linear-to-br from-[#69E300]/10 via-[#0d0d0d] to-[#0d0d0d] border border-white/6 group hover:border-[#69E300]/30 transition-all duration-500">
                        <img
                            src="/avatar.jpeg"
                            alt="Bikram"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background:
                                    "radial-gradient(circle at 50% 50%, #69E30008 0%, transparent 70%)",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Tech Stack Section */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20"
                >
                    {/* Section Header */}
                    <SectionHeader
                        label="Technology Stack"
                        icon={<Settings2 className="h-4 w-4" />}
                        title={
                            <>
                                Tools &amp;{" "}
                                <span className="text-[#69E300]">Technologies I Work With</span>
                            </>
                        }
                        subtitle="A carefully curated stack of modern technologies I use to design, build, and scale intelligent digital systems."
                        className="mb-12"
                    />

                    {/* Categories grid */}
                    <div className="space-y-8">
                        {techCategories.map((cat, catIdx) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                                className="flex flex-col sm:flex-row sm:items-start gap-4"
                            >
                                {/* Category label — fixed width column */}
                                <div className="sm:w-36 shrink-0 pt-1.5">
                                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                                        {cat.category}
                                    </span>
                                </div>

                                {/* Tech pills */}
                                <div className="flex flex-wrap gap-2 flex-1">
                                    {cat.techs.map((tech, i) => (
                                        <TechPill key={tech.name} tech={tech} index={i} />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

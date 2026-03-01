"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    MapPin,
    Copy,
    Code2,
    Database,
    Globe as GlobeIcon,
    Layers,
    Server,
    Cpu,
    Palette,
    GitBranch,
    Users,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { Globe } from "@/registry/magicui/globe";
import Lanyard from "@/components/Lanyard";
import { OrbitingCircles } from "@/registry/magicui/orbiting-circles";
import { ConfettiButton } from "@/registry/magicui/confetti";

/* -- TECH STACK DATA -- */
const techStack = [
    { label: "React", icon: <Code2 size={11} />, color: "#61DAFB" },
    { label: "TypeScript", icon: <Code2 size={11} />, color: "#3178C6" },
    { label: "Next.js", icon: <Layers size={11} />, color: "#e2e8f0" },
    { label: "Tailwind", icon: <Palette size={11} />, color: "#38BDF8" },
    { label: "Framer Motion", icon: <Cpu size={11} />, color: "#FF0080" },
    { label: "Node.js", icon: <Server size={11} />, color: "#68A063" },
    { label: "Express", icon: <Server size={11} />, color: "#aaa" },
    { label: "PostgreSQL", icon: <Database size={11} />, color: "#336791" },
    { label: "MongoDB", icon: <Database size={11} />, color: "#47A248" },
    { label: "Prisma", icon: <Database size={11} />, color: "#5A67D8" },
    { label: "Sanity", icon: <GlobeIcon size={11} />, color: "#F03E2F" },
    { label: "Three.js", icon: <Layers size={11} />, color: "#e2e8f0" },
    { label: "GraphQL", icon: <GitBranch size={11} />, color: "#E10098" },
    { label: "Docker", icon: <Layers size={11} />, color: "#2496ED" },
    { label: "Contentful", icon: <GlobeIcon size={11} />, color: "#2478CC" },
    { label: "Sass", icon: <Palette size={11} />, color: "#CC6699" },
    { label: "RxJS", icon: <Cpu size={11} />, color: "#B7178C" },
];

/* -- PROJECTS -- */
const projects = [
    { title: "Custom Payments & Access Control", desc: "Built an in-house payment flow supporting subscriptions.", tags: ["Stripe", "Next.js", "Prisma"] },
    { title: "Unified Auth & Identity Layer", desc: "A shared authentication system powering Rune AI.", tags: ["NextAuth", "JWT", "Redis"] },
    { title: "In-House CMS & Content Pipeline", desc: "Designed a custom CMS for publishing blogs, tools, and docs.", tags: ["Sanity", "TypeScript", "CDN"] },
    { title: "AI Services & Model Orchestration", desc: "Integrated a proprietary AI logic to power Rune AI features.", tags: ["OpenAI", "LangChain", "Node.js"] },
    { title: "Platform Monitoring & Growth Insights", desc: "Internal tracking and analytics to understand user behaviour.", tags: ["PostHog", "Grafana", "Docker"] },
];

/* -- CARD A — Avatar Circles -- */
function AvatarCircles() {
    const avatars = [
        { seed: "dev1", delay: 0 },
        { seed: "dev2", delay: 0.08 },
        { seed: "dev3", delay: 0.16 },
        { seed: "dev4", delay: 0.24 },
        { seed: "dev5", delay: 0.32 },
    ];
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center">
                {avatars.map((a, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: a.delay, type: "spring", stiffness: 260, damping: 20 }}
                        style={{ marginLeft: i === 0 ? 0 : -24, zIndex: i }}
                        className={cn(
                            "rounded-full border-2 overflow-hidden shrink-0 bg-[#111]",
                            i === 2
                                ? "w-24 h-24 border-[#69E300] ring-2 ring-[#69E300]/40 z-10"
                                : "w-20 h-20 border-white/8"
                        )}
                    >
                        {i === 2 ? (
                            <div className="w-full h-full bg-[#0d1a00] flex items-center justify-center text-3xl select-none">
                                🧑‍💻
                            </div>
                        ) : (
                            <img
                                src={`https://api.dicebear.com/9.x/identicon/svg?seed=${a.seed}&backgroundColor=111111`}
                                alt=""
                                className="w-full h-full opacity-60"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* -- CARD B — Tech Scrolling Strips -- */
function TechScrollBackground() {
    const row1 = techStack.slice(0, 9);
    const row2 = techStack.slice(9);
    const row3 = techStack.slice(3, 12);

    const TechPill = ({ t }: { t: (typeof techStack)[0] }) => (
        <span
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap mx-1.5"
            style={{ background: `${t.color}14`, border: `1px solid ${t.color}35`, color: t.color }}
        >
            {t.icon}{t.label}
        </span>
    );

    return (
        <div className="absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden py-4">
            <Marquee duration={20} pauseOnHover className="mask-[linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]">
                {row1.map((t, i) => <TechPill key={i} t={t} />)}
            </Marquee>
            <Marquee duration={25} reverse pauseOnHover className="mask-[linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]">
                {row2.map((t, i) => <TechPill key={i} t={t} />)}
            </Marquee>
            <Marquee duration={19} pauseOnHover className="mask-[linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]">
                {row3.map((t, i) => <TechPill key={i} t={t} />)}
            </Marquee>
        </div>
    );
}

/* -- CARD D — Orbiting Tech Circles -- */
function OrbitingBackground() {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Centre: profile avatar */}
            <div className="relative z-10 w-16 h-16 rounded-full overflow-hidden border-2 border-[#69E300]/50 shadow-[0_0_20px_#69E30033] bg-[#0d1a00]">
                <img
                    src="/avatar.jfif"
                    alt="Bikram"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = 'none';
                        t.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-3xl select-none">🧑‍💻</div>';
                    }}
                />
            </div>

            {/* Outer orbit */}
            <OrbitingCircles iconSize={28} radius={95} duration={22} speed={1}>
                {/* React */}
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
                    <circle cx="20" cy="20" r="3.8" fill="#61DAFB" />
                    <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
                    <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)" />
                    <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)" />
                </svg>
                {/* TypeScript */}
                <img src="/icons/typescript-2.svg" alt="TypeScript" className="w-full h-full p-0.5 rounded" />
                {/* Next.js */}
                <img src="/icons/nextjs.png" alt="Next.js" className="w-full h-full p-0.5 rounded" />
                {/* Node.js */}
                <img src="/icons/nodejs-icon.svg" alt="Node.js" className="w-full h-full p-0.5 rounded" />
                {/* Tailwind */}
                <img src="/icons/tailwind.svg" alt="Tailwind CSS" className="w-full h-full p-0.5 rounded" />
            </OrbitingCircles>

            {/* Inner orbit (reverse) */}
            <OrbitingCircles iconSize={22} radius={52} duration={15} reverse speed={1.2}>
                {/* MongoDB */}
                <img src="/icons/mongodb.png" alt="MongoDB" className="w-full h-full p-0.5 rounded" />
                {/* Python */}
                <img src="/icons/python.png" alt="Python" className="w-full h-full p-0.5 rounded" />
                {/* Git */}
                <img src="/icons/git.png" alt="Git" className="w-full h-full p-0.5 rounded" />
            </OrbitingCircles>

            {/* Subtle glow rings */}
            <div className="pointer-events-none absolute rounded-full border border-[#69E300]/8" style={{ width: 214, height: 214 }} />
            <div className="pointer-events-none absolute rounded-full border border-[#69E300]/5" style={{ width: 134, height: 134 }} />

            {/* Email copy button — bottom right */}
            <ConfettiButton
                onClick={() => navigator.clipboard.writeText("codesnippets45@gmail.com")}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#69E300]/10 border border-[#69E300]/35 text-[#69E300] text-[10px] font-mono hover:bg-[#69E300]/20 active:scale-95 transition-all duration-200 cursor-pointer"
            >
                <Copy size={10} />
                <span>codesnippets45@gmail.com</span>
            </ConfettiButton>
        </div>
    );
}

/* -- CARD E — Projects horizontal scroll -- */
function ProjectsBackground() {
    return (
        <Marquee
            duration={30}
            pauseOnHover
            className="absolute inset-0 items-center mask-[linear-gradient(to_right,transparent_0%,#000_12%,#000_88%,transparent_100%)]"
        >
            {projects.map((p, i) => (
                <div
                    key={i}
                    className="w-52 mx-3 p-4 rounded-xl shrink-0 bg-[#131313] border border-white/6 hover:border-[#69E300]/25 transition-colors duration-200 cursor-default"
                >
                    <div className="w-7 h-7 rounded-lg bg-[#69E300]/10 flex items-center justify-center mb-3">
                        <Code2 size={13} className="text-[#69E300]" />
                    </div>
                    <h4 className="text-xs font-semibold text-white mb-1.5 leading-snug">{p.title}</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1">
                        {p.tags.map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] bg-[#69E300]/8 border border-[#69E300]/20 text-[#69E300]/75 font-mono">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </Marquee>
    );
}

/* ================================================================
   MAIN EXPORT — 5-Box Bento Grid
   Row 1:  [A — wide 2col]          [B — tall 2row]
   Row 2:  [C — tall 2row]  [D — square]  [B cont.]
   Row 3:  [C cont.]        [E — wide 2col        ]
================================================================ */
export default function BentoSection() {
    return (
        <section className="relative z-10 py-20 px-4 bg-[#0a0a0a] overflow-hidden">
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 80% 40% at 50% -5%, #69E30010 0%, transparent 70%)" }}
            />

            <div className="container mx-auto max-w-6xl relative">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-10"
                >
                    <span className="w-8 h-px bg-[#69E300]" />
                    <span className="text-[#69E300] text-sm font-mono uppercase tracking-widest">About &amp; Work</span>
                </motion.div>

                {/* 3-col x 3-row grid, each row = 260px */}
                <div className="grid grid-cols-3 gap-4" style={{ gridTemplateRows: "260px 260px 260px" }}>

                    {/* A: Partnership — col 1-2 / row 1 */}
                    <BentoCard
                        className="col-span-2 row-span-1"
                        background={<AvatarCircles />}
                    />

                    {/* B: Lanyard — col 3 / rows 1-2 */}
                    <BentoCard
                        name="Focused on latest digital innovations"
                        description="Full-stack expertise across the modern JS ecosystem."
                        Icon={Zap}
                        className="col-start-3 row-span-2"
                        background={<Lanyard position={[0, 0, 15]} fov={25} />}
                    />

                    {/* C: Globe / Timezones — col 1 / rows 2-3 */}
                    <BentoCard
                        className="col-start-1 row-span-2"
                        background={
                            <>
                                {/* Title at top */}
                                <div className="absolute top-5 left-5 right-5 z-20">
                                    <p className="text-sm font-semibold text-white leading-snug tracking-tight">I&apos;m highly adaptable<br />across global time zones</p>
                                </div>
                                <Globe className="top-10 scale-110" />
                                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(105,227,0,0.08),rgba(0,0,0,0))]" />
                                <div className="absolute bottom-6 left-5 flex items-center gap-1.5 z-20">
                                    <MapPin size={11} className="text-[#69E300]" />
                                    <span className="text-[11px] text-[#69E300] font-mono">REMOTE · India</span>
                                </div>
                            </>
                        }
                    />

                    {/* D: Orbiting Tech — col 2 / row 2 */}
                    <BentoCard
                        className="col-start-2 row-start-2"
                        background={<OrbitingBackground />}
                    />

                    {/* E: Projects — col 2-3 / row 3 */}
                    <BentoCard
                        name="Selected Works"
                        description="SaaS products, AI tools & full-stack builds — scroll to explore →"
                        Icon={Code2}
                        href="#"
                        cta="View all projects"
                        className="col-start-2 col-span-2 row-start-3"
                        background={<ProjectsBackground />}
                    />
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {[
                        { label: "Projects shipped", value: "24+", icon: <Layers size={15} /> },
                        { label: "Years building", value: "4+", icon: <Code2 size={15} /> },
                        { label: "Open-source PRs", value: "80+", icon: <GitBranch size={15} /> },
                        { label: "Happy clients", value: "12+", icon: <GlobeIcon size={15} /> },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 + i * 0.07 }}
                            className="p-5 rounded-2xl bg-[#0d0d0d] border border-white/6 hover:border-[#69E300]/25 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-2 text-[#69E300] mb-2">
                                {s.icon}
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{s.label}</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{s.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

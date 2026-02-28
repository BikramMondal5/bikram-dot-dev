"use client";

import { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import {
    Mail,
    MapPin,
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

/* -- CARD C — Dot Globe -- */
function DotGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const angleRef = useRef(0);

    useAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const W = canvas.width, H = canvas.height;
        const cx = W / 2, cy = H / 2;
        const R = Math.min(W, H) * 0.44;

        ctx.clearRect(0, 0, W, H);
        angleRef.current += 0.004;
        const rot = angleRef.current;

        const rows = 20;
        for (let lat = -rows; lat <= rows; lat++) {
            const phi = (lat / rows) * (Math.PI / 2);
            const y = R * Math.sin(phi);
            const r2 = Math.sqrt(R * R - y * y);
            const cols = Math.max(1, Math.floor(rows * Math.cos(phi) * 1.7));
            for (let col = 0; col < cols; col++) {
                const theta = (col / cols) * Math.PI * 2 + rot;
                const x = r2 * Math.cos(theta);
                const z = r2 * Math.sin(theta);
                const brightness = (z / R + 1) / 2;
                const size = 1.2 + brightness * 1.8;
                ctx.beginPath();
                ctx.arc(cx + x, cy - y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(105,227,0,${0.12 + brightness * 0.55})`;
                ctx.fill();
            }
        }

        const phi = (20 * Math.PI) / 180;
        const theta = (77 * Math.PI) / 180 + rot;
        const hx = cx + R * Math.cos(phi) * Math.cos(theta);
        const hy = cy - R * Math.sin(phi);
        const hz = R * Math.cos(phi) * Math.sin(theta);
        if (hz > 0) {
            const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.003);
            ctx.beginPath();
            ctx.arc(hx, hy, 5 + pulse * 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(105,227,0,${0.12 + pulse * 0.2})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(hx, hy, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#69E300";
            ctx.fill();
        }
    });

    return (
        <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="absolute inset-0 w-full h-full object-contain opacity-90"
        />
    );
}

/* -- CARD D — CTA pulsing rings -- */
function CtaBackground() {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-[#69E300]/20"
                    animate={{ scale: [0.6, 1.5], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, delay: i * 0.75, ease: "easeOut" }}
                    style={{ width: 110 * i, height: 110 * i }}
                />
            ))}
            <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full bg-[#69E300]/10 border border-[#69E300]/30 flex items-center justify-center"
            >
                <Mail className="w-6 h-6 text-[#69E300]" />
            </motion.div>
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
                        name="Partnership"
                        description="I prioritize client success, fostering open communication and transparent workflows throughout every project."
                        Icon={Users}
                        href="#"
                        cta="Work with me"
                        className="col-span-2 row-span-1"
                        background={<AvatarCircles />}
                    />

                    {/* B: Tech Stack — col 3 / rows 1-2 */}
                    <BentoCard
                        name="Focused on latest digital innovations"
                        description="Full-stack expertise across the modern JS ecosystem."
                        Icon={Zap}
                        className="col-start-3 row-span-2"
                        background={<TechScrollBackground />}
                    />

                    {/* C: Globe / Timezones — col 1 / rows 2-3 */}
                    <BentoCard
                        name="I'm highly adaptable across global time zones"
                        className="col-start-1 row-span-2"
                        background={
                            <>
                                <DotGlobe />
                                <div className="absolute bottom-27 left-6 flex flex-wrap gap-2 z-20">
                                    {[
                                        { flag: "🇬🇧", code: "GB UK" },
                                        { flag: "🇮🇳", code: "IN India" },
                                        { flag: "🇺🇸", code: "US USA" },
                                    ].map((z) => (
                                        <span
                                            key={z.code}
                                            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/6 border border-white/10 text-gray-300"
                                        >
                                            {z.flag} {z.code}
                                        </span>
                                    ))}
                                </div>
                                <div className="absolute bottom-20 left-6 flex items-center gap-1.5 z-20">
                                    <MapPin size={11} className="text-[#69E300]" />
                                    <span className="text-[11px] text-[#69E300] font-mono">REMOTE · India</span>
                                </div>
                            </>
                        }
                    />

                    {/* D: CTA Contact — col 2 / row 2 */}
                    <BentoCard
                        name="Let's innovate together"
                        description="Ready to bring your vision to life? Get in touch via email."
                        Icon={Mail}
                        href="mailto:hello@bikram.dev"
                        cta="hello@bikram.dev"
                        className="col-start-2 row-start-2"
                        background={<CtaBackground />}
                    />

                    {/* E: Projects — col 2-3 / row 3 */}
                    <BentoCard
                        name="Working on Rune Environment"
                        description="Things I'm doing — scroll to explore current builds →"
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

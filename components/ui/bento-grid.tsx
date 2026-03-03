"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* -- BentoGrid -------------------------------------------------- */
interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid w-full grid-cols-3 gap-4 auto-rows-[260px]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/* -- BentoCard -------------------------------------------------- */
interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
    name?: string;
    description?: string;
    background?: ReactNode;
    Icon?: React.ComponentType<{ className?: string }>;
    href?: string;
    cta?: string;
}

export function BentoCard({
    name,
    description,
    background,
    Icon,
    href,
    cta,
    className,
    ...props
}: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
                "group relative overflow-hidden rounded-2xl",
                "bg-[#0d0d0d] border border-white/6",
                "transition-all duration-500",
                "hover:shadow-[0_0_32px_8px_#69E30020,0_8px_60px_#69E30016]",
                className
            )}
            {...(props as ComponentPropsWithoutRef<typeof motion.div>)}
        >
            {/* subtle top glow on hover */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at 50% 0%, #69E3000d 0%, transparent 65%)" }}
            />

            {/* background layer */}
            <div className="absolute inset-0">{background}</div>

            {/* content pinned to bottom */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {Icon && (
                    <div className="mb-2 w-9 h-9 rounded-lg bg-[#69E300]/10 border border-[#69E300]/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#69E300]" />
                    </div>
                )}
                <h3 className="text-base font-semibold text-white mb-1 leading-snug">{name}</h3>
                {description && (
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{description}</p>
                )}
                {href && cta && (
                    <a
                        href={href}
                        className="pointer-events-auto inline-flex items-center gap-1 text-xs font-medium text-[#69E300] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        {cta} <ArrowRightIcon className="w-3 h-3" />
                    </a>
                )}
            </div>
        </motion.div>
    );
}

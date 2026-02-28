"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    /** Reverse scroll direction */
    reverse?: boolean;
    /** Pause animation on hover */
    pauseOnHover?: boolean;
    /** Vertical marquee */
    vertical?: boolean;
    /** Duration in seconds */
    duration?: number;
}

export function Marquee({
    className,
    children,
    reverse = false,
    pauseOnHover = false,
    vertical = false,
    duration = 30,
    ...props
}: MarqueeProps) {
    const axis = vertical ? "y" : "x";
    const from = reverse ? "-50%" : "0%";
    const to = reverse ? "0%" : "-50%";

    return (
        <div
            className={cn(
                "flex overflow-hidden",
                vertical ? "flex-col" : "flex-row",
                pauseOnHover && "[&:hover_[data-marquee]]:pause-animation",
                className
            )}
            {...props}
        >
            <motion.div
                data-marquee=""
                animate={{ [axis]: [from, to] }}
                transition={{
                    repeat: Infinity,
                    duration,
                    ease: "linear",
                }}
                className={cn(
                    "flex shrink-0 w-max",
                    vertical ? "flex-col" : "flex-row"
                )}
                style={pauseOnHover ? { animationPlayState: "running" } : undefined}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}

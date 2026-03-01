"use client";

import { cn } from "@/lib/utils";

interface VideoTextProps {
    src: string;
    children: React.ReactNode;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
}

/**
 * VideoText � renders children as a text "window" into a looping video.
 * Technique: white text on a black bg with mix-blend-mode:multiply �
 * black blocks the video, white lets the video show through the letters.
 */
export function VideoText({
    src,
    children,
    className,
    autoPlay = true,
    muted = true,
    loop = true,
}: VideoTextProps) {
    return (
        <div
            className={cn(
                "relative flex items-center justify-center overflow-hidden w-full h-full",
                className
            )}
            style={{ isolation: "isolate" }}
        >
            {/* Video fills the container */}
            <video
                src={src}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden
            />

            {/* Black mask with white text � multiply makes white=video, black=blocked */}
            <div
                className="relative z-10 w-full px-6"
                style={{ mixBlendMode: "multiply" }}
            >
                <div className="bg-black inline-block">
                    {children}
                </div>
            </div>
        </div>
    );
}

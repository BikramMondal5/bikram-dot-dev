"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface OrbitingCirclesProps {
    className?: string;
    children?: React.ReactNode;
    reverse?: boolean;
    duration?: number;
    /** Delay before the animation starts (seconds) */
    delay?: number;
    radius?: number;
    /** Icon container size in px */
    iconSize?: number;
    speed?: number;
}

export function OrbitingCircles({
    className,
    children,
    reverse,
    duration = 20,
    delay = 10,
    radius = 160,
    iconSize = 30,
    speed = 1,
}: OrbitingCirclesProps) {
    const calculatedDuration = duration / speed;
    const items = React.Children.toArray(children);
    const count = items.length;

    return (
        <>
            {items.map((child, index) => {
                const angle = (360 / count) * index;
                return (
                    <div
                        key={index}
                        style={
                            {
                                "--duration": calculatedDuration,
                                "--radius": radius,
                                "--delay": -delay - (calculatedDuration / count) * index,
                                "--angle": angle,
                                "--icon-size": `${iconSize}px`,
                            } as React.CSSProperties
                        }
                        className={cn(
                            "absolute flex size-(--icon-size) transform-gpu animate-orbit items-center justify-center rounded-full",
                            { "[animation-direction:reverse]": reverse },
                            className
                        )}
                    >
                        {child}
                    </div>
                );
            })}
        </>
    );
}

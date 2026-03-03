"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// #69E300 → rgb(105, 227, 0) → normalised [0.412, 0.890, 0]
const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => { },
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.18, 0.42, 0.01],   // dark green land dots
    markerColor: [0.412, 0.89, 0],   // #69E300 markers
    glowColor: [0.3, 0.65, 0.01],    // green atmospheric glow
    markers: [
        { location: [20.5937, 78.9629], size: 0.1 },  // India (home)
        { location: [51.5074, -0.1278], size: 0.06 }, // UK
        { location: [40.7128, -74.006], size: 0.07 }, // USA
        { location: [35.6762, 139.6503], size: 0.05 }, // Japan
        { location: [-33.8688, 151.2093], size: 0.05 }, // Australia
        { location: [48.8566, 2.3522], size: 0.05 },  // France
        { location: [1.3521, 103.8198], size: 0.04 }, // Singapore
    ],
};

export function Globe({
    className,
    config = GLOBE_CONFIG,
}: {
    className?: string;
    config?: COBEOptions;
}) {
    let phi = 0;
    let width = 0;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);

    const updatePointerInteraction = (value: number | null) => {
        pointerInteracting.current = value;
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value ? "grabbing" : "grab";
        }
    };

    const updateMovement = (clientX: number) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            phi = delta / 200;
        }
    };

    const onRender = useCallback(
        (state: Record<string, number>) => {
            if (!pointerInteracting.current) phi += 0.004;
            state.phi = phi + pointerInteractionMovement.current / 200;
            state.width = width * 2;
            state.height = width * 2;
        },
        [],
    );

    const onResize = () => {
        if (canvasRef.current) {
            width = canvasRef.current.offsetWidth;
        }
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvasRef.current!, {
            ...config,
            width: width * 2,
            height: width * 2,
            onRender,
        });

        setTimeout(() => {
            if (canvasRef.current) canvasRef.current.style.opacity = "1";
        });

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div
            className={cn(
                "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
                className,
            )}
        >
            <canvas
                ref={canvasRef}
                className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
                onPointerDown={(e) =>
                    updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
                }
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={(e) => updateMovement(e.clientX)}
                onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
            />
        </div>
    );
}

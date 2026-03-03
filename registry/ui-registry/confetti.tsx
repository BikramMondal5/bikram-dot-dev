"use client";

import confetti from "canvas-confetti";
import { useRef } from "react";

interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    options?: confetti.Options;
    children?: React.ReactNode;
}

export function ConfettiButton({ options, children, onClick, ...props }: ConfettiButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = buttonRef.current?.getBoundingClientRect();
        confetti({
            particleCount: 120,
            spread: 80,
            origin: {
                x: rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5,
                y: rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5,
            },
            colors: ["#69E300", "#ffffff", "#a3e635", "#4ade80", "#bbf451"],
            ...options,
        });
        onClick?.(e);
    };

    return (
        <button ref={buttonRef} onClick={handleClick} {...props}>
            {children}
        </button>
    );
}

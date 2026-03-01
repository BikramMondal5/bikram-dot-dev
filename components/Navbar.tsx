"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isPastHero, setIsPastHero] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if scrolled past hero section (viewport height)
            setIsPastHero(window.scrollY > window.innerHeight - 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isPastHero ? "bg-[#0A0A0A] shadow-lg" : "bg-[#0a0f1e]"
                }`}
        >
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center text-white font-bold text-xl">
                        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center mr-2.5">
                            <div className="w-4 h-4 bg-gradient-to-br from-[#69E300] to-[#4aaa00] rounded-full" />
                        </div>
                        bikram
                    </a>

                    {/* Navigation Links */}
                    <ul className="hidden md:flex items-center gap-8">
                        {["Home", "Dashboard", "Projects", "Agents", "Observability", "Security"].map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="text-white/80 hover:text-white font-medium transition-colors duration-200"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            className="text-white/80 hover:text-white hover:bg-transparent"
                        >
                            Login
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-white/80 hover:text-white hover:bg-transparent"
                        >
                            Register
                        </Button>
                        <Button
                            className="bg-[#69E300] text-black hover:bg-[#7fff00] font-semibold"
                        >
                            GhostWriter Agent
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

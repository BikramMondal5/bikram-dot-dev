"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isPastHero, setIsPastHero] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <a href="#home" className="flex items-center text-white font-bold text-lg sm:text-xl">
                        <img
                            src="/icons/reactz-logo.png"
                            alt="Logo"
                            className="w-7 h-7 sm:w-8 sm:h-8 mr-2"
                        />
                        <span className="hidden xs:inline">Bikram Mondal</span>
                        <span className="xs:hidden">Bikram</span>
                    </a>

                    {/* Navigation Links - Desktop */}
                    <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <li>
                            <a
                                href="#home"
                                className="text-white/80 hover:text-white font-medium transition-colors duration-200"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className="text-white/80 hover:text-white font-medium transition-colors duration-200"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#overview"
                                className="text-white/80 hover:text-white font-medium transition-colors duration-200"
                            >
                                Overview
                            </a>
                        </li>
                        <li>
                            <a
                                href="#projects"
                                className="text-white/80 hover:text-white font-medium transition-colors duration-200"
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="#testimonials"
                                className="text-white/80 hover:text-white font-medium transition-colors duration-200"
                            >
                                Testimonials
                            </a>
                        </li>
                    </ul>

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-3">
                        <a href="https://linktr.ee/BikramMondal5" target="_blank" rel="noopener noreferrer">
                            <Button
                                className="bg-[#69E300] text-black hover:bg-[#7fff00] font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                            >
                                <span className="hidden md:inline">Connect With Me</span>
                                <span className="md:hidden">Connect</span>
                            </Button>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-white p-2"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-white/10">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a
                                    href="#home"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-white/80 hover:text-white font-medium transition-colors duration-200 py-2"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-white/80 hover:text-white font-medium transition-colors duration-200 py-2"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#overview"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-white/80 hover:text-white font-medium transition-colors duration-200 py-2"
                                >
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#projects"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-white/80 hover:text-white font-medium transition-colors duration-200 py-2"
                                >
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#testimonials"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-white/80 hover:text-white font-medium transition-colors duration-200 py-2"
                                >
                                    Testimonials
                                </a>
                            </li>

                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

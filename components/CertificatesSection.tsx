"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Award, Trophy, Calendar, ExternalLink, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    skills: string[];
    imageUrl?: string;
    credentialUrl?: string;
    logo?: string;
}

const coursesCertificates: Certificate[] = [
    {
        id: "1",
        title: "Python Complete Course And Flask Framework with HTML Essentials",
        issuer: "Udemy",
        date: "July 2024",
        description: "Completed a Python course covering Flask Framework and HTML Essentials.",
        skills: ["Python", "Flask", "HTML"],
        imageUrl: "/certificates/python-course.jpg",
        credentialUrl: "#",
    },
    {
        id: "2",
        title: "R Programming - R Programming Language Beginners to Pro",
        issuer: "Udemy",
        date: "July 2024",
        description: "Completed a comprehensive R Programming course covering data analysis and visualization.",
        skills: ["R", "Data Analysis"],
        imageUrl: "/certificates/r-programming.jpg",
        credentialUrl: "#",
    },
    {
        id: "3",
        title: "Entrepreneurship Innovation & Design Thinking",
        issuer: "Udemy",
        date: "July 2024",
        description: "A course on entrepreneurship, leadership, innovation, and design thinking.",
        skills: ["Entrepreneurship", "Innovation"],
        imageUrl: "/certificates/entrepreneurship.jpg",
        credentialUrl: "#",
    },
    {
        id: "4",
        title: "Python Completion Certificate",
        issuer: "Udemy",
        date: "July 2024",
        description: "Completed Python course covering Flask Framework and HTML Essentials.",
        skills: ["Python"],
        imageUrl: "/certificates/python-completion.jpg",
        credentialUrl: "#",
    },
    {
        id: "5",
        title: "R Programming Completion Certificate",
        issuer: "Udemy",
        date: "July 2024",
        description: "Completed R Programming course covering data analysis and visualization.",
        skills: ["R"],
        imageUrl: "/certificates/r-completion.jpg",
        credentialUrl: "#",
    },
    {
        id: "6",
        title: "Web Development Bootcamp",
        issuer: "Udemy",
        date: "June 2024",
        description: "Comprehensive web development course covering modern technologies.",
        skills: ["HTML", "CSS", "JavaScript"],
        imageUrl: "/certificates/web-dev.jpg",
        credentialUrl: "#",
    },
    {
        id: "7",
        title: "Advanced JavaScript Course",
        issuer: "Udemy",
        date: "May 2024",
        description: "Deep dive into advanced JavaScript concepts and patterns.",
        skills: ["JavaScript", "ES6+"],
        imageUrl: "/certificates/js-advanced.jpg",
        credentialUrl: "#",
    },
    {
        id: "8",
        title: "React Complete Guide",
        issuer: "Udemy",
        date: "April 2024",
        description: "Master React from basics to advanced topics.",
        skills: ["React", "Redux"],
        imageUrl: "/certificates/react.jpg",
        credentialUrl: "#",
    },
];

const hackathonsCertificates: Certificate[] = [
    {
        id: "h1",
        title: "Data Visualization Engineering Bootcamp",
        issuer: "Forage (TATA)",
        date: "July 2024",
        description: "Completed a project on data visualization and engineering using Power BI.",
        skills: ["Power BI", "Data Visualization"],
        imageUrl: "/certificates/tata-forage.jpg",
        credentialUrl: "#",
    },
    {
        id: "h2",
        title: "Solutions Architecture Job Simulation",
        issuer: "Forage (AWS)",
        date: "July 2024",
        description: "Completed a project on designing and implementing solutions using AWS.",
        skills: ["AWS", "Architecture"],
        imageUrl: "/certificates/aws-forage.jpg",
        credentialUrl: "#",
    },
    {
        id: "h3",
        title: "Data Analytics and Visualization Job Simulation",
        issuer: "Accenture",
        date: "July 2024",
        description: "For the ACCENTURE Completed a project on data analysis and visualization using Python and Power BI.",
        skills: ["Python", "Power BI"],
        imageUrl: "/certificates/accenture.jpg",
        credentialUrl: "#",
    },
    {
        id: "h4",
        title: "Cloud Computing Hackathon Winner",
        issuer: "TechFest 2024",
        date: "June 2024",
        description: "First place in cloud computing solutions hackathon.",
        skills: ["Cloud", "AWS"],
        imageUrl: "/certificates/cloud-hack.jpg",
        credentialUrl: "#",
    },
    {
        id: "h5",
        title: "AI/ML Innovation Challenge",
        issuer: "DataHack 2024",
        date: "May 2024",
        description: "Participated in AI/ML innovation challenge.",
        skills: ["AI", "ML", "Python"],
        imageUrl: "/certificates/ai-hack.jpg",
        credentialUrl: "#",
    },
    {
        id: "h6",
        title: "Web3 Development Sprint",
        issuer: "Blockchain Summit",
        date: "April 2024",
        description: "Built decentralized applications in 48-hour hackathon.",
        skills: ["Web3", "Solidity"],
        imageUrl: "/certificates/web3-hack.jpg",
        credentialUrl: "#",
    },
    {
        id: "h7",
        title: "Mobile App Development Challenge",
        issuer: "AppFest 2024",
        date: "March 2024",
        description: "Created innovative mobile solutions.",
        skills: ["React Native", "Mobile"],
        imageUrl: "/certificates/mobile-hack.jpg",
        credentialUrl: "#",
    },
];

export default function CertificatesSection() {
    const [activeTab, setActiveTab] = useState<"courses" | "hackathons">("courses");
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [showAllHackathons, setShowAllHackathons] = useState(false);

    const currentCertificates = activeTab === "courses" ? coursesCertificates : hackathonsCertificates;
    const showAll = activeTab === "courses" ? showAllCourses : showAllHackathons;
    const setShowAll = activeTab === "courses" ? setShowAllCourses : setShowAllHackathons;

    // Show max 6 certificates initially
    const displayedCertificates = showAll ? currentCertificates : currentCertificates.slice(0, 6);
    const hasMore = currentCertificates.length > 6;

    return (
        <section className="relative py-20 px-4 bg-[#0a0a0a]">
            <div className="container mx-auto max-w-7xl">
                <SectionHeader
                    label="ACHIEVEMENTS"
                    title={
                        <>
                            My <span className="text-[#69E300]">Certificates & Achievements</span>
                        </>
                    }
                    subtitle="Validated expertise through industry-recognized certifications and continuous skill development."
                    icon={<Award className="w-4 h-4" />}
                />

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab("courses")}
                        className={`
                            px-8 py-3 rounded-full font-semibold transition-all duration-300
                            ${activeTab === "courses"
                                ? "bg-[#69E300] text-black"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                            }
                        `}
                    >
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Courses
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("hackathons")}
                        className={`
                            px-8 py-3 rounded-full font-semibold transition-all duration-300
                            ${activeTab === "hackathons"
                                ? "bg-[#69E300] text-black"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                            }
                        `}
                    >
                        <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Hackathons
                        </div>
                    </button>
                </div>

                {/* Certificates Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedCertificates.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#69E300]/50 transition-all duration-300 overflow-hidden h-[400px] cursor-pointer">
                                        {/* Certificate Image - Top Half Visible */}
                                        <div className="relative h-full overflow-hidden">
                                            {cert.imageUrl ? (
                                                <div className="relative h-full">
                                                    {/* The certificate image - positioned to show top portion */}
                                                    <div className="absolute inset-0">
                                                        <Image
                                                            src={cert.imageUrl}
                                                            alt={cert.title}
                                                            fill
                                                            className="object-cover object-top"
                                                            style={{ objectPosition: 'center 20%' }}
                                                        />
                                                    </div>

                                                    {/* Gradient fade at bottom to hide certificate details */}
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1e] pointer-events-none" />

                                                    {/* Hover overlay */}
                                                    <div className="absolute inset-0 bg-[#69E300]/0 group-hover:bg-[#69E300]/10 transition-all duration-300" />

                                                    {/* Info Badge at Top */}
                                                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                                                        <div className="flex items-center gap-2 px-3 py-2 bg-black/70 backdrop-blur-md rounded-lg border border-white/10">
                                                            {activeTab === "courses" ? (
                                                                <Award className="w-4 h-4 text-[#69E300]" />
                                                            ) : (
                                                                <Trophy className="w-4 h-4 text-[#69E300]" />
                                                            )}
                                                            <span className="text-xs font-semibold text-white">
                                                                {cert.issuer}
                                                            </span>
                                                        </div>

                                                        {cert.credentialUrl && (
                                                            <a
                                                                href={cert.credentialUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-2 bg-[#69E300] hover:bg-[#69E300]/80 rounded-lg transition-all duration-300 group/link"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <ExternalLink className="w-4 h-4 text-black" />
                                                            </a>
                                                        )}
                                                    </div>

                                                    {/* Info at Bottom */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                                        <div className="space-y-3">
                                                            <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 drop-shadow-lg">
                                                                {cert.title}
                                                            </h3>

                                                            <div className="flex items-center gap-2 text-sm text-gray-200">
                                                                <Calendar className="w-4 h-4" />
                                                                <span className="drop-shadow-lg">{cert.date}</span>
                                                            </div>

                                                            {/* Skills */}
                                                            <div className="flex flex-wrap gap-2">
                                                                {cert.skills.slice(0, 3).map((skill, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="px-3 py-1 text-xs font-medium bg-black/70 backdrop-blur-md text-[#69E300] rounded-full border border-[#69E300]/30"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Fallback if no image provided
                                                <div className="relative p-6 space-y-4 h-full flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="h-8 w-8 rounded-lg bg-[#69E300]/10 flex items-center justify-center">
                                                                {activeTab === "courses" ? (
                                                                    <Award className="w-4 h-4 text-[#69E300]" />
                                                                ) : (
                                                                    <Trophy className="w-4 h-4 text-[#69E300]" />
                                                                )}
                                                            </div>
                                                            <span className="text-sm font-semibold text-[#69E300]">
                                                                {cert.issuer}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-white leading-tight">
                                                            {cert.title}
                                                        </h3>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{cert.date}</span>
                                                        </div>

                                                        <p className="text-sm text-gray-300 line-clamp-3">
                                                            {cert.description}
                                                        </p>

                                                        <div className="flex flex-wrap gap-2">
                                                            {cert.skills.map((skill, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-3 py-1 text-xs font-medium bg-[#69E300]/10 text-[#69E300] rounded-full border border-[#69E300]/20"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Show More Button */}
                        {hasMore && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="flex justify-center mt-12"
                            >
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="group px-8 py-4 bg-gradient-to-r from-[#69E300]/10 to-[#69E300]/5 hover:from-[#69E300]/20 hover:to-[#69E300]/10 border border-[#69E300]/30 hover:border-[#69E300]/50 rounded-full font-semibold text-[#69E300] transition-all duration-300 flex items-center gap-3 shadow-lg shadow-[#69E300]/10"
                                >
                                    <span>
                                        {showAll
                                            ? "Show Less"
                                            : `Show All ${currentCertificates.length} Certificates`
                                        }
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${showAll ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

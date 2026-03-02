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
        title: "Udemy Python Master Course",
        issuer: "Udemy",
        date: "2024",
        description: "Completed Python Master Course covering comprehensive Python programming.",
        skills: ["Python", "Programming"],
        imageUrl: "/certificates/Udemy Python Master Course_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "2",
        title: "Complete R Programming",
        issuer: "Udemy",
        date: "2024",
        description: "Completed comprehensive R Programming course covering data analysis.",
        skills: ["R", "Data Analysis"],
        imageUrl: "/certificates/Udemy Complete R Programming_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "3",
        title: "Javascript Master Course",
        issuer: "Udemy",
        date: "2024",
        description: "Advanced JavaScript programming course.",
        skills: ["JavaScript", "Web Development"],
        imageUrl: "/certificates/Udemy Javascript Master Course_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "4",
        title: "React Udemy Course",
        issuer: "Udemy",
        date: "2024",
        description: "Master React from basics to advanced topics.",
        skills: ["React", "Frontend"],
        imageUrl: "/certificates/React-Udemy-Course_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "5",
        title: "Innovation Certification - Advanced",
        issuer: "Innovation Program",
        date: "2024",
        description: "Advanced innovation and design thinking certification.",
        skills: ["Innovation", "Design Thinking"],
        imageUrl: "/certificates/Innovation-Certification-Advanced.jpg",
        credentialUrl: "#",
    },
    {
        id: "6",
        title: "Innovation Certification - Foundation",
        issuer: "Innovation Program",
        date: "2024",
        description: "Foundation level innovation certification.",
        skills: ["Innovation", "Strategy"],
        imageUrl: "/certificates/Innovation-Certification-Foundation.jpg",
        credentialUrl: "#",
    },
    {
        id: "7",
        title: "Oracle 2025 Gen AI Professional",
        issuer: "Oracle",
        date: "2025",
        description: "Oracle Gen AI Professional certification.",
        skills: ["AI", "Oracle", "GenAI"],
        imageUrl: "/certificates/Oracle 2025 Gen AI Professional_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "8",
        title: "GenAI 101 Challenge",
        issuer: "AI Learning Platform",
        date: "2024",
        description: "Completed GenAI 101 Challenge.",
        skills: ["GenAI", "AI"],
        imageUrl: "/certificates/genAI-101-challenge_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "9",
        title: "30 Days DSA Challenge",
        issuer: "Coding Platform",
        date: "2024",
        description: "Completed 30 Days Data Structures and Algorithms Challenge.",
        skills: ["DSA", "Algorithms"],
        imageUrl: "/certificates/30-Days-DSA-Challege_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "10",
        title: "Two-Day Workshop on AI and Industry 4.0",
        issuer: "Workshop",
        date: "2024",
        description: "Workshop on AI and Industry 4.0 technologies.",
        skills: ["AI", "Industry 4.0"],
        imageUrl: "/certificates/Two-Day Workshop on AI and Industry 4.0.jpg",
        credentialUrl: "#",
    },
];

const hackathonsCertificates: Certificate[] = [
    {
        id: "h1",
        title: "AWS Building AI Agents",
        issuer: "AWS",
        date: "2024",
        description: "Built AI agents using AWS services.",
        skills: ["AWS", "AI Agents"],
        imageUrl: "/certificates/AWS-Building-AI-Agents.png",
        credentialUrl: "#",
    },
    {
        id: "h2",
        title: "Mastering RAG with AWS",
        issuer: "AWS",
        date: "2024",
        description: "Mastered Retrieval-Augmented Generation with AWS.",
        skills: ["AWS", "RAG", "AI"],
        imageUrl: "/certificates/Mastering-RAG-with-AWS.png",
        credentialUrl: "#",
    },
    {
        id: "h3",
        title: "Serverless Image Editing App",
        issuer: "AWS",
        date: "2024",
        description: "Built serverless image editing application.",
        skills: ["Serverless", "AWS"],
        imageUrl: "/certificates/serverless-image-editing-app.png",
        credentialUrl: "#",
    },
    {
        id: "h4",
        title: "Google Solution Challenge",
        issuer: "Google",
        date: "2024",
        description: "Participated in Google Solution Challenge.",
        skills: ["Problem Solving", "Google Cloud"],
        imageUrl: "/certificates/Google-Solution-Challenge.png",
        credentialUrl: "#",
    },
    {
        id: "h5",
        title: "Digital Dominators",
        issuer: "Hackathon",
        date: "2024",
        description: "Digital Dominators hackathon participation.",
        skills: ["Development", "Innovation"],
        imageUrl: "/certificates/Digital Dominators - BIKRAM MONDAL (1)_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "h6",
        title: "EIBS 2.0 IIT KGP",
        issuer: "IIT Kharagpur",
        date: "2024",
        description: "Participated in EIBS 2.0 at IIT Kharagpur.",
        skills: ["Entrepreneurship", "Innovation"],
        imageUrl: "/certificates/EIBS2.0-IIT-KGP_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "h7",
        title: "ISRO Hack2Skill",
        issuer: "ISRO",
        date: "2024",
        description: "ISRO Hack2Skill challenge participation.",
        skills: ["Space Tech", "Innovation"],
        imageUrl: "/certificates/ISRO-Hack2skill-Certificate.png",
        credentialUrl: "#",
    },
    {
        id: "h8",
        title: "Azure AI Workshop",
        issuer: "Microsoft Azure",
        date: "2024",
        description: "Azure AI Workshop certification.",
        skills: ["Azure", "AI"],
        imageUrl: "/certificates/Azure-AI-workshop_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "h9",
        title: "OSCI Participation",
        issuer: "Open Source",
        date: "2024",
        description: "Open Source Contribution Initiative participation.",
        skills: ["Open Source", "Contribution"],
        imageUrl: "/certificates/OSCI-particiaption-certoficate_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "h10",
        title: "Put On Your Computing Cap",
        issuer: "Computing Challenge",
        date: "2024",
        description: "Computing challenge participation.",
        skills: ["Computing", "Problem Solving"],
        imageUrl: "/certificates/Put-On-Your-Computing-Cap_page-0001.jpg",
        credentialUrl: "#",
    },
    {
        id: "h11",
        title: "UDAAN Program",
        issuer: "UDAAN",
        date: "2024",
        description: "UDAAN program participation.",
        skills: ["Development", "Learning"],
        imageUrl: "/certificates/UDAAN.jpeg",
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
                                    <Card className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#69E300]/50 transition-all duration-300 overflow-hidden h-[420px] cursor-pointer flex flex-col rounded-2xl">
                                        {cert.imageUrl ? (
                                            <>
                                                {/* Top Half - Certificate Image */}
                                                <div className="relative h-1/2 overflow-hidden rounded-t-2xl">
                                                    <Image
                                                        src={cert.imageUrl}
                                                        alt={cert.title}
                                                        fill
                                                        className="object-cover"
                                                        style={{ objectPosition: 'center top' }}
                                                    />
                                                    {/* Hover overlay */}
                                                    <div className="absolute inset-0 bg-[#69E300]/0 group-hover:bg-[#69E300]/10 transition-all duration-300" />

                                                    {/* Issuer Badge */}
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
                                                </div>

                                                {/* Bottom Half - Details Only (No Image) */}
                                                <div className="h-1/2 bg-[#0a0a0a] p-6 flex flex-col justify-between">
                                                    <div className="space-y-3">
                                                        <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                                                            {cert.title}
                                                        </h3>

                                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{cert.date}</span>
                                                        </div>

                                                        <p className="text-sm text-gray-400 line-clamp-2">
                                                            {cert.description}
                                                        </p>
                                                    </div>

                                                    {/* Skills */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {cert.skills.slice(0, 3).map((skill, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-3 py-1 text-xs font-medium bg-[#69E300]/10 text-[#69E300] rounded-full border border-[#69E300]/30"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
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

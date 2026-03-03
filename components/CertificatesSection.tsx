"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Award, Trophy, Calendar, ExternalLink, ChevronDown, Download, Eye, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        id: "2",
        title: "AWS Building AI Agents",
        issuer: "AWS",
        date: "2024",
        description: "Built AI agents using AWS services.",
        skills: ["AWS", "AI Agents"],
        imageUrl: "/certificates/AWS-Building-AI-Agents.png",
        credentialUrl: "#",
    },
    {
        id: "3",
        title: "Azure AI Workshop",
        issuer: "Microsoft Azure",
        date: "2024",
        description: "Azure AI Workshop certification.",
        skills: ["Azure", "AI"],
        imageUrl: "/certificates/Azure-AI-workshop.jpg",
        credentialUrl: "#",
    },
    {
        id: "4",
        title: "Mastering RAG with AWS",
        issuer: "AWS",
        date: "2024",
        description: "Mastered Retrieval-Augmented Generation with AWS.",
        skills: ["AWS", "RAG", "AI"],
        imageUrl: "/certificates/Mastering-RAG-with-AWS.png",
        credentialUrl: "#",
    },
    {
        id: "5",
        title: "Oracle 2025 Gen AI Professional",
        issuer: "Oracle",
        date: "2025",
        description: "Oracle Gen AI Professional certification.",
        skills: ["AI", "Oracle", "GenAI"],
        imageUrl: "/certificates/Oracle 2025 Gen AI Professional.jpg",
        credentialUrl: "#",
    },
    {
        id: "6",
        title: "Put On Your Computing Cap",
        issuer: "Computing Challenge",
        date: "2024",
        description: "Computing challenge participation.",
        skills: ["Computing", "Problem Solving"],
        imageUrl: "/certificates/Put-On-Your-Computing-Cap.jpg",
        credentialUrl: "#",
    },
    {
        id: "7",
        title: "React Udemy Course",
        issuer: "Udemy",
        date: "2024",
        description: "Master React from basics to advanced topics.",
        skills: ["React", "Frontend"],
        imageUrl: "/certificates/React-Udemy-Course.jpg",
        credentialUrl: "#",
    },
    {
        id: "8",
        title: "Serverless Image Editing App",
        issuer: "AWS",
        date: "2024",
        description: "Built serverless image editing application.",
        skills: ["Serverless", "AWS"],
        imageUrl: "/certificates/serverless-image-editing-app.png",
        credentialUrl: "#",
    },
    {
        id: "9",
        title: "Two-Day Workshop on AI and Industry 4.0",
        issuer: "Workshop",
        date: "2024",
        description: "Workshop on AI and Industry 4.0 technologies.",
        skills: ["AI", "Industry 4.0"],
        imageUrl: "/certificates/Two-Day Workshop on AI and Industry 4.0.jpg",
        credentialUrl: "#",
    },
    {
        id: "10",
        title: "Complete R Programming",
        issuer: "Udemy",
        date: "2024",
        description: "Completed comprehensive R Programming course covering data analysis.",
        skills: ["R", "Data Analysis"],
        imageUrl: "/certificates/Udemy Complete R Programming.jpg",
        credentialUrl: "#",
    },
    {
        id: "11",
        title: "Javascript Master Course",
        issuer: "Udemy",
        date: "2024",
        description: "Advanced JavaScript programming course.",
        skills: ["JavaScript", "Web Development"],
        imageUrl: "/certificates/Udemy Javascript Master Course.jpg",
        credentialUrl: "#",
    },
    {
        id: "12",
        title: "Udemy Python Master Course",
        issuer: "Udemy",
        date: "2024",
        description: "Completed Python Master Course covering comprehensive Python programming.",
        skills: ["Python", "Programming"],
        imageUrl: "/certificates/Udemy Python Master Course.jpg",
        credentialUrl: "#",
    },
    {
        id: "1",
        title: "30 Days DSA Challenge",
        issuer: "Coding Platform",
        date: "2024",
        description: "Completed 30 Days Data Structures and Algorithms Challenge.",
        skills: ["DSA", "Algorithms"],
        imageUrl: "/certificates/30-Days-DSA-Challege.jpg",
        credentialUrl: "#",
    },
];

const hackathonsCertificates: Certificate[] = [
    {
        id: "h1",
        title: "EIBS 2.0 IIT KGP",
        issuer: "IIT Kharagpur",
        date: "2024",
        description: "Finalist – EIBS 2.0, IIT Kharagpur.",
        skills: ["Entrepreneurship", "Innovation"],
        imageUrl: "/certificates/EIBS2.0-IIT-KGP.jpg",
        credentialUrl: "#",
    },
    {
        id: "h2",
        title: "GenAI 101 Challenge",
        issuer: "AI Learning Platform",
        date: "2024",
        description: "Winner of the GenAI 101 Challenge",
        skills: ["GenAI", "AI"],
        imageUrl: "/certificates/genAI-101-challenge.jpg",
        credentialUrl: "#",
    },
    {
        id: "h3",
        title: "Google Solution Challenge",
        issuer: "Google",
        date: "2024",
        description: "Participated in Google Solution Challenge.",
        skills: ["Problem Solving", "Google Cloud"],
        imageUrl: "/certificates/Google-Solution-Challenge.png",
        credentialUrl: "#",
    },
    {
        id: "h4",
        title: "ISRO Hack2Skill",
        issuer: "ISRO",
        date: "2024",
        description: "ISRO Hack2Skill challenge participation.",
        skills: ["Space Tech", "Innovation"],
        imageUrl: "/certificates/ISRO-Hack2skill-Certificate.png",
        credentialUrl: "#",
    },
    {
        id: "h5",
        title: "SMART BENGAL HACKATHON",
        issuer: "SBHS",
        date: "2024",
        description: "Finalist – SMART BENGAL HACKATHON",
        skills: ["Leadership", "Competition"],
        imageUrl: "/certificates/SBHS_S031.jpg",
        credentialUrl: "#",
    },
];

const extracurricularCertificates: Certificate[] = [
    {
        id: "e1",
        title: "Innovation Certification - Advanced",
        issuer: "Innovation Program",
        date: "2024",
        description: "Advanced innovation and design thinking certification.",
        skills: ["Innovation", "Design Thinking"],
        imageUrl: "/certificates/Innovation-Certification-Advanced.jpg",
        credentialUrl: "#",
    },
    {
        id: "e2",
        title: "Innovation Certification - Foundation",
        issuer: "Innovation Program",
        date: "2024",
        description: "Foundation level innovation certification.",
        skills: ["Innovation", "Strategy"],
        imageUrl: "/certificates/Innovation-Certification-Foundation.jpg",
        credentialUrl: "#",
    },
    {
        id: "e3",
        title: "OSCI Participation",
        issuer: "Open Source",
        date: "2024",
        description: "Open Source Contribution Initiative participation.",
        skills: ["Open Source", "Contribution"],
        imageUrl: "/certificates/OSCI-particiaption-certification.jpg",
        credentialUrl: "#",
    },
    {
        id: "e4",
        title: "UDAAN By AICTE",
        issuer: "UDAAN",
        date: "2024",
        description: "Participated in UDAAN By AICTE.",
        skills: ["Development", "Learning"],
        imageUrl: "/certificates/UDAAN.jpeg",
        credentialUrl: "#",
    },
];

export default function CertificatesSection() {
    const [activeTab, setActiveTab] = useState<"skills" | "hackathons" | "extracurricular">("skills");
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllHackathons, setShowAllHackathons] = useState(false);
    const [showAllExtracurricular, setShowAllExtracurricular] = useState(false);

    const currentCertificates =
        activeTab === "skills" ? coursesCertificates :
            activeTab === "hackathons" ? hackathonsCertificates :
                extracurricularCertificates;

    const showAll =
        activeTab === "skills" ? showAllSkills :
            activeTab === "hackathons" ? showAllHackathons :
                showAllExtracurricular;

    const setShowAll =
        activeTab === "skills" ? setShowAllSkills :
            activeTab === "hackathons" ? setShowAllHackathons :
                setShowAllExtracurricular;

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
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 px-4">
                    <button
                        onClick={() => setActiveTab("skills")}
                        className={`
                            px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base
                            ${activeTab === "skills"
                                ? "bg-[#69E300] text-black"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                            }
                        `}
                    >
                        <div className="flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">Skills</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("hackathons")}
                        className={`
                            px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base
                            ${activeTab === "hackathons"
                                ? "bg-[#69E300] text-black"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                            }
                        `}
                    >
                        <div className="flex items-center gap-2">
                            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">Hackathons</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("extracurricular")}
                        className={`
                            px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base
                            ${activeTab === "extracurricular"
                                ? "bg-[#69E300] text-black"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                            }
                        `}
                    >
                        <div className="flex items-center gap-2">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">Extracurricular</span>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {displayedCertificates.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Tilt
                                        tiltMaxAngleX={15}
                                        tiltMaxAngleY={15}
                                        scale={1.02}
                                        transitionSpeed={450}
                                        className="h-[420px]"
                                    >
                                        <Card className="group relative bg-[#0F172A] border border-[#1E293B] transition-all duration-500 overflow-hidden h-full cursor-pointer flex flex-col rounded-3xl">
                                            {cert.imageUrl ? (
                                                <>
                                                    {/* Top Half - Certificate Image */}
                                                    <div className="relative h-1/2 overflow-hidden rounded-t-3xl">
                                                        <Image
                                                            src={cert.imageUrl}
                                                            alt={cert.title}
                                                            fill
                                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                            style={{ objectPosition: 'center top' }}
                                                        />
                                                    </div>

                                                    {/* Bottom Half - Details Only (No Image) */}
                                                    <div className="h-1/2 bg-[#0F172A] p-6 flex flex-col justify-between">
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

                                                        {/* Action Buttons */}
                                                        <div className="flex gap-3">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 bg-transparent border-[#69E300]/30 text-[#69E300] hover:bg-[#69E300]/10 hover:text-[#69E300]"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    window.open(cert.imageUrl, '_blank');
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View in Full
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 bg-transparent border-[#69E300]/30 text-[#69E300] hover:bg-[#69E300]/10 hover:text-[#69E300]"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    const link = document.createElement('a');
                                                                    link.href = cert.imageUrl || '';
                                                                    link.download = `${cert.title}.jpg`;
                                                                    link.click();
                                                                }}
                                                            >
                                                                <Download className="w-4 h-4 mr-2" />
                                                                Download
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                // Fallback if no image provided
                                                <div className="relative p-6 space-y-4 h-full flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="h-8 w-8 rounded-lg bg-[#69E300]/10 flex items-center justify-center">
                                                                {activeTab === "skills" ? (
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
                                    </Tilt>
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
                                            : "Show All"
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

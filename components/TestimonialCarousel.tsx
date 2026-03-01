"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, User, Quote, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Default testimonial data
const defaultTestimonials = [
    {
        name: "Arijit Sen",
        country: "Senior",
        type: "Senior",
        avatar: "https://i.pravatar.cc/150?u=arijit",
        feedback:
            "Bikram has a strong problem-solving mindset and a genuine curiosity for learning. During our collaboration, he consistently took ownership of challenging tasks and delivered clean, well-structured solutions. His dedication and growth mindset really stand out.",
        rating: 5,
    },
    {
        name: "Rohit Sharma",
        country: "Hackathon Teammate",
        type: "Teammate",
        avatar: "https://i.pravatar.cc/150?u=rohit",
        feedback:
            "Working with Bikram during the hackathon was a great experience. He handled both frontend and backend responsibilities smoothly and always focused on performance and user experience. His ability to stay calm under pressure helped our team a lot.",
        rating: 5,
    },
    {
        name: "Ananya Das",
        country: "Hackathon Teammate",
        type: "Teammate",
        avatar: "https://i.pravatar.cc/150?u=ananya",
        feedback:
            "Bikram has a deep interest in AI and system design. I was impressed by how he integrates machine learning concepts into real-world applications instead of just building basic projects. He always aims to build something meaningful.",
        rating: 5,
    },
    {
        name: "Sayan Roy",
        country: "Project Partner",
        type: "Partner",
        avatar: "https://i.pravatar.cc/150?s=sayan",
        feedback:
            "One thing I admire about Bikram is his collaborative nature. He communicates clearly, listens to feedback, and actively contributes ideas. He doesn’t just write code — he thinks about architecture and scalability.",
        rating: 5,
    },
    {
        name: "Priyanka Mukherjee",
        country: "Senior",
        type: "Senior",
        avatar: "https://i.pravatar.cc/150?u=priyanka",
        feedback:
            "Bikram is extremely consistent and disciplined in his work. Whenever we worked together, he delivered on time and ensured everything was properly tested. His attention to detail makes his projects feel polished and professional.",
        rating: 5,
    },
    {
        name: "Amit Verma",
        country: "Project Partner",
        type: "Partner",
        avatar: "https://i.pravatar.cc/150?u=amit",
        feedback:
            "Bikram has a great sense of UI and interaction design. His projects aren’t just functional — they feel modern and well-crafted. His experiments with animations and interactive components show strong creativity and technical depth.",
        rating: 5,
    },
]

const people = [
    {
        id: 1,
        name: "John Doe",
        designation: "Software Engineer",
        image:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
        id: 2,
        name: "Robert Johnson",
        designation: "Product Manager",
        image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
        id: 3,
        name: "Jane Smith",
        designation: "Data Scientist",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
        id: 4,
        name: "Emily Davis",
        designation: "UX Designer",
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
        id: 5,
        name: "Tyler Durden",
        designation: "Soap Developer",
        image:
            "https://images.unsplash.com/photo-1472099644761-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
        id: 6,
        name: "Dora",
        designation: "The Explorer",
        image:
            "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
]

// Simple AnimatedTooltip component
function AnimatedTooltip({ items }: { items: typeof people }) {
    return (
        <div className="flex flex-row items-center">
            {items.map((item, idx) => (
                <div key={item.id} className="relative group -ml-4 first:ml-0" style={{ zIndex: items.length - idx }}>
                    <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        onError={(e) => (e.currentTarget.src = "/avatar.jfif")}
                        className="w-10 h-10 rounded-full border-2 border-background object-cover transition-transform group-hover:scale-110"
                    />
                </div>
            ))}
        </div>
    )
}

export default function TestimonialCarousel() {
    const [testimonials] = useState(defaultTestimonials)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        feedback: "",
        rating: 5,
    })
    const allTestimonials = [...testimonials]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Testimonial submitted:", formData)
        // Show success message
        alert("Thank you for sharing your experience! Your testimonial has been submitted.")
        // Reset form
        setFormData({ name: "", role: "", feedback: "", rating: 5 })
        setIsModalOpen(false)
    }

    return (
        <section id="testimonials" className="relative py-24 bg-[#0A0A0A] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-16 text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#69E300]/20 bg-[#69E300]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#69E300]">
                    <MessageSquare className="w-4 h-4 text-[#69E300]" />
                    <span>Testimonials</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                    What People <span className="text-[#69E300]">Thinks About Me</span>
                </h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto text-pretty">
                    Insights and feedback from peers, teammates, and mentors I’ve had the opportunity to collaborate with.
                </p>

                {/* Avatars Section */}
                <div className="flex flex-col items-center gap-4 mt-8">
                    <div className="flex flex-row items-center justify-center w-full">
                        <AnimatedTooltip items={people} />
                    </div>

                </div>
            </div>

            <div className="relative overflow-hidden w-full py-4 mb-2">
                {/* Gradients for fade effect on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

                <div
                    className="flex animate-marquee"
                    style={{
                        width: "max-content",
                    }}
                >
                    {allTestimonials.map((testimonial, index) => (
                        <div key={`first-${index}`} className="px-4 flex-shrink-0" style={{ width: "450px" }}>
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}

                    {allTestimonials.map((testimonial, index) => (
                        <div key={`second-${index}`} className="px-4 flex-shrink-0" style={{ width: "450px" }}>
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="h-14 px-8 rounded-full bg-[#69E300] text-black hover:bg-[#69E300]/90 font-bold text-base shadow-xl shadow-[#69E300]/5"
                            >
                                Share Your Experience With Me
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px] bg-[#0A0A0A] border-white/10">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                                    <MessageSquare className="w-6 h-6 text-[#69E300]" />
                                    Share Your Experience
                                </DialogTitle>
                                <DialogDescription className="text-white/60">
                                    I'd love to hear about your experience working with me. Your feedback helps me grow.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-3">
                                <div className="space-y-2">
                                    <Label className="text-white">
                                        Rating <span className="text-[#69E300]">*</span>
                                    </Label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`h-8 w-8 cursor-pointer ${star <= formData.rating
                                                        ? "fill-[#69E300] text-[#69E300]"
                                                        : "fill-none text-white/20 hover:text-white/40"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white">
                                        Your Name <span className="text-[#69E300]">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#69E300]/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-white">
                                        Your Role / Relationship <span className="text-[#69E300]">*</span>
                                    </Label>
                                    <Input
                                        id="role"
                                        placeholder="e.g., Hackathon Teammate, Senior, Project Partner"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#69E300]/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="feedback" className="text-white">
                                        Your Feedback <span className="text-[#69E300]">*</span>
                                    </Label>
                                    <Textarea
                                        id="feedback"
                                        placeholder="Share your experience working with me..."
                                        value={formData.feedback}
                                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                                        required
                                        rows={3}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#69E300]/50 resize-none"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-full bg-[#69E300] text-black hover:bg-[#69E300]/90 font-bold text-base shadow-xl shadow-[#69E300]/20 flex items-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Submit Testimonial
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
    return (
        <Card
            className="relative group transition-all duration-500 h-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#69E300]/20 rounded-3xl overflow-hidden backdrop-blur-sm"
            style={{ minHeight: "280px" }}
        >
            <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-[#69E300]/10 transition-colors">
                <Quote className="w-12 h-12 rotate-180" />
            </div>

            <CardContent className="p-8 flex flex-col h-full relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                    {testimonial.avatar ? (
                        <div className="relative">
                            <img
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-14 h-14 rounded-2xl border border-white/10 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#69E300] rounded-full border-2 border-[#0a0809]" />
                        </div>
                    ) : (
                        <div className="w-14 h-14 rounded-2xl bg-[#69E300]/10 flex items-center justify-center border border-[#69E300]/20">
                            <User className="w-7 h-7 text-[#69E300]" />
                        </div>
                    )}
                    <div>
                        <h4 className="font-bold text-white text-lg tracking-tight">{testimonial.name}</h4>
                        <p className="text-xs font-medium uppercase tracking-widest text-[#69E300]/70">{testimonial.country}</p>
                    </div>
                </div>

                <p className="text-white/60 text-base leading-relaxed text-pretty flex-grow mb-6 group-hover:text-white/90 transition-colors italic">
                    &quot;{testimonial.feedback}&quot;
                </p>

                <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/5">
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`h-4 w-4 ${star <= (testimonial.rating || 5) ? "fill-[#69E300] text-[#69E300]" : "fill-none text-white/10"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/5 text-white/40 border border-white/10 group-hover:border-[#69E300]/30 group-hover:text-[#69E300] transition-all">
                        {testimonial.type}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

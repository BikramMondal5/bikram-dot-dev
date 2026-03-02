"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, User, Quote, MessageSquare, Send, Upload, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import Image from "next/image"
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

const avatars = [
    {
        imageUrl: "https://avatars.githubusercontent.com/u/16860528",
        profileUrl: "https://github.com/dillionverma",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/20110627",
        profileUrl: "https://github.com/tomonarifeehan",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/106103625",
        profileUrl: "https://github.com/BankkRoll",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/59228569",
        profileUrl: "https://github.com/safethecode",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/59442788",
        profileUrl: "https://github.com/sanjay-mali",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/89768406",
        profileUrl: "https://github.com/itsarghyadas",
    },
]

// Predefined avatar options
const predefinedAvatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=7",
    "https://i.pravatar.cc/150?u=ananya",
    "https://i.pravatar.cc/150?img=9",
    "https://i.pravatar.cc/150?img=12",
]

export default function TestimonialCarousel() {
    const [testimonials, setTestimonials] = useState(defaultTestimonials)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null)
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
    const [customImage, setCustomImage] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        feedback: "",
        rating: 5,
        avatar: null as string | null,
    })

    // Seed database and fetch testimonials on mount
    useEffect(() => {
        const initializeTestimonials = async () => {
            try {
                setIsLoading(true)

                // First, seed the database with default testimonials if empty
                await fetch('/api/testimonials/seed', { method: 'POST' })

                // Then fetch all testimonials
                const response = await fetch('/api/testimonials')
                const data = await response.json()

                if (data.success && data.data.length > 0) {
                    setTestimonials(data.data)
                }
            } catch (error) {
                console.error('Error initializing testimonials:', error)
                // Keep default testimonials on error
            } finally {
                setIsLoading(false)
            }
        }

        initializeTestimonials()
    }, [])

    const allTestimonials = [...testimonials, ...testimonials]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.success) {
                setStatusMessage({
                    type: 'success',
                    message: 'Thank you for sharing your experience! Your testimonial has been submitted successfully.'
                })

                // Reset form
                setFormData({ name: "", role: "", feedback: "", rating: 5, avatar: null })
                setSelectedAvatar(null)
                setCustomImage(null)

                // Refresh testimonials
                const refreshResponse = await fetch('/api/testimonials')
                const refreshData = await refreshResponse.json()
                if (refreshData.success) {
                    setTestimonials(refreshData.data)
                }

                // Close modal after 2 seconds
                setTimeout(() => {
                    setIsModalOpen(false)
                    setStatusMessage(null)
                }, 2000)
            } else {
                setStatusMessage({
                    type: 'error',
                    message: data.error || 'Failed to submit testimonial'
                })
            }
        } catch (error) {
            console.error('Error submitting testimonial:', error)
            setStatusMessage({
                type: 'error',
                message: 'Failed to submit testimonial. Please try again.'
            })
        } finally {
            setIsSubmitting(false)
        }
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
                    <AvatarCircles numPeople={30} avatarUrls={avatars} />
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

                <div className="flex justify-center mt-6">
                    <Dialog open={isModalOpen} onOpenChange={(open) => {
                        setIsModalOpen(open)
                        if (!open) {
                            setStatusMessage(null)
                            setCustomImage(null)
                            setSelectedAvatar(null)
                        }
                    }}>
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

                            {/* Status Message */}
                            {statusMessage && (
                                <div
                                    className={`p-4 rounded-xl border ${statusMessage.type === 'success'
                                        ? 'bg-[#69E300]/10 border-[#69E300]/30 text-[#69E300]'
                                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                                        } flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300`}
                                >
                                    {statusMessage.type === 'success' ? (
                                        <div className="w-6 h-6 rounded-full bg-[#69E300] flex items-center justify-center text-black font-bold">
                                            ✓
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                                            ✕
                                        </div>
                                    )}
                                    <p className="font-medium text-sm">{statusMessage.message}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className={`space-y-4 mt-3 ${statusMessage ? 'hidden' : ''}`}>
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

                                {/* Profile Image Selection */}
                                <div className="space-y-3">
                                    <Label className="text-white">
                                        Profile Image <span className="text-[#69E300]">*</span>
                                    </Label>

                                    {/* Selected/Uploaded Image Preview */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-20 h-20 rounded-2xl border-2 border-[#69E300]/30 bg-white/5 overflow-hidden flex items-center justify-center">
                                            {(customImage || selectedAvatar) ? (
                                                <img
                                                    src={customImage || selectedAvatar || ''}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <ImageIcon className="w-8 h-8 text-white/20" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-white/60 mb-2">Choose from avatars or upload your own</p>
                                            <div className="flex gap-2">
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0]
                                                            if (file) {
                                                                const reader = new FileReader()
                                                                reader.onloadend = () => {
                                                                    const base64String = reader.result as string
                                                                    setCustomImage(base64String)
                                                                    setFormData({ ...formData, avatar: base64String })
                                                                }
                                                                reader.readAsDataURL(file)
                                                            }
                                                        }}
                                                    />
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#69E300]/10 border border-[#69E300]/20 hover:bg-[#69E300]/20 transition-colors text-[#69E300] text-sm font-medium">
                                                        <Upload className="w-4 h-4" />
                                                        Upload Image
                                                    </div>
                                                </label>
                                                {customImage && (
                                                    <Button
                                                        type="button"
                                                        onClick={() => {
                                                            setCustomImage(null)
                                                            setFormData({ ...formData, avatar: selectedAvatar })
                                                        }}
                                                        className="px-4 py-2 text-sm bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400"
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Predefined Avatars */}
                                    {!customImage && (
                                        <div>
                                            <p className="text-xs text-white/40 mb-2">Or choose an avatar:</p>
                                            <div className="grid grid-cols-8 gap-2">
                                                {predefinedAvatars.map((avatar, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedAvatar(avatar)
                                                            setFormData({ ...formData, avatar })
                                                        }}
                                                        className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all hover:scale-110 ${selectedAvatar === avatar
                                                            ? 'border-[#69E300] ring-2 ring-[#69E300]/30'
                                                            : 'border-white/10 hover:border-[#69E300]/50'
                                                            }`}
                                                    >
                                                        <img
                                                            src={avatar}
                                                            alt={`Avatar ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
                                    disabled={isSubmitting}
                                    className="w-full h-12 rounded-full bg-[#69E300] text-black hover:bg-[#69E300]/90 font-bold text-base shadow-xl shadow-[#69E300]/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Submit Testimonial
                                        </>
                                    )}
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, Mail, Eye, EyeOff, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log("Login attempt:", { email, password })
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-[#69E300]/10 rounded-full mb-4"
                        >
                            <Lock className="w-8 h-8 text-[#69E300]" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-sm">Sign in to access your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-11 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-gray-500 focus:border-[#69E300] focus:ring-[#69E300]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-11 pr-11 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-gray-500 focus:border-[#69E300] focus:ring-[#69E300]"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-800/50 text-[#69E300] focus:ring-[#69E300]"
                                />
                                Remember me
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-[#69E300] hover:text-[#7fff00] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#69E300] hover:bg-[#7fff00] text-black font-semibold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Sign In
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-[#69E300] hover:text-[#7fff00] font-semibold transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-zinc-800"></div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
                        <div className="flex-1 h-px bg-zinc-800"></div>
                    </div>

                    {/* Social Login */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button className="px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                            </svg>
                            Google
                        </button>
                        <button className="px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

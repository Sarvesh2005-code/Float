"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Ghost, Shield, User as UserIcon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
    const pathname = usePathname();
    const { user, signInWithGoogle, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const navs = [
        { name: "Base", href: "/" },
        { name: "Engage", href: "/engage" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-void/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group z-50 relative">
                    <Ghost className="w-6 h-6 text-nebula transition-transform group-hover:rotate-12" />
                    <span className="font-bold text-lg tracking-widest font-orbitron text-starlight">FLOAT</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navs.map((n) => (
                        <Link
                            key={n.href}
                            href={n.href}
                            className={cn(
                                "text-sm uppercase tracking-wider transition-colors hover:text-white",
                                pathname === n.href ? "text-nebula" : "text-gray-400"
                            )}
                        >
                            {n.name}
                        </Link>
                    ))}

                    {/* Admin Link (Only if Authed) */}
                    {user && (
                        <Link
                            href="/admin"
                            className={cn(
                                "text-sm uppercase tracking-wider transition-colors hover:text-red-400 flex items-center gap-1",
                                pathname === "/admin" ? "text-red-500" : "text-gray-400"
                            )}
                        >
                            <Shield className="w-3 h-3" /> Studio
                        </Link>
                    )}
                </div>

                {/* Desktop Auth Action */}
                <div className="hidden md:block">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-nebula/20 flex items-center justify-center border border-nebula/50">
                                <span className="text-xs font-bold text-nebula">{user.email?.[0].toUpperCase()}</span>
                            </div>
                            <button onClick={logout} className="text-xs text-gray-500 hover:text-white transition-colors">
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="flex items-center gap-2 text-sm text-starlight bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all"
                        >
                            <UserIcon className="w-3 h-3" /> Initialize
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-starlight z-50 relative p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-void/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            {navs.map((n) => (
                                <Link
                                    key={n.href}
                                    href={n.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-2xl uppercase tracking-widest font-bold",
                                        pathname === n.href ? "text-nebula" : "text-gray-500"
                                    )}
                                >
                                    {n.name}
                                </Link>
                            ))}

                            {user && (
                                <Link
                                    href="/admin"
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-2xl uppercase tracking-widest font-bold flex items-center gap-2",
                                        pathname === "/admin" ? "text-red-500" : "text-gray-500"
                                    )}
                                >
                                    <Shield className="w-5 h-5" /> Studio
                                </Link>
                            )}

                            <div className="mt-8">
                                {user ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-nebula/20 flex items-center justify-center border border-nebula/50">
                                            <span className="text-2xl font-bold text-nebula">{user.email?.[0].toUpperCase()}</span>
                                        </div>
                                        <button onClick={logout} className="text-sm text-gray-500 hover:text-white uppercase tracking-wider">
                                            Disconnect Signal
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { signInWithGoogle(); setIsOpen(false); }}
                                        className="flex items-center gap-2 text-lg text-starlight bg-white/5 hover:bg-white/10 px-8 py-4 rounded-full border border-white/10 transition-all"
                                    >
                                        <UserIcon className="w-5 h-5" /> Initialize System
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}

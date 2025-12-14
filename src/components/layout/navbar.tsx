"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Ghost, Shield, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const pathname = usePathname();
    const { user, signInWithGoogle, logout } = useAuth();

    const navs = [
        { name: "Base", href: "/" },
        { name: "Engage", href: "/engage" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-void/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Ghost className="w-6 h-6 text-nebula transition-transform group-hover:rotate-12" />
                    <span className="font-bold text-lg tracking-widest font-orbitron">FLOAT</span>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-8">
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

                {/* Auth Action */}
                <div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-nebula/20 flex items-center justify-center border border-nebula/50">
                                <span className="text-xs font-bold">{user.email?.[0].toUpperCase()}</span>
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
            </div>
        </nav>
    );
}

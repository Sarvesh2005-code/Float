"use client";

import { useState, useEffect } from "react";
import { Ghost, Upload, Link as LinkIcon, Image as ImageIcon, ShieldAlert } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { user, loading, signInWithGoogle } = useAuth();
    const router = useRouter();

    // Simple Admin Check (Replace with Firestore Role in production)
    // For now, only the verifiable owner (you) or a hardcoded list
    const ADMIN_EMAILS = ["sarveshnakhale21@gmail.com", "ideayaan@gmail.com"];
    const isAuthorized = user && user.email && ADMIN_EMAILS.includes(user.email);

    if (loading) return <div className="min-h-screen bg-void flex items-center justify-center text-starlight animate-pulse">Initializing Link...</div>;

    if (!user || !isAuthorized) {
        return (
            <main className="min-h-screen bg-void flex items-center justify-center text-starlight">
                <div className="glass-panel p-8 rounded-xl max-w-md w-full text-center space-y-4">
                    <ShieldAlert className="w-12 h-12 mx-auto text-red-500 animate-pulse-slow" />
                    <h1 className="text-2xl font-bold">Restricted Area</h1>
                    <p className="text-gray-400">Classified Access Only.</p>

                    {user ? (
                        <div className="text-sm text-red-400">
                            User {user.email} is not authorized.
                        </div>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="w-full py-3 bg-nebula hover:bg-nebula-dim rounded-lg transition-colors font-bold"
                        >
                            Authenticate with Google
                        </button>
                    )}
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-void text-starlight p-8">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Ghost className="text-nebula" />
                    Float Studio
                </h1>
                <div className="bg-nebula/20 text-nebula px-4 py-1 rounded-full text-sm font-mono">
                    ADMIN MODE
                </div>
            </header>

            <section className="max-w-4xl mx-auto space-y-8">
                <div className="glass-panel p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Upload New Game
                    </h2>

                    <form
                        className="space-y-4"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);

                            try {
                                const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
                                const { db } = await import("@/lib/firebase");

                                await addDoc(collection(db, "games"), {
                                    title: formData.get("title"),
                                    genre: formData.get("genre"),
                                    description: formData.get("description"),
                                    thumbnailUrl: formData.get("thumbnailUrl"),
                                    playUrl: formData.get("playUrl"),
                                    type: "web", // Default for now
                                    createdAt: serverTimestamp(),
                                    visits: 0
                                });

                                alert("Game deployed successfully!");
                                form.reset();
                            } catch (err) {
                                console.error(err);
                                alert("Deployment failed. Check console.");
                            }
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Game Title</label>
                                <input name="title" required className="w-full bg-void-light border border-white/10 rounded p-2 focus:border-nebula outline-none" placeholder="e.g. Cyber Drift" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Genre</label>
                                <select name="genre" className="w-full bg-void-light border border-white/10 rounded p-2 focus:border-nebula outline-none">
                                    <option>Action</option>
                                    <option>RPG</option>
                                    <option>Strategy</option>
                                    <option>Arcade</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Description</label>
                            <textarea name="description" required className="w-full bg-void-light border border-white/10 rounded p-2 h-24 focus:border-nebula outline-none" placeholder="Enter game description..." />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Thumbnail URL
                                </label>
                                <input name="thumbnailUrl" required className="w-full bg-void-light border border-white/10 rounded p-2 focus:border-nebula outline-none" placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4" /> Download/Play Link
                                </label>
                                <input name="playUrl" required className="w-full bg-void-light border border-white/10 rounded p-2 focus:border-nebula outline-none" placeholder="https://..." />
                            </div>
                        </div>

                        <button type="submit" className="w-full py-3 bg-nebula hover:bg-nebula-dim rounded font-bold transition-colors flex items-center justify-center gap-2">
                            <Upload className="w-4 h-4" /> Deploy to Portal
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

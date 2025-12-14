"use client";

import { useState } from "react";
import { Ghost, Upload, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

export default function AdminPage() {
    const [isAuthorized, setIsAuthorized] = useState(false); // Temporary mock

    if (!isAuthorized) {
        return (
            <main className="min-h-screen bg-void flex items-center justify-center text-starlight">
                <div className="glass-panel p-8 rounded-xl max-w-md w-full text-center space-y-4">
                    <Ghost className="w-12 h-12 mx-auto text-nebula animate-pulse-slow" />
                    <h1 className="text-2xl font-bold">Restricted Area</h1>
                    <p className="text-gray-400">Identify yourself, pilot.</p>
                    <button
                        onClick={() => setIsAuthorized(true)}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        Enter Passcode (Mock)
                    </button>
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

                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Game Title</label>
                                <input className="w-full bg-void-light border border-white/10 rounded p-2 focus:border-nebula outline-none" placeholder="e.g. Cyber Drift" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Genre</label>
                                <select className="w-full bg-void-light border border-white/10 rounded p-2 focus:border-nebula outline-none">
                                    <option>Action</option>
                                    <option>RPG</option>
                                    <option>Strategy</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Description</label>
                            <textarea className="w-full bg-void-light border border-white/10 rounded p-2 h-24 focus:border-nebula outline-none" placeholder="Enter game description..." />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Thumbnail URL
                                </label>
                                <input className="w-full bg-void-light border border-white/10 rounded p-2 focus:border-nebula outline-none" placeholder="/games/icon.png" />
                                <p className="text-xs text-gray-500">Place file in public/games/</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4" /> Download/Play Link
                                </label>
                                <input className="w-full bg-void-light border border-white/10 rounded p-2 focus:border-nebula outline-none" placeholder="https://github.com/..." />
                            </div>
                        </div>

                        <button type="button" className="w-full py-3 bg-nebula hover:bg-nebula-dim rounded font-bold transition-colors">
                            Deploy to Portal
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

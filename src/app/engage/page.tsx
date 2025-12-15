"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Starfield } from "@/components/ui/starfield";
import { GameCard } from "@/components/game-card";
import { Ghost } from "lucide-react";
import Link from "next/link";

interface Game {
    id: string;
    title: string;
    thumbnailUrl: string;
    type: string;
}

export default function LibraryPage() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        async function fetchGames() {
            const snap = await getDocs(collection(db, "games"));
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Game[];
            setGames(data);
        }
        fetchGames();
    }, []);

    return (
        <main className="min-h-screen bg-void text-starlight relative">
            <div className="fixed inset-0 z-0">
                <Starfield />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                <header className="mb-12 flex items-center gap-4">
                    <div className="p-3 bg-nebula/20 rounded-xl">
                        <Ghost className="w-8 h-8 text-nebula" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">Mission Deck</h1>
                        <p className="text-gray-400">Select your simulation.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* Flagship Game */}
                    <Link href="/engage/gravity-lander">
                        <div className="group relative aspect-square rounded-2xl overflow-hidden bg-void-light border border-nebula/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] cursor-pointer">
                            <div className="absolute inset-0 bg-nebula opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl" />
                            {/* Placeholder gradient/image for native game */}
                            <div className="absolute inset-0 bg-gradient-to-br from-nebula/20 to-void flex items-center justify-center">
                                <span className="text-6xl group-hover:scale-110 transition-transform duration-500">🚀</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-xl font-bold text-starlight mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                                    Gravity Lander
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-nebula opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <span className="uppercase tracking-widest font-bold">NATIVE PROTOCOL</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {games.map(game => (
                        <GameCard key={game.id} {...game} />
                    ))}
                </div>

                {games.length === 0 && (
                    <div className="text-center py-24 text-gray-500">
                        No signals detected. Waiting for uploads...
                    </div>
                )}
            </div>
        </main>
    );
}

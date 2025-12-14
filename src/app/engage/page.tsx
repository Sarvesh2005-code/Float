"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Starfield } from "@/components/ui/starfield";
import { GameCard } from "@/components/game-card";
import { Ghost } from "lucide-react";

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

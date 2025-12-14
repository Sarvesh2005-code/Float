"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Starfield } from "@/components/ui/starfield";
import { ArrowLeft, Maximize2 } from "lucide-react";
import Link from "next/link";

interface GameData {
    title: string;
    playUrl: string;
    type: string;
    description: string;
}

export default function GamePage() {
    const params = useParams();
    const id = params.id as string;
    const [game, setGame] = useState<GameData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGame() {
            if (!id) return;
            const docRef = doc(db, "games", id);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                setGame(snap.data() as GameData);
            }
            setLoading(false);
        }
        fetchGame();
    }, [id]);

    if (loading) return <div className="bg-void h-screen flex items-center justify-center text-starlight">Loading Simulation...</div>;
    if (!game) return <div className="bg-void h-screen flex items-center justify-center text-starlight">Game Not Found</div>;

    return (
        <main className="min-h-screen bg-void flex flex-col text-starlight relative overflow-hidden">
            <Starfield />

            {/* Header */}
            <header className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
                <Link href="/engage" className="pointer-events-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Base
                </Link>
                <h1 className="text-xl font-bold tracking-widest uppercase">{game.title}</h1>
            </header>

            {/* Game Viewport */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                {game.type === 'web' ? (
                    <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group">
                        <iframe
                            src={game.playUrl}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    </div>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-3xl font-bold">Ready for Drop</h2>
                        <p className="max-w-md text-gray-400 mx-auto">{game.description}</p>
                        <a
                            href={game.playUrl}
                            target="_blank"
                            className="inline-block px-8 py-4 bg-nebula hover:bg-nebula-dim text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-nebula/50"
                        >
                            Download Installer
                        </a>
                    </div>
                )}
            </div>

        </main>
    );
}

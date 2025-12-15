"use client";

import { GravityLander } from "@/components/games/gravity-lander/game-canvas";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GravityLanderPage() {
    return (
        <main className="h-screen w-screen bg-void relative overflow-hidden">
            {/* Fullscreen Game */}
            <GravityLander />

            {/* Back Button (Floating) */}
            <Link
                href="/engage"
                className="absolute top-4 right-4 z-20 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors border border-white/5"
            >
                <ArrowLeft className="w-6 h-6" />
            </Link>
        </main>
    );
}

"use client";

import { motion } from "framer-motion";
import { Gamepad2, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface GameCardProps {
    id: string;
    title: string;
    thumbnailUrl: string;
    type: string;
}

export function GameCard({ id, title, thumbnailUrl, type }: GameCardProps) {
    return (
        <Link href={`/engage/${id}`}>
            <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-void-light border border-white/5 shadow-lg cursor-pointer"
            >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-nebula opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />

                <Image
                    src={thumbnailUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-starlight mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-nebula opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        {type === 'web' ? <Gamepad2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                        <span className="uppercase tracking-widest">{type === 'web' ? 'Instant Play' : 'Download'}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

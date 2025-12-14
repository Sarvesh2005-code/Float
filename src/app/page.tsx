"use client";

import { Starfield } from "@/components/ui/starfield";
import { motion } from "framer-motion";
import { Gamepad2, Download, Ghost } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Starfield />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center">

        {/* Floating Logo / Badge */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          className="mb-8"
        >
          <div className="glass-panel px-6 py-2 rounded-full flex items-center gap-2 text-nebula shadow-[0_0_30px_-5px_var(--color-nebula)]">
            <Ghost className="w-5 h-5" />
            <span className="text-sm font-medium tracking-widest uppercase text-starlight">Zero Gravity Gaming</span>
          </div>
        </motion.div>

        {/* Hero Text */}
        <h1 className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-b from-starlight to-gray-500 selection:bg-nebula selection:text-white">
          FLOAT
        </h1>

        <p className="max-w-xl text-gray-400 text-lg md:text-xl mb-12">
          The next-generation portal. Play instantly in your browser or download for offline access. No lag. No limits.
        </p>

        {/* Floating Cards (Decorative) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] -z-10 pointer-events-none opacity-20">
          {/* Abstract floating shapes or cards could go here */}
          <div className="absolute top-0 right-10 w-64 h-40 bg-nebula rounded-lg blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-10 left-10 w-72 h-40 bg-blue-600 rounded-lg blur-[100px] animate-pulse-slow delay-1000" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-center">
          <Link
            href="/engage"
            className="group relative px-8 py-4 bg-starlight text-void font-bold rounded-lg text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-nebula opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Start Engine
            </span>
          </Link>

          <button
            disabled
            className="px-8 py-4 glass-panel text-gray-400 rounded-lg text-lg flex items-center gap-2 cursor-not-allowed hover:bg-white/5 transition-colors"
          >
            <Download className="w-5 h-5" />
            Install Client (Coming Soon)
          </button>
        </div>

      </div>

      {/* Footer / Scroller Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-gray-500 text-xs tracking-widest uppercase"
      >
        Scroll to Explore
      </motion.div>
    </main>
  );
}

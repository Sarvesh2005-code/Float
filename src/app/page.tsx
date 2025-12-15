"use client";

import Link from "next/link";
import { Starfield } from "@/components/ui/starfield";
import { ArrowRight, Code, Zap, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Zero Latency",
      desc: "Optimized for instant load times. No waiting, just playing."
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Universal Access",
      desc: "Play on any device. Mobile, Tablet, or Desktop rig."
    },
    {
      icon: <Code className="w-8 h-8 text-green-400" />,
      title: "Open Source",
      desc: "Built by the community, for the community. inspect our core."
    }
  ];

  return (
    <div className="relative min-h-screen font-sans text-starlight selection:bg-nebula/30">
      <Starfield />

      {/* Hero Section */}
      <section ref={targetRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="z-10 text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nebula opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nebula"></span>
            </span>
            <span className="text-xs font-medium tracking-wider uppercase">System Online</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 mix-blend-overlay opacity-90 glitch-text" data-text="FLOAT">
            FLOAT
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light">
            The next-generation portal. Play instantly in your browser or download for offline access. No lag. No limits.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/engage" className="group relative px-8 py-4 bg-starlight text-void font-bold text-sm tracking-widest uppercase rounded-full overflow-hidden transition-transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Start Engine <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-nebula transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </Link>
            <button disabled className="px-8 py-4 bg-transparent border border-white/20 text-white/50 font-bold text-sm tracking-widest uppercase rounded-full cursor-not-allowed hover:border-white/40 transition-colors">
              Install Client
            </button>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 animate-bounce">
          <span className="text-xs text-gray-600 uppercase tracking-[0.2em]">Scroll to Explore</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-void-light/50 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-2xl glass-panel group hover:bg-white/5 transition-colors"
              >
                <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold font-orbitron mb-4 text-white group-hover:text-nebula transition-colors">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold font-orbitron mb-8">Ready to Launch?</h2>
        <Link href="/engage" className="inline-block px-12 py-5 bg-nebula hover:bg-nebula-dim text-white font-bold rounded-full transition-all shadow-[0_0_50px_rgba(99,102,241,0.4)] hover:shadow-[0_0_80px_rgba(99,102,241,0.6)]">
          ENTER PORTAL
        </Link>
      </section>
    </div>
  );
}

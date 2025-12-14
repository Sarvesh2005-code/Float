"use client";

import React, { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
}

export const Starfield = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // Mouse parallax springs
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse from -1 to 1
            mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
            mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        const stars: Star[] = Array.from({ length: 400 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 2 + 0.5, // Depth factor
            size: Math.random() * 1.5,
        }));

        let animationId: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#ffffff";

            const parallaxX = smoothX.get() * 50; // Max shift pixels
            const parallaxY = smoothY.get() * 50;

            stars.forEach((star) => {
                // Apply parallax based on depth (z)
                const dx = parallaxX * star.z;
                const dy = parallaxY * star.z;

                // Wrap around logic if needed (optional, here we just let them shift)
                // Draw star
                ctx.beginPath();
                // Opacity based on Z
                ctx.globalAlpha = 0.5 + (star.z / 2.5) * 0.5;
                ctx.arc(star.x + dx, star.y + dy, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationId);
    }, [width, height, smoothX, smoothY]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none bg-transparent"
        />
    );
};

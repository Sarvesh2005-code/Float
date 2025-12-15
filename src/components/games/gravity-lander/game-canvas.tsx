"use client";

import React, { useRef, useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";

// Game Constants
const GRAVITY = 0.05;
const THRUST_POWER = 0.15;
const ROTATION_SPEED = 0.05;
const LANDING_PAD_WIDTH = 100;

interface LandPad {
    x: number;
    y: number;
    width: number;
}

export function GravityLander() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"MENU" | "PLAYING" | "WON" | "CRASHED">("MENU");
    const [score, setScore] = useState(0);
    const [fuel, setFuel] = useState(100);

    // Ship State (Ref to avoid re-renders during loop)
    const ship = useRef({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        angle: 0,
        thrusting: false,
        rotatingLeft: false,
        rotatingRight: false,
        fuel: 100
    });

    const terrain = useRef<{ points: { x: number; y: number }[], pad: LandPad }>({ points: [], pad: { x: 0, y: 0, width: 0 } });

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== "PLAYING") {
                if (e.code === "Space") startGame();
                return;
            }

            switch (e.code) {
                case "ArrowUp":
                case "Space":
                    ship.current.thrusting = true;
                    break;
                case "ArrowLeft":
                    ship.current.rotatingLeft = true;
                    break;
                case "ArrowRight":
                    ship.current.rotatingRight = true;
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.code) {
                case "ArrowUp":
                case "Space":
                    ship.current.thrusting = false;
                    break;
                case "ArrowLeft":
                    ship.current.rotatingLeft = false;
                    break;
                case "ArrowRight":
                    ship.current.rotatingRight = false;
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [gameState]);

    // Init Level
    const initLevel = (width: number, height: number) => {
        // Generate simple jagged terrain
        const points = [];
        const segments = 20;
        const segmentWidth = width / segments;
        let groundHeight = height - 50;

        const padIndex = Math.floor(Math.random() * (segments - 4)) + 2; // Pad somewhere in middle

        for (let i = 0; i <= segments; i++) {
            if (i === padIndex || i === padIndex + 1) {
                // Flat Pad
                points.push({ x: i * segmentWidth, y: groundHeight });
            } else {
                // Jagged
                points.push({ x: i * segmentWidth, y: groundHeight - Math.random() * 100 + 50 });
            }
        }

        // Define Pad
        const pad = {
            x: padIndex * segmentWidth,
            y: groundHeight,
            width: segmentWidth
        };

        terrain.current = { points, pad };

        // Reset Ship
        ship.current = {
            x: width / 2,
            y: 100,
            vx: 0,
            vy: 0,
            angle: -Math.PI / 2, // Pointing Up
            thrusting: false,
            rotatingLeft: false,
            rotatingRight: false,
            fuel: 100
        };
        setFuel(100);
    };

    const startGame = () => {
        setGameState("PLAYING");
        if (canvasRef.current) {
            initLevel(canvasRef.current.width, canvasRef.current.height);
        }
    };

    // Game Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle Resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (gameState === "MENU") initLevel(canvas.width, canvas.height); // Preview
        };
        window.addEventListener("resize", resize);
        resize();

        let animationId: number;

        const loop = () => {
            const width = canvas.width;
            const height = canvas.height;

            // 1. Update Physics
            if (gameState === "PLAYING") {
                const s = ship.current;

                // Gravity
                s.vy += GRAVITY;

                // Rotation
                if (s.rotatingLeft) s.angle -= ROTATION_SPEED;
                if (s.rotatingRight) s.angle += ROTATION_SPEED;

                // Thrust
                if (s.thrusting && s.fuel > 0) {
                    s.vx += Math.cos(s.angle) * THRUST_POWER;
                    s.vy += Math.sin(s.angle) * THRUST_POWER;
                    s.fuel -= 0.2;
                }

                // Air Friction (Drag)
                s.vx *= 0.995;
                s.vy *= 0.995;

                // Apply Velocity
                s.x += s.vx;
                s.y += s.vy;

                // Boundary Check
                if (s.x < 0) s.x = width;
                if (s.x > width) s.x = 0;

                // Sync Fuel State UI (throttle updates ideally, but for now direct)
                setFuel(s.fuel);

                // Collision Detection (Simple Ground Check)
                // Ideally raycast, but simply checking if below terrain avg or specific segment
                // For MVP: Check against pad

                const pad = terrain.current.pad;
                // Check if within pad X range
                if (s.x > pad.x && s.x < pad.x + pad.width) {
                    // Check if touching ground
                    if (s.y >= pad.y - 10) {
                        // Check velocity and angle
                        const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
                        const angleDiff = Math.abs((s.angle + Math.PI / 2) % (2 * Math.PI)); // Should be near 0 (upright)
                        // Normalize angle -PI to PI?
                        // Let's simplified check: Upright is -PI/2

                        // Allow some tolerance
                        if (speed < 2) {
                            setGameState("WON");
                            setScore(prev => prev + 100 + Math.floor(s.fuel));
                        } else {
                            setGameState("CRASHED");
                        }
                        s.y = pad.y - 10; // Land
                        s.vx = 0; s.vy = 0;
                    }
                } else {
                    // Check terrain height at current X
                    // Simplified: if y > canvas height - 20 (floor)
                    if (s.y > height) {
                        setGameState("CRASHED");
                    }
                }
            }

            // 2. Render
            ctx.fillStyle = "#030305"; // Void
            ctx.fillRect(0, 0, width, height);

            // Stars (Static background or reuse starfield?)
            // Let's draw simple dots
            ctx.fillStyle = "#FFF";
            for (let i = 0; i < 50; i++) {
                ctx.fillRect((i * 137) % width, (i * 243) % height, 1, 1);
            }

            // Draw Terrain
            ctx.beginPath();
            ctx.strokeStyle = "#6366f1"; // Nebula
            ctx.lineWidth = 2;
            ctx.moveTo(0, height);
            terrain.current.points.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.lineTo(width, height);
            ctx.stroke();
            ctx.fillStyle = "rgba(99, 102, 241, 0.1)";
            ctx.fill();

            // Draw Pad
            const pad = terrain.current.pad;
            ctx.fillStyle = "#4ade80"; // Green
            ctx.fillRect(pad.x, pad.y, pad.width, 10);
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#4ade80";
            ctx.fillRect(pad.x, pad.y, pad.width, 10);
            ctx.shadowBlur = 0;

            // Draw Ship
            const s = ship.current;
            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.angle);

            ctx.strokeStyle = "#FFF";
            ctx.lineWidth = 2;

            // Lander Shape
            ctx.beginPath();
            // Body
            ctx.rect(-10, -10, 20, 20);

            // Legs
            ctx.moveTo(-10, 10); ctx.lineTo(-15, 20); ctx.lineTo(-10, 20);
            ctx.moveTo(10, 10); ctx.lineTo(15, 20); ctx.lineTo(10, 20);

            ctx.stroke();

            // Flame
            if (s.thrusting && s.fuel > 0) {
                ctx.beginPath();
                ctx.moveTo(-5, 12);
                ctx.lineTo(0, 30 + Math.random() * 10);
                ctx.lineTo(5, 12);
                ctx.fillStyle = "#fbbf24"; // Orange/Yellow
                ctx.fill();
            }

            ctx.restore();

            animationId = requestAnimationFrame(loop);
        };

        animationId = requestAnimationFrame(loop);
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [gameState]);

    return (
        <div className="relative w-full h-full bg-void">
            <canvas ref={canvasRef} className="block w-full h-full" />

            {/* UI Overlay */}
            <div className="absolute top-4 left-4 p-4 glass-panel rounded-xl text-starlight pointer-events-none">
                <div className="text-xl font-bold mb-2">SCORE: {score}</div>
                <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider">FUEL</span>
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all ${fuel < 20 ? 'bg-red-500' : 'bg-nebula'}`}
                            style={{ width: `${fuel}%` }}
                        />
                    </div>
                </div>
            </div>

            {gameState === "MENU" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                    <div className="text-center">
                        <h1 className="text-6xl font-black text-starlight mb-4 tracking-tighter neon-text">
                            GRAVITY<span className="text-nebula">LANDER</span>
                        </h1>
                        <p className="text-gray-300 mb-8 animate-pulse">PRESS SPACE TO START</p>
                        <div className="text-sm text-gray-500">
                            ARROW KEYS to Thrust & Rotate
                        </div>
                    </div>
                </div>
            )}

            {(gameState === "WON" || gameState === "CRASHED") && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                    <div className="text-center">
                        <h2 className={`text-5xl font-bold mb-4 ${gameState === "WON" ? 'text-green-400' : 'text-red-500'}`}>
                            {gameState === "WON" ? "TOUCHDOWN" : "CRITICAL FAILURE"}
                        </h2>
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-nebula hover:bg-nebula-dim text-white rounded-lg font-bold transition-all transform hover:scale-105"
                        >
                            RETRY
                        </button>
                    </div>
                </div>
            )}

            {/* Touch Controls (Visible on mobile/tablet) */}
            <div className="absolute bottom-10 left-0 right-0 px-8 flex justify-between items-end md:hidden pointer-events-none">
                {/* Directional */}
                <div className="flex gap-4 pointer-events-auto">
                    <button
                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 active:bg-nebula/50 transition-colors flex items-center justify-center"
                        onTouchStart={() => (ship.current.rotatingLeft = true)}
                        onTouchEnd={() => (ship.current.rotatingLeft = false)}
                        onMouseDown={() => (ship.current.rotatingLeft = true)}
                        onMouseUp={() => (ship.current.rotatingLeft = false)}
                    >
                        <span className="text-2xl">←</span>
                    </button>
                    <button
                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 active:bg-nebula/50 transition-colors flex items-center justify-center"
                        onTouchStart={() => (ship.current.rotatingRight = true)}
                        onTouchEnd={() => (ship.current.rotatingRight = false)}
                        onMouseDown={() => (ship.current.rotatingRight = true)}
                        onMouseUp={() => (ship.current.rotatingRight = false)}
                    >
                        <span className="text-2xl">→</span>
                    </button>
                </div>

                {/* Thrust */}
                <button
                    className="w-24 h-24 rounded-full bg-nebula/20 backdrop-blur-md border-2 border-nebula/50 active:bg-nebula active:scale-95 transition-all flex items-center justify-center pointer-events-auto"
                    onTouchStart={() => {
                        if (gameState !== "PLAYING") startGame();
                        ship.current.thrusting = true;
                    }}
                    onTouchEnd={() => (ship.current.thrusting = false)}
                    onMouseDown={() => {
                        if (gameState !== "PLAYING") startGame();
                        ship.current.thrusting = true;
                    }}
                    onMouseUp={() => (ship.current.thrusting = false)}
                >
                    <span className="text-xl font-bold">THRUST</span>
                </button>
            </div>
        </div>
    );
}

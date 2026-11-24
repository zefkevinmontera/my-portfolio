"use client";

import { useEffect, useRef } from "react";

const CELL_SIZE = 40; // Matches .bg-blueprint-grid (40px x 40px)
const TICK_MS = 480; // Calm, mechanical generation cadence
const FADE_SPEED = 0.08; // Smooth fade-in/out between ticks

// Classic glider & lightweight seed patterns so the grid stays structured, not noisy
const PATTERNS: number[][][] = [
  // Glider
  [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  // R-pentomino (long-lived organic evolution)
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
  ],
  // Lightweight spaceship
  [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
  ],
  // Toad oscillator
  [
    [0, 1, 1, 1],
    [1, 1, 1, 0],
  ],
];

export function BlueprintLifeBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cols = 0;
    let rows = 0;
    let grid: Uint8Array = new Uint8Array(0);
    let nextGrid: Uint8Array = new Uint8Array(0);
    let alphaGrid: Float32Array = new Float32Array(0);
    let rafId = 0;
    let lastTick = 0;
    let isDark = document.documentElement.classList.contains("dark");

    const seedPattern = (count: number) => {
      if (cols < 6 || rows < 6) return;
      for (let i = 0; i < count; i++) {
        const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        const startCol = Math.floor(Math.random() * (cols - 5));
        const startRow = Math.floor(Math.random() * (rows - 5));

        for (let r = 0; r < pattern.length; r++) {
          for (let c = 0; c < pattern[r].length; c++) {
            if (pattern[r][c] === 1) {
              const idx = (startRow + r) * cols + (startCol + c);
              grid[idx] = 1;
            }
          }
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / CELL_SIZE);
      rows = Math.ceil(height / CELL_SIZE);

      const total = cols * rows;
      grid = new Uint8Array(total);
      nextGrid = new Uint8Array(total);
      alphaGrid = new Float32Array(total);

      // Initial sparse seed (~5-7 patterns across the viewport)
      seedPattern(Math.max(4, Math.floor((cols * rows) / 140)));

      // For reduced motion, pre-fill alpha once and draw static frame
      if (reducedMotion) {
        for (let i = 0; i < total; i++) {
          alphaGrid[i] = grid[i] ? 1 : 0;
        }
        draw();
      }
    };

    const stepGeneration = () => {
      let aliveCount = 0;

      for (let r = 0; r < rows; r++) {
        const rUp = (r - 1 + rows) % rows;
        const rDown = (r + 1) % rows;

        for (let c = 0; c < cols; c++) {
          const cLeft = (c - 1 + cols) % cols;
          const cRight = (c + 1) % cols;

          const neighbors =
            grid[rUp * cols + cLeft] +
            grid[rUp * cols + c] +
            grid[rUp * cols + cRight] +
            grid[r * cols + cLeft] +
            grid[r * cols + cRight] +
            grid[rDown * cols + cLeft] +
            grid[rDown * cols + c] +
            grid[rDown * cols + cRight];

          const idx = r * cols + c;
          const alive = grid[idx] === 1;
          const nextAlive = alive
            ? neighbors === 2 || neighbors === 3
            : neighbors === 3;

          nextGrid[idx] = nextAlive ? 1 : 0;
          if (nextAlive) aliveCount++;
        }
      }

      // Swap buffers
      const temp = grid;
      grid = nextGrid;
      nextGrid = temp;

      // Gently reseed if population becomes too sparse
      const minAlive = Math.max(12, Math.floor(cols * rows * 0.025));
      if (aliveCount < minAlive) {
        seedPattern(2);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Monochrome cell fill tuned for dark & light mode
      const baseRgb = isDark ? "250, 250, 250" : "9, 9, 11";
      const maxOpacity = isDark ? 0.075 : 0.065;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const target = grid[idx];
          alphaGrid[idx] += (target - alphaGrid[idx]) * FADE_SPEED;

          const a = alphaGrid[idx];
          if (a > 0.01) {
            const x = c * CELL_SIZE;
            const y = r * CELL_SIZE;

            // Fill inside the 40px blueprint square with a 1px inset
            ctx.fillStyle = `rgba(${baseRgb}, ${(a * maxOpacity).toFixed(4)})`;
            ctx.fillRect(x + 1, y + 1, CELL_SIZE - 1, CELL_SIZE - 1);

            // Subtle corner registration dot on active cells
            if (a > 0.55) {
              ctx.fillStyle = `rgba(${baseRgb}, ${(a * maxOpacity * 2.2).toFixed(4)})`;
              ctx.fillRect(x - 1, y - 1, 3, 3);
            }
          }
        }
      }
    };

    const loop = (now: number) => {
      if (!document.hidden) {
        if (now - lastTick >= TICK_MS) {
          stepGeneration();
          lastTick = now;
        }
        draw();
      }
      rafId = requestAnimationFrame(loop);
    };

    // Sync color when dark/light theme toggles
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
      if (reducedMotion) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    window.addEventListener("resize", resize);

    if (!reducedMotion) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 30%, #000 55%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 30%, #000 55%, transparent 100%)",
      }}
    >
      {/* Static 40px Architectural Grid */}
      <div className="absolute inset-0 bg-blueprint-grid" />

      {/* Living Conway's Game of Life Layer */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
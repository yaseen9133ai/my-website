"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: boolean;
  phase: number;
};

type Pulse = { a: number; b: number; t: number; speed: number };

/**
 * Ambient neural / knowledge-graph field. Nodes drift, edges appear between
 * near neighbours, and signal pulses travel along them — a nod to the GNN work.
 */
export default function GraphField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };

    const LINK_DIST = 132;

    function build() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.round((w * h) / 15500);
      const count = Math.max(26, Math.min(72, density));
      nodes = Array.from({ length: count }, (_, i) => {
        const hub = i % 7 === 0;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.17,
          vy: (Math.random() - 0.5) * 0.17,
          r: hub ? 2.6 + Math.random() * 1.4 : 1.1 + Math.random() * 1.1,
          hub,
          phase: Math.random() * Math.PI * 2,
        };
      });
      pulses = [];
    }

    function spawnPulse() {
      if (nodes.length < 2 || pulses.length > 14) return;
      const a = Math.floor(Math.random() * nodes.length);
      let best = -1;
      let bestD = LINK_DIST;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const d = Math.hypot(nodes[i].x - nodes[a].x, nodes[i].y - nodes[a].y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best >= 0) pulses.push({ a, b: best, t: 0, speed: 0.006 + Math.random() * 0.012 });
    }

    let lastSpawn = 0;

    function frame(time: number) {
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // Gentle repulsion from the cursor
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < 130 && d > 0.1) {
          const force = (1 - d / 130) * 0.55;
          n.x += (dx / d) * force;
          n.y += (dy / d) * force;
        }

        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK_DIST) continue;
          const strength = 1 - dist / LINK_DIST;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = `rgba(140, 168, 200, ${(strength * 0.24).toFixed(3)})`;
          ctx!.lineWidth = 0.7;
          ctx!.stroke();
        }
      }

      // Pulses travelling along edges
      if (!reduced && time - lastSpawn > 420) {
        spawnPulse();
        lastSpawn = time;
      }
      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        p.t += p.speed;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(Math.min(p.t, 1) * Math.PI);
        const g = ctx!.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, `rgba(61, 242, 192, ${0.55 * fade})`);
        g.addColorStop(1, "rgba(61, 242, 192, 0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(x, y, 9, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Nodes
      for (const n of nodes) {
        const breathe = reduced ? 1 : 0.72 + Math.sin(time * 0.0014 + n.phase) * 0.28;
        if (n.hub) {
          const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7);
          g.addColorStop(0, `rgba(61, 242, 192, ${0.28 * breathe})`);
          g.addColorStop(1, "rgba(61, 242, 192, 0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = n.hub
          ? `rgba(61, 242, 192, ${0.85 * breathe + 0.15})`
          : `rgba(196, 210, 228, ${0.35 * breathe + 0.2})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    build();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

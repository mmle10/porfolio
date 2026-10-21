import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const LIFE = 1.4;
const MAX = 40;
const SPAWN_DIST = 26;
const LINK_DIST = 110;

const StarTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let dpr = 1;
    let particles = [];
    let last = null;
    let frame = 0;
    let running = false;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const acc =
        getComputedStyle(document.body).getPropertyValue("--acc").trim() ||
        "157, 130, 255";

      for (const p of particles) p.t += 0.016;
      while (particles.length && particles[0].t > LIFE) particles.shift();

      ctx.globalAlpha = 0.7;

      for (let e = 0; e < particles.length; e++) {
        for (let r = e + 1; r < Math.min(particles.length, e + 4); r++) {
          const a = particles[e];
          const b = particles[r];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK_DIST) continue;
          const alpha =
            0.35 *
            (1 - dist / LINK_DIST) *
            (1 - Math.min(a.t, b.t) / LIFE);
          ctx.strokeStyle = `rgba(${acc},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const fade = 1 - p.t / LIFE;
        const radius = p.s * (1 + 0.25 * Math.sin(9 * p.t));
        ctx.fillStyle = `rgba(255,240,255,${fade.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = `rgba(${acc},${(0.25 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * radius, 0, 6.283);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (particles.length) {
        frame = requestAnimationFrame(draw);
      } else {
        running = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      if (!document.documentElement.classList.contains("is-ready")) return;
      if (event.pointerType && event.pointerType !== "mouse") return;
      const x = event.clientX;
      const y = event.clientY;
      if (last === null || Math.hypot(x - last.x, y - last.y) > SPAWN_DIST) {
        particles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          t: 0,
          s: 0.6 + 1.2 * Math.random(),
        });
        if (particles.length > MAX) particles.shift();
        last = { x, y };
      }
      start();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <canvas ref={canvasRef} className="star-trail" aria-hidden="true" />,
    document.body
  );
};

export default StarTrail;

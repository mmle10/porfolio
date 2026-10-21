import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const FIRST_DELAY = 2600;
const MIN_GAP = 5000;
const MAX_GAP = 10500;

const ShootingStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let dpr = 1;
    let frame = 0;
    let timer = 0;
    let meteor = null;
    let disposed = false;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    const schedule = (delay) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(spawn, delay);
    };

    const spawn = () => {
      if (disposed) return;
      if (
        document.hidden ||
        !document.documentElement.classList.contains("is-ready")
      ) {
        schedule(1200);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      const leftward = Math.random() > 0.32;
      const angle = (24 + Math.random() * 16) * (Math.PI / 180);
      const dirX = (leftward ? -1 : 1) * Math.cos(angle);
      const dirY = Math.sin(angle);
      const speed = 620 + Math.random() * 320;

      meteor = {
        x: leftward
          ? w * (0.35 + Math.random() * 0.6)
          : w * (0.05 + Math.random() * 0.3),
        y: -20 + Math.random() * h * 0.26,
        vx: dirX * speed,
        vy: dirY * speed,
        dirX,
        dirY,
        len: 130 + Math.random() * 90,
        born: performance.now(),
        life: 950 + Math.random() * 350,
      };
      frame = requestAnimationFrame(draw);
    };

    const draw = (now) => {
      if (disposed || !meteor) return;
      const t = (now - meteor.born) / meteor.life;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (t >= 1) {
        meteor = null;
        schedule(MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP));
        return;
      }

      const elapsed = (now - meteor.born) / 1000;
      const hx = meteor.x + meteor.vx * elapsed;
      const hy = meteor.y + meteor.vy * elapsed;
      const env = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
      const tailX = hx - meteor.dirX * meteor.len;
      const tailY = hy - meteor.dirY * meteor.len;

      const acc =
        getComputedStyle(document.body).getPropertyValue("--acc").trim() ||
        "157, 130, 255";
      const grad = ctx.createLinearGradient(hx, hy, tailX, tailY);
      grad.addColorStop(0, `rgba(255,255,255,${(0.95 * env).toFixed(3)})`);
      grad.addColorStop(0.25, `rgba(${acc},${(0.55 * env).toFixed(3)})`);
      grad.addColorStop(0.6, `rgba(${acc},${(0.28 * env).toFixed(3)})`);
      grad.addColorStop(1, `rgba(${acc},0)`);

      ctx.lineCap = "round";
      ctx.strokeStyle = grad;
      ctx.lineWidth = 5;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      ctx.fillStyle = `rgba(${acc},${(0.3 * env).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 6, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${(0.95 * env).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 2, 0, 6.283);
      ctx.fill();

      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        meteor = null;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        schedule(1500);
      }
    };

    resize();
    schedule(FIRST_DELAY);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <canvas ref={canvasRef} className="shooting-stars" aria-hidden="true" />,
    document.body
  );
};

export default ShootingStars;

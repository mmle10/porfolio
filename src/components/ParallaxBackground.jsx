import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const spring = { stiffness: 70, damping: 22, mass: 0.7 };

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(() =>
    typeof window === "undefined" ? 900 : window.innerHeight
  );

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const nx = useSpring(pointerX, spring);
  const ny = useSpring(pointerY, spring);

  const skyX = useTransform(nx, (value) => value * -6);
  const skyY = useTransform(ny, (value) => value * -4);
  const farX = useTransform(nx, (value) => value * -14);
  const farY = useTransform(ny, (value) => value * -8);
  const midX = useTransform(nx, (value) => value * -32);
  const midY = useTransform(ny, (value) => value * -16);
  const frontX = useTransform(nx, (value) => value * -52);
  const frontY = useTransform(ny, (value) => value * -26);

  const fadeScroll = useSpring(scrollY, { stiffness: 42, damping: 24, mass: 0.85 });

  /* camera dolly, not a uniform slide: the sky barely breathes, the far
     ridge drifts a little, and each nearer layer scales up more than the
     last — the front floor rushes toward the camera from the bottom.
     Nearer layers also slide sideways a touch, in opposite directions,
     the way things pass at different speeds when you move forward. */
  const skyScrollY = useTransform(fadeScroll, [0, vh * 1.6], ["0%", "2%"]);
  const skyScale = useTransform(fadeScroll, [0, vh * 1.6], [1, 1.08]);
  const mountain3Y = useTransform(fadeScroll, [0, vh * 1.4], ["0%", "8%"]);
  const mountain3X = useTransform(fadeScroll, [0, vh * 1.4], ["0%", "1.5%"]);
  const mountain3Scale = useTransform(fadeScroll, [0, vh * 1.4], [1, 1.1]);
  const mountain2Y = useTransform(fadeScroll, [0, vh * 1.3], ["0%", "13%"]);
  const mountain2X = useTransform(fadeScroll, [0, vh * 1.3], ["0%", "-2.5%"]);
  const mountain2Scale = useTransform(fadeScroll, [0, vh * 1.3], [1, 1.24]);
  const mountain1Y = useTransform(fadeScroll, [0, vh * 1.2], ["0%", "3%"]);
  const mountain1X = useTransform(fadeScroll, [0, vh * 1.2], ["0%", "1.2%"]);
  const mountain1Scale = useTransform(fadeScroll, [0, vh * 1.2], [1, 1.52]);

  const frontOpacity = useTransform(fadeScroll, [0, vh * 0.55, vh * 1.05, vh * 1.45], [1, 0.85, 0.35, 0]);
  const midOpacity = useTransform(fadeScroll, [0, vh * 0.38, vh * 0.95, vh * 1.3], [1, 0.8, 0.26, 0]);
  const farOpacity = useTransform(fadeScroll, [0, vh * 0.55, vh * 1.15, vh * 1.5], [1, 0.88, 0.35, 0]);
  const skyOpacity = useTransform(fadeScroll, [0, vh * 1.5], [1, 0.76]);
  const veilOpacity = useTransform(fadeScroll, [0, vh * 1.4], [0.18, 0.38]);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const onMove = (event) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerX, pointerY]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <section
      aria-hidden="true"
      className="parallax-bg fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <motion.div
        data-layer="sky"
        style={{ y: skyScrollY, scale: skyScale, opacity: skyOpacity }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: skyX,
            y: skyY,
            scale: 1.06,
          }}
        />
      </motion.div>
      <motion.div
        data-layer="mountain-far"
        style={{
          y: mountain3Y,
          x: mountain3X,
          scale: mountain3Scale,
          opacity: farOpacity,
          transformOrigin: "50% 100%",
        }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: farX,
            y: farY,
            scale: 1.08,
          }}
        />
      </motion.div>
      <motion.div
        data-layer="mountain-mid"
        style={{
          y: mountain2Y,
          x: mountain2X,
          scale: mountain2Scale,
          opacity: midOpacity,
          transformOrigin: "50% 100%",
        }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: midX,
            y: midY,
            scale: 1.1,
          }}
        />
      </motion.div>
      <motion.div
        data-layer="mountain-front"
        style={{
          y: mountain1Y,
          x: mountain1X,
          scale: mountain1Scale,
          opacity: frontOpacity,
          transformOrigin: "50% 100%",
        }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: frontX,
            y: frontY,
            scale: 1.14,
          }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: veilOpacity,
          background:
            "linear-gradient(90deg, rgba(3, 4, 18, .55) 0%, rgba(3, 4, 18, .22) 38%, rgba(3, 4, 18, 0) 62%), linear-gradient(0deg, rgba(3, 4, 18, .7), rgba(3, 4, 18, .15) 42%)",
        }}
      />
      <div aria-hidden="true" className="parallax-tint absolute inset-0" />
    </section>,
    document.body
  );
};

export default ParallaxBackground;

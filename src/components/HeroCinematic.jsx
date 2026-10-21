import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { myProjects, orbitSlides } from "../constants";
import HeroPlanet from "./HeroPlanet";
import ParallaxBackground from "./ParallaxBackground";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const emitFocus = (index) => {
  window.dispatchEvent(
    new CustomEvent("orbit-focus", {
      detail: { index, total: orbitSlides.length, slide: orbitSlides[index] },
    })
  );
};

const nearestIndex = (turn, count) => {
  const step = (Math.PI * 2) / count;
  const raw = Math.round(-turn / step);
  return ((raw % count) + count) % count;
};

export const HeroOrbit = () => {
  const sceneRef = useRef(null);
  const layerRef = useRef(null);
  const cardRefs = useRef([]);
  const metricsRef = useRef(null);
  const motionRef = useRef({
    turn: 0,
    target: 0,
    index: 0,
    dragging: false,
    moved: 0,
    lastX: 0,
    last: performance.now(),
    holdUntil: 0,
    velocity: 0,
  });
  const interactiveRef = useRef(false);
  const dockedRef = useRef(false);
  const focusRef = useRef(null);
  const [interactive, setInteractive] = useState(false);
  const [docked, setDocked] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      const home = document.getElementById("orbit-home");
      const dock = document.getElementById("orbit-dock");
      const projects = document.getElementById("projects");
      const services = document.getElementById("services");
      if (!home || !dock || !projects) return;

      const homeRect = home.getBoundingClientRect();
      const dockRect = dock.getBoundingClientRect();
      const projectsRect = projects.getBoundingClientRect();
      const scrollY = document.documentElement.classList.contains("is-booting")
        ? 0
        : window.scrollY;
      const vh = window.innerHeight;
      const endScroll = Math.max(projectsRect.top + scrollY - vh * 0.18, 1);
      const projectsTop = projectsRect.top + scrollY;
      const projectsHeight = projectsRect.height;
      const servicesBottom = services
        ? services.getBoundingClientRect().top + scrollY + services.offsetHeight
        : projectsTop - vh * 0.35;
      const arriveStart = Math.min(servicesBottom - vh * 0.42, projectsTop - vh * 0.38);
      const arriveEnd = projectsTop - vh * 0.02;
      const leaveStart = projectsTop + Math.max(0, projectsHeight - vh * 0.8);
      const leaveEnd = projectsTop + projectsHeight + vh * 0.1;

      metricsRef.current = {
        start: {
          left: homeRect.left,
          top: homeRect.top + scrollY,
          width: homeRect.width,
          height: homeRect.height,
        },
        end: {
          left: Math.min(
            dockRect.left +
              window.innerWidth * 0.1 -
              clamp(1280 - vh, 0, 360) * 0.38,
            window.innerWidth - homeRect.width * 0.52
          ),
          top: Math.min(
            homeRect.top + scrollY + vh * 0.08,
            (vh - homeRect.height) * 0.42
          ),
          width: dockRect.width,
          height: dockRect.height,
        },
        endScroll,
        arriveStart,
        arriveEnd,
        leaveStart,
        leaveEnd,
      };
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("site-ready", measure);
    const ro = new ResizeObserver(measure);
    const home = document.getElementById("orbit-home");
    const dock = document.getElementById("orbit-dock");
    const projects = document.getElementById("projects");
    const services = document.getElementById("services");
    if (home) ro.observe(home);
    if (dock) ro.observe(dock);
    if (projects) ro.observe(projects);
    if (services) ro.observe(services);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("site-ready", measure);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const cards = cardRefs.current;
    if (!scene) return;

    let frame = 0;
    const count = orbitSlides.length;
    const step = (Math.PI * 2) / count;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = motionRef.current;

    const snapTo = (index) => {
      const next = ((index % count) + count) % count;
      motion.index = next;
      motion.target = -next * step;
      motion.turn = motion.target;
      motion.velocity = 0;
      motion.holdUntil = performance.now() + 2600;
      focusRef.current = next;
      setSlideIndex(next);
      emitFocus(next);
    };

    const onStep = (event) => {
      snapTo(motion.index + (event.detail || 1));
    };
    const onGoto = (event) => {
      if (typeof event.detail === "number") snapTo(event.detail);
    };
    window.addEventListener("orbit-step", onStep);
    window.addEventListener("orbit-goto", onGoto);

    const releaseDrag = () => {
      if (!motion.dragging) return;
      motion.dragging = false;
      motion.holdUntil = performance.now() + 1400;
      motion.index = nearestIndex(motion.turn, count);
    };

    const onPointerDown = (event) => {
      if (!interactiveRef.current) return;
      event.preventDefault();
      motion.dragging = true;
      motion.moved = 0;
      motion.velocity = 0;
      motion.lastX = event.clientX;
      scene.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event) => {
      if (!motion.dragging) return;
      const raw = event.movementX || event.clientX - motion.lastX;
      motion.lastX = event.clientX;
      motion.moved += Math.abs(raw);
      const impulse = raw * 0.002;
      motion.velocity = motion.velocity * 0.62 + impulse * 0.38;
      motion.target += impulse;
    };

    scene.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", releaseDrag);
    window.addEventListener("pointercancel", releaseDrag);

    const placeCards = (eased = 0) => {
      const scale = clamp(window.innerHeight / 1200, 0.84, 1);
      const radius =
        Math.min(scene.clientWidth, 980) * (0.47 + eased * 0.44) * scale;
      const tiltX = (14 - eased * 9) * (Math.PI / 180);
      const tiltZ = (-12 + eased * 9) * (Math.PI / 180);

      cards.forEach((card, index) => {
        if (!card) return;
        const angle = motion.turn + index * step;
        const depth = Math.cos(angle);
        card.style.transform = `translate(-50%, -50%) rotateZ(${tiltZ}rad) rotateX(${tiltX}rad) rotateY(${angle}rad) translateZ(${radius}px)`;
        card.style.zIndex = String(
          depth >= 0 ? Math.round(21 + depth * 19) : Math.round(19 + depth * 18)
        );
        card.style.opacity = "1";
      });
    };

    const placeLayer = (now) => {
      const layer = layerRef.current;
      const metrics = metricsRef.current;
      const dt = Math.min(0.05, (now - motion.last) / 1000);
      motion.last = now;
      if (!layer) return;
      if (!metrics) {
        layer.style.visibility = "hidden";
        return;
      }
      layer.style.visibility = "visible";

      const scrollY = document.documentElement.classList.contains("is-booting")
        ? 0
        : window.scrollY;
      const { start, end, endScroll, arriveStart, arriveEnd, leaveStart, leaveEnd } =
        metrics;
      const progress = reduced ? 0 : clamp(scrollY / endScroll, 0, 1);
      const eased = 1 - (1 - progress) ** 1.25;
      const arrive = reduced
        ? 0
        : clamp(
            (scrollY - arriveStart) / Math.max(arriveEnd - arriveStart, 1),
            0,
            1
          );
      const arriveEase = 1 - (1 - arrive) ** 1.2;
      const leave = reduced
        ? 0
        : clamp(
            (scrollY - leaveStart) / Math.max(leaveEnd - leaveStart, 1),
            0,
            1
          );
      const leaveEase = 1 - (1 - leave) ** 1.35;
      const inWork = !reduced && arriveEase > 0.35;
      const docked = inWork && leaveEase < 0.28;
      const canDrag = inWork && leaveEase < 0.7;

      if (motion.dragging) {
        motion.turn += (motion.target - motion.turn) * Math.min(1, dt * 14);
      } else if (Math.abs(motion.velocity) > 0.00025) {
        motion.turn += motion.velocity;
        motion.target = motion.turn;
        motion.velocity *= 0.86;
        motion.index = nearestIndex(motion.turn, count);
      } else if (!reduced && now >= (motion.holdUntil || 0)) {
        motion.velocity = 0;
        motion.turn += dt * (docked ? 0.016 : 0.08);
        motion.target = motion.turn;
        motion.index = nearestIndex(motion.turn, count);
      }

      const sweep = Math.sin(eased * Math.PI);
      const top =
        start.top * (1 - eased) +
        end.top * eased -
        sweep * window.innerHeight * 0.1 +
        leaveEase * window.innerHeight * 0.26;
      const left =
        start.left * (1 - eased) +
        end.left * eased -
        sweep * window.innerWidth * 0.12 +
        leaveEase * window.innerWidth * 0.07;
      const shrink = 1 - leaveEase * 0.16;
      const width = (start.width * (1 - eased) + end.width * eased) * shrink;
      const height = (start.height * (1 - eased) + end.height * eased) * shrink;
      const spinY = Math.sin(eased * Math.PI * 2) * 12 + leaveEase * 10;
      const spinZ = sweep * 8 + leaveEase * 6;
      const dim = 0.12;
      const hero = 0.88;
      let travel = hero;
      if (leaveEase > 0) {
        travel = (dim + arriveEase * (1 - dim)) * (1 - leaveEase ** 1.3);
      } else if (arriveEase > 0) {
        travel = dim + arriveEase * (1 - dim);
      } else if (progress > 0.05) {
        travel = hero - clamp((progress - 0.05) / 0.16, 0, 1) * (hero - dim);
      }

      layer.style.top = `${top}px`;
      layer.style.left = `${left}px`;
      layer.style.width = `${width}px`;
      layer.style.height = `${height}px`;
      layer.style.opacity = String(travel);
      layer.style.visibility = travel <= 0.02 ? "hidden" : "visible";
      layer.style.setProperty("--orbit-t", eased.toFixed(4));
      layer.style.setProperty(
        "--orbit-scale",
        clamp(window.innerHeight / 1280, 0.76, 1).toFixed(4)
      );
      layer.style.setProperty(
        "--dock-x",
        `${(window.innerWidth / 2 - (left + width / 2)).toFixed(2)}px`
      );
      scene.style.transform = `rotateY(${spinY}deg) rotateZ(${spinZ}deg)`;
      layer.classList.toggle("is-front", canDrag && travel > 0.22);
      scene.style.cursor = canDrag ? (motion.dragging ? "grabbing" : "grab") : "default";

      if (canDrag !== interactiveRef.current) {
        interactiveRef.current = canDrag;
        setInteractive(canDrag);
      }

      if (docked !== dockedRef.current) {
        dockedRef.current = docked;
        setDocked(docked);
        window.dispatchEvent(
          new CustomEvent("orbit-dock", { detail: { docked } })
        );
      }

      if (focusRef.current !== motion.index) {
        focusRef.current = motion.index;
        setSlideIndex(motion.index);
        emitFocus(motion.index);
      }

      return { docked, eased };
    };

    const tick = (now) => {
      const placed = placeLayer(now) ?? {};
      placeCards(placed.eased);
      frame = requestAnimationFrame(tick);
    };

    const placed = placeLayer(performance.now());
    placeCards(placed?.eased);
    if (!reduced) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("orbit-step", onStep);
      window.removeEventListener("orbit-goto", onGoto);
      scene.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", releaseDrag);
      window.removeEventListener("pointercancel", releaseDrag);
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div ref={layerRef} className="hero-orbit-travel">
      <div ref={sceneRef} className="hero-orbit-scene">
        <div className="hero-planet-dust" />
        <div className="hero-planet">
          <HeroPlanet />
        </div>
        {orbitSlides.map((card, index) => (
          <button
            key={card.id}
            type="button"
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className={`hero-orbit-card${interactive ? " is-live" : ""}`}
            tabIndex={interactive ? 0 : -1}
            aria-label={`Show ${card.title}`}
            aria-hidden={!interactive}
            onClick={(event) => {
              if (motionRef.current.moved > 8) {
                event.preventDefault();
                return;
              }
              const s = (Math.PI * 2) / orbitSlides.length;
              motionRef.current.index = index;
              motionRef.current.target = -index * s;
              motionRef.current.turn = -index * s;
              focusRef.current = index;
              emitFocus(index);
            }}
          >
            <div className="hero-orbit-face hero-orbit-face-front">
              <img
                src={card.src}
                alt=""
                className="object-cover object-top w-full h-full"
              />
            </div>
            <div className="hero-orbit-face hero-orbit-face-back" />
          </button>
        ))}
      </div>
      <div
        className={`orbit-dock-bar${docked ? " is-in" : ""}`}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <p className="orbit-hint" aria-hidden="true">
          Drag to turn the orbit
        </p>
        <ol className="orbit-index" aria-label="Selected work">
          {myProjects.map((project, index) => {
            const slide = orbitSlides[slideIndex] ?? orbitSlides[0];
            const current = project.id === slide.projectId;
            return (
              <li key={project.id}>
                <button
                  type="button"
                  aria-current={current ? "true" : undefined}
                  onClick={() => {
                    const target = orbitSlides.findIndex(
                      (item) => item.projectId === project.id
                    );
                    if (target >= 0) {
                      window.dispatchEvent(
                        new CustomEvent("orbit-goto", { detail: target })
                      );
                    }
                  }}
                >
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>{project.title.replace(".net", "").split(" - ")[0]}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>,
    document.body
  );
};

const HeroCinematic = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 isolate">
        <ParallaxBackground />
      </div>
    </div>
  );
};

export default HeroCinematic;

import { useEffect, useRef, useState } from "react";
import BtnArrow from "./BtnArrow";
import { scrollToSection } from "../utils/scrollToSection";

const drumWords = ["Reliable", "Modern", "Scalable"];

const splitChars = (text, start = 0) => {
  let index = start;
  return text.split(" ").map((word, wordIndex) => (
    <span className="wd" key={`${word}-${wordIndex}`}>
      {[...word].map((char) => {
        const i = index;
        index += 1;
        return (
          <span key={`${char}-${i}`} className="ch" style={{ "--i": i }}>
            {char}
          </span>
        );
      })}
      {wordIndex < text.split(" ").length - 1 ? "\u00A0" : null}
    </span>
  ));
};

const HeroText = () => {
  const nameRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [drumIndex, setDrumIndex] = useState(0);

  useEffect(() => {
    if (document.documentElement.classList.contains("is-ready")) {
      const id = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(id);
    }
    const onReady = () => setLoaded(true);
    window.addEventListener("site-ready", onReady);
    return () => window.removeEventListener("site-ready", onReady);
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setDrumIndex((value) => (value + 1) % drumWords.length);
    }, 2200);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    const name = nameRef.current;
    if (!name) return undefined;
    const letters = [...name.querySelectorAll(".ch")];
    const spring = "translate 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), rotate 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    letters.forEach((letter) => {
      letter.style.transition = spring;
    });

    const reset = () => {
      letters.forEach((letter) => {
        letter.style.setProperty("--p", "0");
        letter.style.translate = "";
        letter.style.rotate = "";
      });
    };

    const onMove = (event) => {
      const area = name.getBoundingClientRect();
      const pad = 80;
      if (
        event.clientX < area.left - pad ||
        event.clientX > area.right + pad ||
        event.clientY < area.top - pad ||
        event.clientY > area.bottom + pad
      ) {
        reset();
        return;
      }

      letters.forEach((letter) => {
        const box = letter.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const p = Math.max(0, 1 - dist / 240) ** 2;
        const force = Math.max(0, 1 - dist / 140);
        letter.style.setProperty("--p", p.toFixed(3));
        if (force > 0.02) {
          const push = force * 34;
          const tx = -(dx / dist) * push;
          const ty = -(dy / dist) * push * 0.22;
          const rot = -(dx / dist) * force * 12;
          letter.style.translate = `${tx.toFixed(1)}px ${ty.toFixed(1)}px`;
          letter.style.rotate = `${rot.toFixed(1)}deg`;
        } else {
          letter.style.translate = "";
          letter.style.rotate = "";
        }
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      reset();
    };
  }, []);

  useEffect(() => {
    const buttons = [...document.querySelectorAll("[data-magnet]")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const cleanups = buttons.map((button) => {
      const onMove = (event) => {
        const box = button.getBoundingClientRect();
        const x = (event.clientX - (box.left + box.width / 2)) / box.width;
        const y = (event.clientY - (box.top + box.height / 2)) / box.height;
        button.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
      };
      const onLeave = () => {
        button.style.transform = "";
      };
      button.addEventListener("pointermove", onMove);
      button.addEventListener("pointerleave", onLeave);
      return () => {
        button.removeEventListener("pointermove", onMove);
        button.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div
      className={`hero-copy relative z-20 flex flex-col items-start w-full text-left ${
        loaded ? "is-loaded" : ""
      }`}
    >
      <p className="hero-status">
        <i aria-hidden="true" />
        Available for new projects
      </p>
      <h1 className="hero-h is-split">
        <span className="hero-hi">{splitChars("Hi, I'm")}</span>
        <span ref={nameRef} className="hero-name">
          {splitChars("Luis Melo")}
        </span>
      </h1>
      <p className="hero-role">
        <span className="hero-r1">Full-Stack Software Engineer</span>{" "}
        <span className="hero-r2">crafting</span>{" "}
        <span
          className="drum"
          data-drum
          aria-label={drumWords.join(", ")}
        >
          <span className="drum-sz" aria-hidden="true">
            Scalable
          </span>
          <span
            className="drum-in"
            aria-hidden="true"
            style={{ "--k": drumIndex }}
          >
            {drumWords.map((word, index) => (
              <span
                key={word}
                className={index === drumIndex ? "on" : ""}
                style={{ "--i": index }}
              >
                {word}
              </span>
            ))}
          </span>
        </span>{" "}
        <span className="hero-r3">web products.</span>
      </p>
      <p className="hero-ctas">
        <button
          type="button"
          className="hero-btn solid"
          data-magnet
          onClick={() => scrollToSection("contact")}
        >
          <span className="btn-t">
            <span>Hire Me</span>
            <span aria-hidden="true">Hire Me</span>
          </span>
          <i aria-hidden="true">
            <BtnArrow />
          </i>
        </button>
        <button
          type="button"
          className="hero-btn"
          data-magnet
          onClick={() => scrollToSection("projects")}
        >
          <span className="btn-t">
            <span>View My Work</span>
            <span aria-hidden="true">View My Work</span>
          </span>
          <i aria-hidden="true">
            <BtnArrow />
          </i>
        </button>
      </p>
      <p className="hero-where">
        Remote worldwide · Based in Santo Domingo, Dominican Republic
      </p>
    </div>
  );
};

export default HeroText;

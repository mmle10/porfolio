import { useEffect, useRef, useState } from "react";
import BtnArrow from "../components/BtnArrow";
import VisitorCounter from "../components/VisitorCounter";
import { stats } from "../constants";
import { scrollToSection } from "../utils/scrollToSection";

const splitStat = (value) => {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { num: null, suffix: value };
  return { num: Number(match[1]), suffix: match[2] };
};

const roles = [
  {
    title: "Founder & Full-Stack Developer",
    job: "Codium",
    date: "03/2026 — Present",
  },
  {
    title: "Software Developer",
    job: "Grupo Read",
    date: "06/2024 — 11/2025",
  },
  {
    title: "Software Developer",
    job: "Codika, SRL",
    date: "01/2021 — 06/2023",
  },
];

const About = () => {
  const statsRef = useRef(null);
  const [statsIn, setStatsIn] = useState(false);
  const [shown, setShown] = useState(stats.map((stat) => stat.value.replace(/^\d+/, "0")));

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsIn(true);
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!statsIn) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(stats.map((stat) => stat.value));
      return undefined;
    }

    const parsed = stats.map((stat) => splitStat(stat.value));
    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown(
        parsed.map((part) =>
          part.num === null ? part.suffix : `${Math.round(part.num * eased)}${part.suffix}`
        )
      );
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [statsIn]);

  return (
    <section className="about-section c-space" id="about">
      <div className="about-main">
        <div className="about-copy">
          <p className="about-kicker">About me</p>
          <h2 className="about-title">
            <span>Full-Stack</span>
            <span>Software</span>
            <span>Engineer</span>
            <span>building</span>
            <span>products</span>
            <span>people</span>
            <span className="about-title-accent">actually use.</span>
          </h2>
        </div>

        <article className="about-card">
          <p className="about-card-label">Who I am</p>

          <div className="about-card-head">
            <div className="about-card-identity">
              <span className="about-avatar">
                <img src="/assets/luis.jpg" alt="Luis Eduardo Melo" />
              </span>
              <div>
                <p className="about-name">Luis Eduardo Melo ·</p>
                <p className="about-place">Santo Domingo, Dominican Republic</p>
              </div>
            </div>
            <p className="about-available">
              <span />
              Open to work
            </p>
          </div>

          <p className="about-bio">
            I&apos;m a Full-Stack Software Engineer experienced in team-based
            development and building client applications from scratch. Founder
            of Codium and creator of AutoAgenda, an automotive SaaS with
            payments, real-time updates, and mobile apps.
          </p>
          <p className="about-bio">
            From Codika to Grupo Read, and now Codium, I ship with TypeScript,
            React, Next.js, Node.js, and NestJS from requirements to
            deployment.
          </p>

          <ol className="about-roles">
            {roles.map((role) => (
              <li key={`${role.job}-${role.date}`}>
                <span className="about-role-dot" />
                <div className="about-role-copy">
                  <div className="about-role-row">
                    <p>{role.title}</p>
                    <span>{role.date}</span>
                  </div>
                  <p>{role.job}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="about-actions">
            <button
              type="button"
              className="about-btn about-btn-solid"
              onClick={() => scrollToSection("contact")}
            >
              ✦ Start a project
            </button>
            <button
              type="button"
              className="about-btn about-btn-ghost"
              onClick={() => scrollToSection("projects")}
            >
              See past work
              <i aria-hidden="true">
                <BtnArrow />
              </i>
            </button>
          </div>
        </article>
      </div>

      <ul ref={statsRef} className={`about-stats${statsIn ? " in" : ""}`}>
        {stats.map((stat, index) => (
          <li key={stat.label} style={{ "--i": index }}>
            <b>{shown[index]}</b>
            <span>{stat.label}</span>
            <i className="about-stat-arc" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="17" pathLength="1" />
              </svg>
            </i>
          </li>
        ))}
      </ul>

      <p className="about-visits">
        <VisitorCounter />
      </p>
    </section>
  );
};

export default About;

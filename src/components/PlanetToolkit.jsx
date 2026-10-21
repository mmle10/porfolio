import { useEffect, useRef } from "react";
import { skillLogos, skills } from "../constants";

const Band = ({ items, reverse = false, trackRef }) => (
  <div className={`tk-band${reverse ? " is-rev" : ""}`} aria-hidden="true">
    <div className="tk-band-track" ref={trackRef}>
      {Array.from({ length: 3 }, (_, copy) => (
        <span key={copy}>
          {items.map((skill) => (
            <span key={`${copy}-${skill}`}>
              <b>{skill}</b>
              <i>—</i>
            </span>
          ))}
        </span>
      ))}
    </div>
  </div>
);

const PlanetToolkit = () => {
  const bandSkills = [...skills].reverse();
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    const tracks = [firstRef.current, secondRef.current].filter(Boolean);
    if (!tracks.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 0;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let frame = 0;

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (!reduced) offset += dt * 22 + delta * 0.14;

      tracks.forEach((track, index) => {
        const loop = track.scrollWidth / 3;
        if (!loop) return;
        const dir = index === 0 ? 1 : -1;
        const x = ((offset * dir) % loop + loop) % loop;
        track.style.transform = `translate3d(${-x}px, 0, 0)`;
      });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="toolkit-section" id="stack">
      <div className="toolkit-copy c-space">
        <p className="toolkit-kicker">My Toolkit</p>
        <h2 className="toolkit-title">
          One stack,{" "}
          <span className="toolkit-title-accent">end to end.</span>
        </h2>
        <p className="toolkit-lead">
          The tools behind every project here, from the interface to the
          database. The ring around the planet is written with them.
        </p>
        <ul className="toolkit-list" aria-label="My Toolkit">
          {skills.map((skill, index) => (
            <li key={skill} style={{ "--i": index }}>
              {skillLogos[skill] ? (
                <img src={skillLogos[skill]} alt="" />
              ) : null}
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="toolkit-bands c-space">
        <Band items={skills} trackRef={firstRef} />
        <Band items={bandSkills} reverse trackRef={secondRef} />
      </div>
    </section>
  );
};

export default PlanetToolkit;

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NAME = "Luis Melo";

const paintProgress = (html, value) => {
  const n = Math.max(0, Math.min(100, value));
  html.style.setProperty("--ldp", (n / 100).toFixed(3));
  html.style.setProperty("--ldn", String(Math.round(n)));
};

const PageLoader = () => {
  const [gone, setGone] = useState(() => Boolean(window.__LM_READY));
  const [out, setOut] = useState(false);
  const leaving = useRef(false);

  useLayoutEffect(() => {
    document.getElementById("boot")?.remove();
    if (window.__LM_READY) {
      document.documentElement.classList.add("is-ready");
      document.documentElement.classList.remove("is-booting");
    }
  }, []);

  useEffect(() => {
    if (gone) return undefined;

    const html = document.documentElement;
    html.classList.add("is-booting");
    paintProgress(html, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const min = reduced ? 200 : 1800;
    const max = reduced ? 600 : 4200;
    const started = performance.now();
    let shown = 0;
    let fonts = false;
    let loaded = document.readyState === "complete";
    let frame = 0;
    let hold = 0;

    const finish = () => {
      if (leaving.current) return;
      leaving.current = true;
      paintProgress(html, 100);
      window.__LM_READY = true;
      html.classList.add("is-ready");
      html.classList.remove("is-booting");
      window.dispatchEvent(new Event("site-ready"));
      setOut(true);
      hold = window.setTimeout(() => setGone(true), reduced ? 180 : 1150);
    };

    document.fonts?.ready.then(() => {
      fonts = true;
    });
    const onLoad = () => {
      loaded = true;
    };
    if (loaded) onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    const tick = (now) => {
      const elapsed = now - started;
      const worldReady = (fonts && loaded && elapsed >= min) || elapsed >= max;
      const cap = worldReady ? 100 : 30;
      shown += Math.max(worldReady ? 0.9 : 0.4, (cap - shown) * 0.06);
      shown = Math.min(cap, shown);
      paintProgress(html, shown);
      if (worldReady && shown >= 99.2) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hold);
      window.removeEventListener("load", onLoad);
    };
  }, [gone]);

  if (gone) return null;

  let i = 0;
  const letters = NAME.split(" ").map((word, wordIndex, words) => (
    <span className="pl-wd" key={word}>
      {[...word].map((char) => {
        const index = i;
        i += 1;
        return (
          <span className="pl-ch" style={{ "--i": index }} key={`${char}-${index}`}>
            {char}
          </span>
        );
      })}
      {wordIndex < words.length - 1 ? "\u00A0" : null}
    </span>
  ));

  return createPortal(
    <div
      className={`page-loader${out ? " is-out" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="pl-sky" aria-hidden="true">
        <i className="pl-glow" />
        <i className="pl-grid" />
        <i className="pl-dust" />
      </div>
      <div className="pl-core">
        <div className="pl-orbit">
          <i className="pl-ring r1">
            <b />
          </i>
          <i className="pl-ring r2">
            <b />
          </i>
          <i className="pl-ring r3">
            <b />
          </i>
          <span className="pl-planet" />
          <span className="pl-mark">LM</span>
        </div>
        <p className="pl-name">{letters}</p>
        <p className="pl-sub">
          <span>Full-Stack Software Engineer · Santo Domingo</span>
        </p>
        <div className="pl-prog">
          <span className="pl-n" />
          <span className="pl-bar">
            <i />
          </span>
          <span className="pl-state">Loading the world</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PageLoader;

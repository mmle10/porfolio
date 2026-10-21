import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const budgets = [
  ["under-1k", "< $1k"],
  ["1k-5k", "$1k – $5k"],
  ["5k-15k", "$5k – $15k"],
  ["15k+", "$15k+"],
  ["hourly", "Hourly"],
];

const HireBot = () => {
  const formRef = useRef(null);
  const botRef = useRef(null);
  const lookRef = useRef(null);
  const openedRef = useRef(false);
  const look = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [open, setOpen] = useState(false);
  const [hello, setHello] = useState(false);
  const [wave, setWave] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let helloTimer = 0;
    let waveTimer = 0;
    const start = () => {
      helloTimer = window.setTimeout(() => {
        if (!openedRef.current) setHello(true);
      }, reduced ? 0 : 4200);
      waveTimer = window.setTimeout(() => setWave(true), reduced ? 0 : 900);
    };
    if (document.documentElement.classList.contains("is-ready")) {
      start();
    } else {
      window.addEventListener("site-ready", start, { once: true });
    }
    return () => {
      window.removeEventListener("site-ready", start);
      window.clearTimeout(helloTimer);
      window.clearTimeout(waveTimer);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    let frame = 0;
    const onMove = (event) => {
      const node = botRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width * 0.5)) / window.innerWidth;
      const dy = (event.clientY - (rect.top + rect.height * 0.36)) / window.innerHeight;
      look.current.tx = Math.max(-1, Math.min(1, dx * 3.2)) * 2.4;
      look.current.ty = Math.max(-1, Math.min(1, dy * 3.2)) * 1.8;
    };

    const tick = () => {
      look.current.x += (look.current.tx - look.current.x) * 0.14;
      look.current.y += (look.current.ty - look.current.y) * 0.14;
      lookRef.current?.setAttribute(
        "transform",
        `translate(${look.current.x.toFixed(2)} ${look.current.y.toFixed(2)})`
      );
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const toggle = () => {
    openedRef.current = true;
    setOpen((value) => !value);
    setHello(false);
    setWave(true);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", email: "", budget: "", message: "" });
    } catch {
      setError("Could not send. Try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`hire-bot${open ? " is-open" : ""}`}>
      {open && (
        <section className="hb-card" aria-label="LM-bot">
          <header>
            <span className="hb-ava" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <rect x="4" y="8" width="24" height="18" rx="8" fill="#1a1638" />
                <circle cx="12.5" cy="16.5" r="2.4" fill="#6fe3ee" />
                <circle cx="19.5" cy="16.5" r="2.4" fill="#6fe3ee" />
              </svg>
            </span>
            <span>
              <b>LM-bot</b>
              <small>
                <i /> Luis&apos;s assistant
              </small>
            </span>
            <button type="button" className="hb-x" onClick={toggle} aria-label="Close">
              ×
            </button>
          </header>
          <div className="hb-body">
            {sent ? (
              <p className="hb-msg hb-ok">
                Sent. I&apos;ll get back within 24 hours.
              </p>
            ) : (
              <>
                <p className="hb-msg">
                  Hi! Tell me what you&apos;re building and Luis will get back
                  to you within 24 hours.
                </p>
                <form ref={formRef} onSubmit={onSubmit}>
                  <div className="hb-row">
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={onChange}
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={onChange}
                    />
                  </div>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={onChange}
                    className={form.budget ? "is-set" : ""}
                  >
                    <option value="">Budget (optional)</option>
                    {budgets.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    rows="3"
                    required
                    placeholder="What are you building? A rough idea is fine."
                    value={form.message}
                    onChange={onChange}
                  />
                  {error ? <p className="hb-err">{error}</p> : null}
                  <button type="submit" className="hb-send" disabled={sending}>
                    {sending ? "Sending..." : "Send to Luis →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      )}

      {!open && hello && (
        <button type="button" className="hb-bubble" onClick={toggle}>
          Got a project in mind?
        </button>
      )}

      <button
        type="button"
        ref={botRef}
        className={`hb-bot${wave ? " wave" : ""}`}
        aria-label="Say hi to LM-bot"
        aria-expanded={open}
        onClick={toggle}
      >
        <svg viewBox="0 0 96 112" width="76" height="88" aria-hidden="true">
          <defs>
            <linearGradient id="hb-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: "var(--violet-l)" }} />
              <stop offset="1" style={{ stopColor: "var(--violet)" }} />
            </linearGradient>
            <radialGradient id="hb-l" cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#fff" />
              <stop offset=".4" style={{ stopColor: "var(--rose)" }} />
              <stop offset="1" style={{ stopColor: "var(--rose)" }} stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse className="hb-shadow" cx="48" cy="108" rx="22" ry="3.5" fill="#000" opacity=".35" />
          <g className="hb-float">
            <line x1="48" y1="14" x2="48" y2="4" stroke="#c9bdf5" strokeWidth="2.5" strokeLinecap="round" />
            <circle className="hb-tip" cx="48" cy="4" r="5" fill="url(#hb-l)" />
            <circle cx="48" cy="4" r="2.6" style={{ fill: "var(--rose)" }} />
            <rect x="14" y="14" width="68" height="50" rx="20" fill="url(#hb-g)" />
            <rect x="9" y="32" width="7" height="16" rx="3.5" fill="#7a55ef" />
            <rect x="80" y="32" width="7" height="16" rx="3.5" fill="#7a55ef" />
            <rect x="22" y="22" width="52" height="34" rx="13" fill="#14123a" />
            <g className="hb-eyes">
              <g ref={lookRef}>
                <ellipse cx="38" cy="37" rx="5" ry="6" style={{ fill: "var(--aqua)" }} />
                <ellipse cx="58" cy="37" rx="5" ry="6" style={{ fill: "var(--aqua)" }} />
                <circle cx="39.5" cy="35" r="1.6" fill="#fff" />
                <circle cx="59.5" cy="35" r="1.6" fill="#fff" />
              </g>
            </g>
            <path d="M40 47 q8 6 16 0" stroke="#6fe3ee" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            <circle cx="30" cy="47" r="2.6" style={{ fill: "var(--rose)" }} opacity=".7" />
            <circle cx="66" cy="47" r="2.6" style={{ fill: "var(--rose)" }} opacity=".7" />
            <rect x="30" y="68" width="36" height="26" rx="10" fill="url(#hb-g)" />
            <circle cx="48" cy="81" r="5" fill="#6fe3ee" className="hb-heart" />
            <g className="hb-arm-l">
              <rect x="20" y="70" width="9" height="20" rx="4.5" fill="#7a55ef" />
            </g>
            <g className="hb-arm-r">
              <rect x="67" y="70" width="9" height="20" rx="4.5" fill="#7a55ef" />
              <circle cx="71.5" cy="91" r="5" fill="#9d82ff" />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default HireBot;

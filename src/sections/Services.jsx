import { useEffect, useRef } from "react";
import { services } from "../constants";
import BtnArrow from "../components/BtnArrow";
import { scrollToSection } from "../utils/scrollToSection";

const icons = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M7 6h.01M10 6h.01" />
    </>
  ),
  api: (
    <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13.5 4l-3 16" />
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18.5h2" />
    </>
  ),
  admin: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.2" />
      <rect x="14" y="3" width="7" height="5" rx="1.2" />
      <rect x="14" y="12" width="7" height="9" rx="1.2" />
      <rect x="3" y="16" width="7" height="5" rx="1.2" />
    </>
  ),
};

const DeckArt = ({ type }) => {
  if (type === "web") {
    return (
      <svg className="deck-art art-web" viewBox="0 0 240 140" aria-hidden="true">
        <rect className="a-fr" x="10" y="12" width="220" height="118" rx="10" />
        <path className="a-fr" d="M10 32h220" />
        <circle className="a-dot" cx="24" cy="22" r="3" />
        <circle className="a-dot" cx="35" cy="22" r="3" />
        <circle className="a-dot" cx="46" cy="22" r="3" />
        <rect className="a-b b1" x="24" y="44" width="120" height="12" rx="3" />
        <rect className="a-b b2" x="24" y="62" width="84" height="7" rx="3" />
        <rect className="a-cta" x="24" y="78" width="46" height="14" rx="7" />
        <rect className="a-c c1" x="24" y="100" width="56" height="20" rx="4" />
        <rect className="a-c c2" x="88" y="100" width="56" height="20" rx="4" />
        <rect className="a-c c3" x="152" y="100" width="64" height="20" rx="4" />
        <rect className="a-img" x="156" y="44" width="60" height="48" rx="5" />
        <path className="a-cur" d="M0 0l0 13 4-4 3 7 3-1-3-7 6 0z" />
      </svg>
    );
  }

  if (type === "mobile") {
    return (
      <svg className="deck-art art-mobile" viewBox="0 0 240 140" aria-hidden="true">
        <rect className="a-fr" x="88" y="6" width="64" height="128" rx="12" />
        <path className="a-fr" d="M112 14h16" />
        <g className="a-list">
          <rect x="98" y="30" width="44" height="12" rx="3" />
          <rect x="98" y="48" width="44" height="12" rx="3" />
          <rect x="98" y="66" width="44" height="12" rx="3" />
          <rect x="98" y="84" width="44" height="12" rx="3" />
          <rect x="98" y="102" width="44" height="12" rx="3" />
          <rect x="98" y="120" width="44" height="12" rx="3" />
        </g>
        <g className="a-note">
          <rect x="94" y="20" width="52" height="16" rx="8" />
          <circle cx="103" cy="28" r="3.5" />
        </g>
        <path className="a-fr a-ios" d="M40 70h28M172 70h28" />
        <text className="a-t" x="54" y="62" textAnchor="middle">
          iOS
        </text>
        <text className="a-t" x="186" y="62" textAnchor="middle">
          Android
        </text>
      </svg>
    );
  }

  if (type === "admin") {
    return (
      <svg className="deck-art art-admin" viewBox="0 0 240 140" aria-hidden="true">
        <rect className="a-fr" x="10" y="12" width="220" height="118" rx="10" />
        <rect className="a-side" x="10" y="12" width="40" height="118" rx="10" />
        <g className="a-bars">
          <rect x="66" y="70" width="12" height="50" style={{ "--d": 0 }} />
          <rect x="84" y="70" width="12" height="50" style={{ "--d": 1 }} />
          <rect x="102" y="70" width="12" height="50" style={{ "--d": 2 }} />
          <rect x="120" y="70" width="12" height="50" style={{ "--d": 3 }} />
          <rect x="138" y="70" width="12" height="50" style={{ "--d": 4 }} />
        </g>
        <path className="a-line" pathLength="1" d="M160 108 L176 92 L190 98 L204 70 L218 76" />
        <rect className="a-b b1" x="66" y="28" width="70" height="10" rx="3" />
        <rect className="a-chip" x="160" y="26" width="56" height="14" rx="7" />
      </svg>
    );
  }

  return (
    <svg className="deck-art art-api" viewBox="0 0 240 140" aria-hidden="true">
      <rect className="a-fr" x="14" y="44" width="58" height="52" rx="8" />
      <text className="a-t" x="43" y="75" textAnchor="middle">
        client
      </text>
      <rect className="a-fr" x="168" y="30" width="58" height="40" rx="8" />
      <text className="a-t" x="197" y="54" textAnchor="middle">
        api
      </text>
      <path className="a-fr" d="M168 104c0-5 58-5 58 0v20c0 5-58 5-58 0z M168 104c0 5 58 5 58 0" />
      <text className="a-t" x="197" y="122" textAnchor="middle">
        db
      </text>
      <path className="a-wire" d="M72 62 C110 40 130 44 168 50" />
      <path className="a-wire" d="M168 58 C130 66 110 78 72 80" />
      <path className="a-wire" d="M197 70 V100" />
      <circle className="a-pk" r="4">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M72 62 C110 40 130 44 168 50" />
      </circle>
      <circle className="a-pk b" r="4">
        <animateMotion
          dur="2.2s"
          begin="1.1s"
          repeatCount="indefinite"
          path="M168 58 C130 66 110 78 72 80"
        />
      </circle>
      <circle className="a-pk c" r="3">
        <animateMotion dur="1.1s" begin=".5s" repeatCount="indefinite" path="M197 70 V100" />
      </circle>
    </svg>
  );
};

const Services = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.35 }
    );
    cards.forEach((card) => io.observe(card));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateSink = () => {
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next || reduced) {
          card.style.setProperty("--sink", "0");
          return;
        }
        const current = card.getBoundingClientRect();
        const following = next.getBoundingClientRect();
        const sink = Math.min(
          1,
          Math.max(0, (current.bottom - following.top) / Math.max(1, current.height))
        );
        card.style.setProperty("--sink", sink.toFixed(3));
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateSink();
      });
    };

    updateSink();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onCardMove = (event) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - box.left}px`);
    card.style.setProperty("--my", `${event.clientY - box.top}px`);
  };

  return (
    <section className="services-section" id="services">
      <div className="services-wrap c-space">
        <div className="services-head">
          <p className="services-kicker">Services · 0{services.length}</p>
          <h2>
            What I can build for you,{" "}
            <em>end-to-end.</em>
          </h2>
          <p className="services-lead">
            One engineer for the whole product from interface, API, database,
            and deploy so nothing gets lost between teams and you always
            know who to call.
          </p>
        </div>

        <div className="deck">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="deck-c"
              style={{ "--i": index }}
              ref={(node) => {
                cardsRef.current[index] = node;
              }}
            >
              <div className="deck-in" onMouseMove={onCardMove}>
                <div className="deck-l">
                  <p className="deck-n">
                    Service {service.id} / 0{services.length}
                  </p>
                  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                    {icons[service.art]}
                  </svg>
                  <h3>{service.title}</h3>
                  <p className="deck-d">{service.description}</p>
                  <button
                    type="button"
                    className="deck-link"
                    onClick={() => scrollToSection("contact")}
                  >
                    Start this project{" "}
                    <i aria-hidden="true">
                      <BtnArrow />
                    </i>
                  </button>
                </div>

                <div className="deck-r">
                  <div className="deck-top">
                    <span className="deck-big" aria-hidden="true">
                      {String(parseInt(service.id, 10))}
                    </span>
                    <DeckArt type={service.art} />
                  </div>
                  {service.logos?.length ? (
                    <div className="deck-logos-row">
                      {service.logos.map((logo) => (
                        <img
                          key={logo.alt}
                          className="deck-logo"
                          src={logo.src}
                          alt={logo.alt}
                          title={logo.alt}
                          width="56"
                          height="56"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  ) : null}
                  <p className="deck-k">What&apos;s included</p>
                  <ul>
                    {service.items.map((item, itemIndex) => (
                      <li key={item} style={{ "--j": itemIndex }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="scope">
          <div>
            <p className="services-kicker">Have a different idea?</p>
            <h3>Let&apos;s scope it together.</h3>
            <p>
              Send me a brief and I&apos;ll reply within 24 hours with a
              realistic plan and next steps.
            </p>
          </div>
          <button
            type="button"
            className="scope-btn"
            onClick={() => scrollToSection("contact")}
          >
            <span className="scope-btn-t">
              <span>Start a project</span>
              <span aria-hidden="true">Start a project</span>
            </span>
            <i aria-hidden="true">
              <BtnArrow />
            </i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;

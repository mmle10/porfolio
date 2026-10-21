import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CustomSelect from "../components/CustomSelect";
import { scrollToSection } from "../utils/scrollToSection";

const links = [
  ["home", "Home"],
  ["about", "About"],
  ["services", "Services"],
  ["projects", "Work"],
  ["contact", "Contact"],
];

function Navigation({ setIsOpen, compact }) {
  const handleLinkClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <ul
      className={
        compact
          ? "flex items-center gap-6 px-6 py-[10px] text-sm rounded-full bg-white/8 border border-white/10 backdrop-blur-xl"
          : "flex flex-col items-center gap-5"
      }
    >
      {links.map(([id, label]) => (
        <li key={id}>
          <button
            className="text-white/70 hover:text-white transition-colors"
            onClick={() => handleLinkClick(id)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}

const THEMES = {
  aqua: "Aqua",
  violet: "Violet",
  rose: "Rose",
};

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = window.localStorage.getItem("lm-theme-v2");
      return THEMES[saved] ? saved : "aqua";
    } catch {
      return "aqua";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("lm-theme-v2", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [away, setAway] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, y / max) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      setScrolled(y > 24);
      if (isOpen || reduce || y < 80 || y <= last) {
        setAway(false);
      } else {
        setAway(true);
      }
      last = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isOpen]);

  return (
    <>
    <div className="site-progress" aria-hidden="true">
      <i ref={progressRef} />
    </div>
    <div
      className={`site-top${scrolled ? " is-scrolled" : ""}${away ? " is-away" : ""}`}
    >
      <div className="site-top-in flex items-center justify-between px-5 py-4 mx-auto max-w-7xl md:px-8">
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 text-left cursor-pointer"
        >
          <span className="btn-accent flex items-center justify-center flex-none w-10 h-10 rounded-full text-[13px] font-bold tracking-wide text-white ring-1 ring-white/25">
            LM
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-white">
              Luis Melo
            </span>
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/50">
              Full-Stack Engineer
            </span>
          </span>
        </button>
        <nav className="hidden lg:block">
          <Navigation setIsOpen={setIsOpen} compact />
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <CustomSelect
              onChange={setTheme}
              value={{ value: theme, label: THEMES[theme] }}
            />
          </div>
          <button
            className="hidden px-4 py-2 text-sm font-medium text-black bg-white rounded-full hover-animation lg:inline-flex"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-white/80 hover:text-white focus:outline-none lg:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="px-5 pb-5 lg:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="p-5 border rounded-2xl border-white/10 bg-primary/90 backdrop-blur-xl">
            <Navigation setIsOpen={setIsOpen} />
            <button
              className="w-full px-4 py-2 mt-5 text-sm font-medium text-black bg-white rounded-full"
              onClick={() => {
                scrollToSection("contact");
                setIsOpen(false);
              }}
            >
              Hire Me
            </button>
            <div className="mt-4 md:hidden">
              <CustomSelect
                onChange={setTheme}
                value={{ value: theme, label: THEMES[theme] }}
              />
            </div>
          </nav>
        </motion.div>
      )}
    </div>
    </>
  );
};

export default Navbar;

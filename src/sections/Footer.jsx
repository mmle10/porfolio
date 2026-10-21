import { mySocials } from "../constants";

const icons = {
  Linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5v6M8 7.6v.02M11.5 16.5v-3.7c0-1.3.8-2 1.9-2s1.9.8 1.9 2.1v3.6" />
    </>
  ),
  GitHub: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.9a3.4 3.4 0 00-.9-2.6c3-.3 6.1-1.5 6.1-6.6a5 5 0 00-1.4-3.5 4.7 4.7 0 00-.1-3.5s-1.1-.3-3.5 1.3a12 12 0 00-6.4 0C6.8 2.6 5.7 2.9 5.7 2.9a4.7 4.7 0 00-.1 3.5A5 5 0 004.2 9.9c0 5.1 3.1 6.3 6.1 6.6a3.4 3.4 0 00-.9 2.6V21" />
  ),
  Instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="17.2" cy="6.8" r="0.8" />
    </>
  ),
};

const Footer = () => {
  return (
    <footer className="site-foot">
      <div className="site-foot-card">
      <div className="site-foot-top">
        <div>
          <p className="site-foot-name">Luis Melo</p>
          <p className="site-foot-role">Full-Stack Software Engineer</p>
        </div>
        <div className="site-foot-meta">
          <p>
            <small>Based in</small>
            Santo Domingo
          </p>
          <p>
            <small>Phone</small>
            <a href="tel:+18296056147">+1 829 605 6147</a>
          </p>
          <p>
            <small>Email</small>
            <a href="mailto:luismelo93@hotmail.com">luismelo93@hotmail.com</a>
          </p>
        </div>
        <nav className="site-foot-socials" aria-label="Social">
          {mySocials.map((social) => (
            <a
              href={social.href}
              key={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {icons[social.name]}
              </svg>
              {social.name === "Linkedin" ? "LinkedIn" : social.name}
            </a>
          ))}
        </nav>
      </div>
      <p className="site-foot-copy">© 2026 Luis Melo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

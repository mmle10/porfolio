import { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import BtnArrow from "../components/BtnArrow";

const EMAIL = "luismelo93@hotmail.com";
const PHONE = "+1 829 605 6147";

const budgets = [
  ["under-1k", "< $1k"],
  ["1k-5k", "$1k – $5k"],
  ["5k-15k", "$5k – $15k"],
  ["15k+", "$15k+"],
  ["hourly", "Hourly"],
];

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const meter = useMemo(() => {
    const filled = ["name", "email", "budget", "message"].filter(
      (key) => formData[key].trim()
    ).length;
    return filled / 4;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      showAlertMessage("danger", "Could not copy email.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      showAlertMessage("success", "Email sent successfully!");
      setFormData({ name: "", email: "", budget: "", message: "" });
    } catch {
      showAlertMessage("danger", "Failed to send email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="ct-h">
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="contact-wrap">
        <div className="contact-grid">
          <div>
            <p className="faq-kicker">Let&apos;s talk</p>
            <h2 id="ct-h">
              Hire a Full-Stack engineer.{" "}
              <span className="title-accent">Let&apos;s ship your idea.</span>
            </h2>
            <p className="faq-lead">
              Whether you&apos;re launching something new, scaling what you
              have, or rescuing a stuck project, drop me a line and I&apos;ll
              get back within 24 hours.
            </p>
            <ul className="ct-facts">
              <li>
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
                </svg>
                <span>
                  <small>Email</small>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </span>
                <button
                  type="button"
                  className={`ct-copy${copied ? " done" : ""}`}
                  onClick={copyEmail}
                >
                  <span className="copy-a">Copy</span>
                  <span className="copy-b">Copied</span>
                </button>
              </li>
              <li>
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.5 4.5h3l1.4 3.4-1.8 1.1a12 12 0 006.9 6.9l1.1-1.8 3.4 1.4v3A2 2 0 0118.5 20 15.5 15.5 0 014 5.5a2 2 0 012.5-2z" />
                </svg>
                <span>
                  <small>Phone</small>
                  <a href="tel:+18296056147">{PHONE}</a>
                </span>
              </li>
              <li>
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <span>
                  <small>Based in</small>
                  <b>Santo Domingo · Remote worldwide</b>
                </span>
              </li>
              <li>
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
                <span>
                  <small>Response time</small>
                  <b>Usually within 24 hours</b>
                </span>
              </li>
            </ul>
          </div>

          <form className="ct-form" onSubmit={handleSubmit} ref={formRef}>
            <h3>Send a brief</h3>
            <div className="ct-meter" aria-hidden="true">
              <i style={{ transform: `scaleX(${meter})` }} />
              <span>{Math.round(meter * 100)}%</span>
            </div>
            <div className="ct-row">
              <label className="ct-fld">
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                />
                <span>Your name</span>
              </label>
              <label className="ct-fld">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                />
                <span>Email</span>
              </label>
            </div>
            <fieldset className="ct-budget">
              <legend>Project budget</legend>
              {budgets.map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="budget"
                    value={value}
                    checked={formData.budget === value}
                    onChange={handleChange}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <label className="ct-fld">
              <textarea
                name="message"
                rows="4"
                required
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
              />
              <span>What are you building?</span>
            </label>
            <button type="submit" className="scope-btn ct-send" disabled={isLoading}>
              <span className="scope-btn-t">
                <span>{isLoading ? "Sending..." : "Send message"}</span>
                <span aria-hidden="true">
                  {isLoading ? "Sending..." : "Send message"}
                </span>
              </span>
              <i aria-hidden="true">
                <BtnArrow />
              </i>
            </button>
            <p className="ct-fine">I read every brief myself. No bots, no noise.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import BtnArrow from "../components/BtnArrow";
import { faqs } from "../constants";
import { scrollToSection } from "../utils/scrollToSection";

const FAQ = () => {
  return (
    <section className="faq-section" id="faq" aria-labelledby="fq-h">
      <div className="faq-wrap">
        <div className="faq-grid">
          <aside className="faq-side">
            <div>
              <p className="faq-kicker">Before you write</p>
              <h2 id="fq-h">
                Good to <span className="title-accent">know.</span>
              </h2>
              <p className="faq-lead">
                Quick answers on timing, time zones, budgets, and how a
                project actually runs from brief to handoff.
              </p>
            </div>
            <div className="faq-ask">
              <span className="faq-ask-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 5h16v11H8l-4 4z" />
                  <path d="M8.5 9.5h7M8.5 12.5h4.5" />
                </svg>
              </span>
              <div>
                <b>Still have a question?</b>
                <p>
                  Ask me directly. I read every message myself and reply
                  within 24 hours.
                </p>
                <button
                  type="button"
                  className="faq-ask-btn"
                  onClick={() => scrollToSection("contact")}
                >
                  Ask me anything
                  <i aria-hidden="true">
                    <BtnArrow />
                  </i>
                </button>
              </div>
            </div>
          </aside>

          <div className="faq-l">
            {faqs.map((faq, index) => (
              <details key={faq.question} name="faq" defaultOpen={index === 0}>
                <summary>
                  <span className="faq-n" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-q">{faq.question}</span>
                  <i aria-hidden="true" />
                </summary>
                <div className="faq-a">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

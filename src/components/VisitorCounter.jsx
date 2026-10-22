import { useEffect, useState } from "react";

const NAMESPACE = "luis-melo-portfolio";
const KEY = "visits";

const VisitorCounter = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;

    let counted = false;
    try {
      counted = window.sessionStorage.getItem("lm-counted") === "1";
    } catch {
      counted = false;
    }

    const shouldHit = import.meta.env.PROD && !counted;
    const url = `https://abacus.jasoncameron.dev/${shouldHit ? "hit" : "get"}/${NAMESPACE}/${KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled || typeof data?.value !== "number") return;
        setCount(data.value);
        if (shouldHit) {
          try {
            window.sessionStorage.setItem("lm-counted", "1");
          } catch {
            /* storage unavailable */
          }
        }
      })
      .catch(() => {
        /* counter unavailable: stay hidden */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  const formatted = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);

  return (
    <>
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>
        {count === 1
          ? "1 person visited this page"
          : `${formatted} people visited this page`}
      </span>
    </>
  );
};

export default VisitorCounter;

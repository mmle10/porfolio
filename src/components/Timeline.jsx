import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const Timeline = ({ data }) => {
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    const items = itemsRef.current.filter(Boolean);
    if (!list || !fill || !items.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.28 }
    );
    items.forEach((item) => io.observe(item));

    let frame = 0;
    const update = () => {
      const line = fill.parentElement.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = clamp((vh * 0.42 - line.top) / Math.max(line.height, 1), 0, 1);
      fill.style.transform = `scaleY(${progress})`;

      const marker = vh * 0.42;
      items.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        item.classList.toggle("lit", top <= marker);
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [data]);

  return (
    <div className="experience-wrap c-space">
      <div className="experience-head">
        <p className="about-kicker">Experience</p>
        <h2>
          A track record of{" "}
          <span className="title-accent">shipping &amp; leading.</span>
        </h2>
      </div>

      <ol className="tl" ref={listRef}>
        <span className="tl-line" aria-hidden="true">
          <i ref={fillRef} />
        </span>
        {data.map((item, index) => (
          <li
            key={`${item.job}-${item.date}`}
            className="tl-i"
            ref={(node) => {
              itemsRef.current[index] = node;
            }}
          >
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-when">
              <p>{item.date}</p>
            </div>
            <div className="tl-body">
              <h3>{item.title}</h3>
              <p className="tl-at">{item.at || item.job}</p>
              <ul>
                {item.contents.map((content, itemIndex) => (
                  <li key={content} style={{ "--j": itemIndex }}>
                    {content}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

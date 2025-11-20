import React, { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "", threshold = 0.18 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`${className} ${visible ? "reveal-visible" : "hidden-reveal"}`}>
      {children}
    </div>
  );
}

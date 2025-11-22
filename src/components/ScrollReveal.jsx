// components/ScrollReveal.jsx
import React, { useEffect, useRef } from "react";

// 🔥 UPDATED: useScrollReveal Hook लॉजिक को सीधे कंपोनेंट में इस्तेमाल किया जा रहा है
// ताकि यह 'delay' prop को आसानी से मैनेज कर सके और Vaulta-style CSS classes का उपयोग कर सके।
export default function ScrollReveal({ 
  children, 
  className = "", 
  threshold = 0.1, // Slightly lower threshold for quicker trigger
  delay = 0 // NEW: Delay prop for staggering
}) {
  const ref = useRef(null);
  
  // 1. CSS Custom Property for Staggering
  const staggerStyle = {
    '--stagger-delay': `${delay}s`
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Intersection Observer Configuration
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 🔥 MODIFIED: Apply the final CSS class for animation (.revealed)
            el.classList.add("revealed"); 
            obs.unobserve(el);
          }
        });
      },
      { 
        threshold, 
        rootMargin: '0px 0px -50px 0px' // Trigger slightly early
      } 
    );
    
    // Start observing the element
    obs.observe(el);
    
    // Cleanup function
    return () => obs.disconnect();

  }, [threshold, delay]); // delay को dependency array में शामिल किया गया

  return (
    // 🔥 MODIFIED: Apply the base animation class (.stagger-reveal) and the delay style
    <div 
      ref={ref} 
      className={`${className} stagger-reveal`} 
      style={staggerStyle}
    >
      {children}
    </div>
  );
}
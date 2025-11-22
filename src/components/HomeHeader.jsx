import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Zap } from "lucide-react"; 

// 🔥 MODIFIED: Component is now named HomeHeader for clarity.
// The prop 'isOverlay' controls whether it looks sticky (default) or transparent.
export default function HomeHeader({ isOverlay = false }) { 
  
  const [theme, setTheme] = useState(
    localStorage.getItem("ps_theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark")
  );
  
  const toggleTheme = () => {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    // Theme logic remains the same
    if (theme === "light") document.documentElement.classList.add("light");
    else document.documentElement.classList.remove("light");
    localStorage.setItem("ps_theme", theme);
  }, [theme]);

  // 💡 KEY FIX: Determine class based on isOverlay prop
  const headerClass = isOverlay ? "hero-header-overlay" : "neo-header";
  const innerClass = isOverlay ? "hero-header-inner" : "neo-header-inner";
  
  // Theme Toggle बटन के लिए अतिरिक्त स्टाइल (केवल ओवरले के लिए)
  const themeToggleStyle = isOverlay 
    ? { border: '1px solid rgba(255, 255, 255, 0.15)' } 
    : {};
  
  // Enroll/Join Us बटन के लिए ओवरले स्टाइलिंग
  const joinButtonStyle = isOverlay 
    ? { padding: "6px 12px", fontSize: 13, boxShadow: 'none' } 
    : { padding: "8px 14px", fontSize: 14 };


  return (
    // 🔥 Applying the dynamic class
    <header className={headerClass}>
      <div className={innerClass}>
        
        {/* Logo (Top Left) - MODIFIED to use only 'PS' */}
        <Link to="/" className="logo">
          {/* Zap Icon (Text Logo Mark) */}
          <div className="logo-mark float-slow" aria-hidden="true">
            PS
          </div>
          {/* 🔥 MODIFIED: 'ProgressShala' को 'PS' से बदला गया */}
          <div className="logo-text">
            <div style={{ fontWeight: 800, fontSize: 18 }}>ProgressShala</div>
            <div className="muted" style={{ fontSize: 12 }}>
              Learn • Intern • Grow
            </div>
          </div>
        </Link>

        {/* Controls (Top Right) */}
        <div className="neo-controls">
          <Link
            to="/login"
            className="enroll-btn"
            style={joinButtonStyle} // Applying conditional style
          >
            Join Us 
          </Link>
          
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            style={themeToggleStyle} // Applying conditional style
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
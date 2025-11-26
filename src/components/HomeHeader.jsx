import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

// 🔥 Pre-set theme to avoid flicker
const savedTheme = localStorage.getItem("ps_theme") ||
  (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

document.documentElement.classList.toggle("light", savedTheme === "light");

export default function HomeHeader({ isOverlay = false, openLogin }) {
  const [theme, setTheme] = useState(savedTheme);

  const toggleTheme = () => {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("ps_theme", theme);
  }, [theme]);

  // Dynamic classes based on overlay
  const headerClass = isOverlay ? "hero-header-overlay" : "neo-header";
  const innerClass = isOverlay ? "hero-header-inner" : "neo-header-inner";

  // Theme toggle button styling
  const themeToggleStyle = isOverlay
    ? { border: '1px solid rgba(255, 255, 255, 0.15)', background: 'transparent', color: 'white' }
    : {};

  // Join button styling
  const joinButtonStyle = isOverlay
    ? { padding: "6px 12px", fontSize: 13, boxShadow: 'none', color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }
    : { padding: "8px 14px", fontSize: 14, color: 'white', backgroundColor: '#007bff' };

  return (
    <header className={headerClass}>
      <div className={innerClass}>

        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-mark float-slow" aria-hidden="true">
            PS
          </div>
        </Link>

        {/* Controls */}
        <div className="neo-controls">
          <button
            className="enroll-btn"
            style={joinButtonStyle}
            onClick={openLogin}
          >
            Join Us
          </button>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            style={themeToggleStyle}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

      </div>
    </header>
  );
}

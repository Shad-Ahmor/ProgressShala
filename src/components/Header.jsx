import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Zap } from "lucide-react"; 

export default function Header() {
  // ... (theme state, open state, useLocation, toggleTheme, useEffects remain unchanged) ...

  const [theme, setTheme] = useState(
    // LocalStorage > System Preference > Default to 'dark'
    localStorage.getItem("ps_theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark")
  );
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  const toggleTheme = () => {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (theme === "light") document.documentElement.classList.add("light");
    else document.documentElement.classList.remove("light");
    localStorage.setItem("ps_theme", theme);
  }, [theme]);

  useEffect(() => setOpen(false), [loc]);


  return (
    <header className="neo-header">
      <div className="neo-header-inner">
        
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-mark" aria-hidden="true">
            <Zap size={24} /> 
          </div>
          <div className="logo-text">
            <div style={{ fontWeight: 800, fontSize: 18 }}>ProgressShala</div>
            <div className="muted" style={{ fontSize: 12 }}>
              Learn • Intern • Grow
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className={`neo-nav ${open ? "open" : ""}`} role="navigation">
          <Link to="/courses">Courses</Link>
          <Link to="/internships">Internships</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Controls: Order adjusted for clarity (Login > Theme > Menu) */}
        <div className="neo-controls">
          <Link
            to="/login"
            className="enroll-btn"
            style={{ padding: "8px 14px", fontSize: 14 }}
          >
            Login
          </Link>
          
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="menu-btn"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
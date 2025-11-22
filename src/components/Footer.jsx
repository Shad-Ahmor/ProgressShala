import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
return ( 
  <footer className="neo-footer"> 
    <div className="neo-footer-inner"> 
      
      {/* 1. Brand/Logo */}
      <div className="footer-brand">
        {/* 🔥 MODIFIED: Added color for prominence */}
        <div style={{ fontWeight: 800, color: 'var(--neon-primary)' }}>ProgressShala</div> 
        <div className="muted" style={{ fontSize: 13 }}>Industry-aligned learning paths</div> 
      </div>


      {/* 2. Links */}
      <div className="footer-links">
        {/* 🔥 MODIFIED: Added className for consistent styling (CSS handles the hover/glow) */}
        <Link to="/" className="footer-link">Home</Link>
        <Link to="/courses" className="footer-link">Courses</Link>
        <Link to="/contact" className="footer-link">Contact</Link>
      </div>

      {/* 3. Copyright */}
      <div className="muted">© {new Date().getFullYear()} ProgressShala — All Rights Reserved</div>
    </div>
  </footer>
);
}
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
return ( <footer className="neo-footer"> <div className="neo-footer-inner"> <div>
<div style={{ fontWeight: 800 }}>ProgressShala</div>
<div className="muted" style={{ fontSize: 13 }}>Industry-aligned learning paths</div> </div>


    <div className="footer-links">
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/contact">Contact</Link>
    </div>

    <div className="muted">© {new Date().getFullYear()} ProgressShala — All Rights Reserved</div>
  </div>
</footer>


);
}

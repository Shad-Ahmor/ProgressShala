import React from "react";
import { X } from "lucide-react";

export default function LoginModal({ onClose = () => {} }) {
  return (
    <div className="login-modal" onClick={onClose}>
      {/* Changed .card to .neo-card */}
      <div className="login-box neo-card" onClick={e => e.stopPropagation()}>
        <button className="close-x" onClick={onClose} aria-label="Close"><X /></button>
        <h3 style={{ marginTop: 8 }}>Sign in</h3>
        <p className="muted">Sign in to access your courses</p>
        <form onSubmit={(e)=>{ e.preventDefault(); onClose(); alert("Signed in (demo)"); }}>
          {/* Changed .input to .search-input (Neon CSS) */}
          <input className="search-input" placeholder="Email" type="email" required style={{ marginTop: 12 }} />
          <input className="search-input" placeholder="Password" type="password" required style={{ marginTop: 12 }} />
          {/* Changed .btn .btn-primary to .enroll-btn (Neon Button) */}
          <button className="enroll-btn" style={{ marginTop: 12, width: "100%" }}>Sign in</button>
        </form>
      </div>
    </div>
  );
}
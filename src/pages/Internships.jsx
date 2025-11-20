import React from "react";
import { internships } from "../../content";
import ScrollReveal from "../components/ScrollReveal";

export default function Internships() {
  return (
    <main className="page-container">
      {/* Changed .h1 to .page-title */}
      <h1 className="page-title">Internships</h1>
      <p className="section-sub">Active internship listings from partner companies.</p>

      {/* Using intern-grid layout */}
      <div className="intern-grid" style={{ marginTop: 28 }}>
        {internships.map(i => (
          <ScrollReveal key={i.id}>
            {/* Changed .card to .intern-card (more specific Neon styling) */}
            <div className="intern-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 800 }}>{i.role}</div>
                {/* Applied .muted class for consistent muted text */}
                <div className="muted">{i.company} • <span className="mode">{i.mode}</span></div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="muted">{i.duration}</div>
                {/* Changed .btn.btn-primary to .enroll-btn (or use .btn-primary, depending on final CSS) */}
                <div style={{ marginTop: 8 }}><button className="enroll-btn">Apply</button></div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
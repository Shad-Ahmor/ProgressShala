import React from "react";
import { internships } from "../../content";
import ScrollReveal from "../components/ScrollReveal";

export default function Internships() {
  return (
    <main className="page-container">
      
      {/* Title reveals first (Delay 0.0s) */}
      <ScrollReveal delay={0.0}>
        <h1 className="page-title">Internships</h1>
      </ScrollReveal>
      
      {/* Subtitle reveals second (Delay 0.1s) */}
      <ScrollReveal delay={0.1}>
        <p className="section-sub">Active internship listings from partner companies.</p>
      </ScrollReveal>

      {/* Internship Cards reveal with staggered delay */}
      <div className="intern-grid" style={{ marginTop: 28 }}>
        {internships.map((i, index) => (
          <ScrollReveal key={i.id} delay={index * 0.15 + 0.1}> {/* Delay based on index */}
            <div className="intern-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 800 }}>{i.role}</div>
                <div className="muted">{i.company} • <span className="mode">{i.mode}</span></div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="muted">{i.duration}</div>
                <div style={{ marginTop: 8 }}><button className="enroll-btn">Apply</button></div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
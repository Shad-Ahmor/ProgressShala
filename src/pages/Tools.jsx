import React from "react";
import { tools } from "../../content";
import ScrollReveal from "../components/ScrollReveal";

export default function Tools() {
  return (
    <main className="page-container">
      {/* Changed .h1 to .page-title */}
      <h1 className="page-title">Tools</h1>
      <p className="section-sub">AI-powered tools for learners and job seekers.</p>

      {/* Using tools-grid layout */}
      <div className="tools-grid" style={{ marginTop: 28 }}>
        {tools.map(t => (
          <ScrollReveal key={t.id}>
            {/* Changed .card to .tool-card (more specific Neon styling) */}
            <a className="tool-card" href={t.link}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{t.title}</div>
                  {/* Applied .muted class for consistent muted text */}
                  <div className="muted">{t.description}</div>
                </div>
                {/* Changed .btn.btn-primary to .enroll-btn */}
                <div><button className="enroll-btn">Open</button></div>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
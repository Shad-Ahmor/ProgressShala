import React from "react";
import { tools } from "../../content";
import ScrollReveal from "../components/ScrollReveal";

export default function Tools() {
  return (
    <main className="page-container">
      
      {/* Title reveals first (Delay 0.0s) */}
      <ScrollReveal delay={0.0}>
        <h1 className="page-title">Tools</h1>
      </ScrollReveal>
      
      {/* Subtitle reveals second (Delay 0.1s) */}
      <ScrollReveal delay={0.1}>
        <p className="section-sub">AI-powered tools for learners and job seekers.</p>
      </ScrollReveal>

      {/* Tool Cards reveal with staggered delay */}
      <div className="tools-grid" style={{ marginTop: 28 }}>
        {tools.map((t, index) => (
          <ScrollReveal key={t.id} delay={index * 0.15 + 0.1}> {/* Delay based on index */}
            <a className="tool-card" href={t.link}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{t.title}</div>
                  <div className="muted">{t.description}</div>
                </div>
                <div><button className="enroll-btn">Open</button></div>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
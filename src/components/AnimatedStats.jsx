import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Rocket, Briefcase, Users } from "lucide-react";
import "../../styles/AnimatedStats.css";

export default function AnimatedStats({ items = null }) {
  const defaultItems = items || [
    { title: "Career Success", stat: "95%", icon: Briefcase, color: "#06b6d4" },
    { title: "Internship Network", stat: "200+", icon: Rocket, color: "#7c3aed" },
    { title: "Active Learners", stat: "50K+", icon: Users, color: "#00eaff" },
  ];

  return (
    <section className="neo-section">
      <ScrollReveal delay={0.1}>
        <h2 className="section-title">
          🌟 Career Achievements
        </h2>
        <p className="section-subtitle">
          See what our learners achieve and the impact we create
        </p>
      </ScrollReveal>

      <div className="stats-grid">
        {defaultItems.map((it, idx) => {
          const IconComponent = it.icon;
          const staggerDelay = idx * 0.15 + 0.1;

          return (
            <ScrollReveal key={idx} delay={staggerDelay}>
              <div className="stat-card neo-card">
                {/* 🔹 Particle Glow */}
                <div className="stat-particles">
                  <span className="particle small" style={{ top: "15%", left: "25%" }}></span>
                  <span className="particle" style={{ top: "70%", left: "60%" }}></span>
                  <span className="particle big" style={{ top: "40%", left: "80%" }}></span>
                </div>

                {/* Icon */}
                <div className="stat-icon-wrapper" style={{ color: it.color }}>
                  <IconComponent size={40} strokeWidth={2.5} />
                </div>

                {/* Stat Number */}
                <div
                  className="stat-number"
                  style={{
                    color: it.color,
                    textShadow: `0 0 12px ${it.color}50, 0 0 25px ${it.color}30`,
                  }}
                >
                  {it.stat}
                </div>

                {/* Title */}
                <div className="muted">{it.title}</div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

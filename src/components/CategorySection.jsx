import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Rocket, Briefcase, Users, Cpu } from "lucide-react";

// ------------------- Category Section -------------------
export default function CategorySection({ categories = [] }) {
  return (
    <section className="neo-section page-container">
      <ScrollReveal delay={0.1}>
        <h2 className="section-title">🔥 Explore Popular Categories</h2>
        <p className="section-subtitle">
          Discover trending fields and level up your skills today!
        </p>
      </ScrollReveal>

      <div className="cards-grid">
        {categories.map((cat, i) => {
          const staggerIndex = i * 0.15;
          return (
            <ScrollReveal key={cat.id || i} delay={staggerIndex}>
              <CategoryCard {...cat} />
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

// ------------------- Category Card -------------------
export function CategoryCard({ title, icon }) {
  return (
    <div className="neo-card category-card">
      {/* Particle Glow */}
      <div className="stat-particles">
        <span className="particle small" style={{ top: "15%", left: "25%" }}></span>
        <span className="particle" style={{ top: "70%", left: "60%" }}></span>
        <span className="particle big" style={{ top: "40%", left: "80%" }}></span>
      </div>

      <div className="category-content">
        <div className="category-icon">{icon}</div>
        <div className="category-text">
          <div className="category-title">{title}</div>
          <div className="muted category-sub">Boost your skills & network</div>
        </div>
      </div>
    </div>
  );
}

// ------------------- Default Example Categories -------------------
export const defaultCategories = [
  { id: 1, title: "Tech & Development", icon: <Rocket /> },
  { id: 2, title: "Business & Management", icon: <Briefcase /> },
  { id: 3, title: "Community & Networking", icon: <Users /> },
  { id: 4, title: "AI & Data Science", icon: <Cpu /> },
];

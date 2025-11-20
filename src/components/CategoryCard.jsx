import React from "react";

export default function CategoryCard({ title, icon }) {
  // Changed .card to .neo-card for Glassmorphism/Neon style
  return (
    <div className="neo-card">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontSize: 28 }}>{icon}</div>
        <div>
          <div style={{ fontWeight: 800 }}>{title}</div>
          <div className="muted" style={{ fontSize: 13 }}>Popular path</div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function AnimatedStats({ items = null }) {
  const defaultItems = items || [
    { title: "Career Success", stat: "95%" },
    { title: "Internship Network", stat: "200+" },
    { title: "Active Learners", stat: "50K+" }
  ];

  return (
    // Moved the structural comment to a standard JS comment above the return statement.
    // The opening parenthesis '(' must follow 'return' immediately.
    
    <div className="stats-grid" style={{ marginTop: 28 }}>
      {defaultItems.map((it, idx) => (
        <ScrollReveal key={idx}>
          {/* Changed .card to .neo-card (or .stat-card if you had specific styling for it) */}
          <div className="stat-card neo-card">
            {/* The stat-number class applies the neon primary color and bold font */}
            <div className="stat-number">{it.stat}</div>
            <div className="muted">{it.title}</div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
// components/AnimatedStats.jsx
import React from "react";
import ScrollReveal from "./ScrollReveal";
// Lucide Icons का उपयोग करें (मान लें कि यह इंस्टॉल है)
import { Rocket, Briefcase, Users } from "lucide-react"; 

export default function AnimatedStats({ items = null }) {
  // 💡 Default Items में Icon और color prop जोड़ा गया
  const defaultItems = items || [
    { 
      title: "Career Success", 
      stat: "95%", 
      icon: Briefcase, 
      color: "#06b6d4" // Neon Accent
    },
    { 
      title: "Internship Network", 
      stat: "200+", 
      icon: Rocket, 
      color: "#7c3aed" // Neon Primary
    },
    { 
      title: "Active Learners", 
      stat: "50K+", 
      icon: Users, 
      color: "#00eaff" // Neon Bright
    }
  ];

  return (
    <div className="stats-grid" style={{ marginTop: 28 }}>
      {defaultItems.map((it, idx) => {
        const IconComponent = it.icon; 
        
        // 🔥 MODIFIED: delay prop added to ScrollReveal
        const staggerDelay = idx * 0.15 + 0.1; // 0.1s, 0.25s, 0.4s...
        
        return (
          <ScrollReveal key={idx} delay={staggerDelay}>
            <div className="stat-card neo-card">
              {/* 1. Icon Section (Top) */}
              <div 
                className="stat-icon-wrapper" 
                style={{ marginBottom: 10, color: it.color }}
              >
                <IconComponent size={30} strokeWidth={2.5} />
              </div>
              
              {/* 2. Stat Number */}
              <div 
                className="stat-number"
                style={{ 
                  color: it.color, 
                  textShadow: `0 0 10px ${it.color}30` // हल्का ग्लो इफेक्ट
                }}
              >
                {it.stat}
              </div>
              
              {/* 3. Title */}
              <div className="muted">{it.title}</div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
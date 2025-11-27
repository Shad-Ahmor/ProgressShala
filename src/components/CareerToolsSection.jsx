import React from "react";
import {
  FileText, 
  Search, 
  Zap, 
  Bot, 
  Lightbulb, 
  MessageCircle, 
} from "lucide-react";
import "../../styles/CareerToolsSection.css";

export default function CareerToolsSection({ onSelectTool }) {
  const tools = [
    // Note: The gradient definitions here will now primarily influence the icon box and the inner glow, 
    // ensuring consistency with the tool's color identity within the global theme.
    {
      id: "resume",
      title: "Resume Builder",
      desc: "Create a clean, ATS-friendly resume in minutes.",
      icon: <FileText size={32} />,
      // Using custom colors for tool identity
      gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", 
      neonVars: {
        '--tool-primary': '#2575fc', 
        '--tool-accent': '#6a11cb', 
        '--tool-glow': '#2575fc'
      }
    },
    {
      id: "jobfinder",
      title: "Job Finder",
      desc: "Get curated job roles based on your profile.",
      icon: <Search size={32} />,
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #f06595 100%)",
      neonVars: {
        '--tool-primary': '#ff6b6b', 
        '--tool-accent': '#f06595', 
        '--tool-glow': '#ff6b6b'
      }
    },
    {
      id: "coverletter",
      title: "Cover Letter AI",
      desc: "Generate tailored corporate cover letters instantly.",
      icon: <Zap size={32} />,
      gradient: "linear-gradient(135deg, #20c997 0%, #38d9a9 100%)",
      neonVars: {
        '--tool-primary': '#20c997', 
        '--tool-accent': '#38d9a9', 
        '--tool-glow': '#20c997'
      }
    },
    {
      id: "careerai",
      title: "Career Assistant AI",
      desc: "Smart AI for interview, skills and growth guidance.",
      icon: <Bot size={32} />,
      gradient: "linear-gradient(135deg, #845ef7 0%, #5c7cfa 100%)",
      neonVars: {
        '--tool-primary': '#845ef7', 
        '--tool-accent': '#5c7cfa', 
        '--tool-glow': '#845ef7'
      }
    },
    {
      id: "skillpath",
      title: "Skill Roadmap AI",
      desc: "Discover the fastest roadmap to career success.",
      icon: <Lightbulb size={32} />,
      gradient: "linear-gradient(135deg, #ff922b 0%, #f76707 100%)",
      neonVars: {
        '--tool-primary': '#ff922b', 
        '--tool-accent': '#f76707', 
        '--tool-glow': '#ff922b'
      }
    },
    {
      id: "mockinterview",
      title: "Mock Interview",
      desc: "AI powered interview Q&A with real-time scoring.",
      icon: <MessageCircle size={32} />,
      gradient: "linear-gradient(135deg, #51cf66 0%, #2f9e44 100%)",
      neonVars: {
        '--tool-primary': '#51cf66', 
        '--tool-accent': '#2f9e44', 
        '--tool-glow': '#51cf66'
      }
    },
  ];

  // Combine tool-specific variables with delay for card style
  const getCardStyle = (tool, index) => ({
    ...tool.neonVars,
    '--delay': `${index * 0.12}s`,
  });


  return (
    <div className="career-tools-container">
      <h2 className="section-title">🚀 Career Boost Tools</h2>
      <p className="section-subtitle">
        Everything you need to build a professional career — all in one place.
      </p>

      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            className="tool-card"
            style={getCardStyle(tool, index)}
          >
            {/* Inner glow element using tool-specific gradient */}
            <div className="card-inner-glow" style={{ background: tool.gradient }}></div>
            
            <div className="tool-icon-box">{tool.icon}</div>

            <h3 className="tool-title">{tool.title}</h3>
            <p className="tool-desc">{tool.desc}</p>

            <button className="tool-btn" onClick={() => onSelectTool(tool.id)}>
              Start Now →
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
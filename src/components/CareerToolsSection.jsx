import React from "react";
import {
  FaFileAlt,
  FaSearch,
  FaMagic,
  FaRobot,
  FaUserGraduate,
  FaLightbulb,
  FaComments,
} from "react-icons/fa";
import "../../styles/CareerToolsSection.css";

export default function CareerToolsSection({ onSelectTool }) {
  const tools = [
    {
      id: "resume",
      title: "Resume Builder",
      desc: "Create a clean, ATS-friendly resume in minutes.",
      icon: <FaFileAlt size={32} />,
      gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    },
    {
      id: "jobfinder",
      title: "Job Finder",
      desc: "Get curated job roles based on your profile.",
      icon: <FaSearch size={32} />,
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #f06595 100%)",
    },
    {
      id: "coverletter",
      title: "Cover Letter AI",
      desc: "Generate tailored corporate cover letters instantly.",
      icon: <FaMagic size={32} />,
      gradient: "linear-gradient(135deg, #20c997 0%, #38d9a9 100%)",
    },
    {
      id: "careerai",
      title: "Career Assistant AI",
      desc: "Smart AI for interview, skills and growth guidance.",
      icon: <FaRobot size={32} />,
      gradient: "linear-gradient(135deg, #845ef7 0%, #5c7cfa 100%)",
    },
    {
      id: "skillpath",
      title: "Skill Roadmap AI",
      desc: "Discover the fastest roadmap to career success.",
      icon: <FaLightbulb size={32} />,
      gradient: "linear-gradient(135deg, #ff922b 0%, #f76707 100%)",
    },
    {
      id: "mockinterview",
      title: "Mock Interview",
      desc: "AI powered interview Q&A with real-time scoring.",
      icon: <FaComments size={32} />,
      gradient: "linear-gradient(135deg, #51cf66 0%, #2f9e44 100%)",
    },
  ];

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
            style={{ "--delay": `${index * 0.12}s` }}
          >
            <div className="tool-gradient" style={{ background: tool.gradient }}></div>

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

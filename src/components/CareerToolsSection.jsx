import React from "react";
import {
  FileText, 
  Search, 
  Zap, 
  Bot, 
  Lightbulb, 
  MessageCircle, 
} from "lucide-react";

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
      
      {/* ================================================================
        CSS STYLING (Integrated with Global Variables)
        ================================================================
      */}
      <style jsx>{`
        /* -----------------------------------------------
           🌟 Career Tools Section — Integrated Glassmorphism
           (Uses global variables: --text, --muted, --bg-color-surface, --glass-blur, etc.)
        -------------------------------------------------- */
        .career-tools-container {
          width: 100%;
          padding: 10px 20px;
          text-align: center;
          max-width: 1400px;
          margin: auto;
          background-color: transparent; 
          color: var(--text); /* Global text color */
          /* Ensure title and subtitle are drawn clearly */
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 10px;
          color: var(--text);
        }
        
        .section-subtitle {
          color: var(--muted); /* Global muted color */
          font-size: 1.1rem;
          margin-bottom: 40px;
        }

        /* --- GRID STYLING (Mobile First) --- */
        .career-tools-container .tools-grid {
          display: grid;
          gap: 20px; 
          grid-template-columns: 1fr; 
          padding: 0 10px;
        }

        @media (min-width: 721px) {
          .career-tools-container .tools-grid { 
            grid-template-columns: repeat(2, 1fr); 
          }
        }
        
        @media (min-width: 1101px) {
          .career-tools-container .tools-grid { 
            grid-template-columns: repeat(4, 1fr); 
            gap: 25px;
          }
        }
        
        /* --- Card Styles: Enhanced Glassmorphism --- */
        .tool-card {
          /* Uses the global surface color, which is semi-transparent and blurred */
          background-color: var(--bg-color-surface); 
          backdrop-filter: blur(var(--glass-blur)); 
          -webkit-backdrop-filter: blur(var(--glass-blur));
          
          position: relative;
          z-index: 10;
          padding: 20px 12px;
          height: 240px; 
          border-radius: var(--radius-lg); /* Global radius */
          overflow: hidden;
          transition: transform var(--transition), box-shadow var(--transition), background-color var(--transition);
          animation: fadeUp 0.6s ease forwards;
          animation-delay: var(--delay);
          opacity: 0;
          transform: translateY(15px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          /* White border that changes based on theme/surface opacity */
          border: 1px solid var(--neon-bright);
          /* Subtle inner shadow for depth (integrated into box-shadow) */
          box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.05);
        }

        /* Inner glow element for the top-left light source effect (uses tool gradient) */
        .card-inner-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 150px; 
            height: 150px; 
            border-radius: 50%; 
            filter: blur(40px); 
            opacity: 0.1; /* Reduced default opacity */
            transform: translate(-50%, -50%); 
            transition: opacity var(--transition), transform var(--transition);
            z-index: -1; 
        }
        .tool-card:hover .card-inner-glow {
            opacity: 0.4; 
            transform: translate(-40%, -40%); 
        }
        
        /* Neon Border Effect (uses tool colors for dynamic glow) */
        .tool-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          /* Uses tool-specific colors for the animated border */
          background: linear-gradient(130deg, var(--tool-primary), var(--tool-accent), var(--tool-glow));
          background-size: 300% 300%;
          animation: borderMove 6s infinite linear;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: var(--transition);
          z-index: -1;
        }

        .tool-card:hover::before {
          opacity: 1;
        }

        .tool-card:hover {
          transform: translateY(-8px) scale(1.03); /* Slightly less dramatic scale */
          /* Enhanced outer glow using tool color */
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.4), /* Default dark shadow for lift */
            0 0 40px var(--tool-glow, rgba(0, 255, 255, 0.4)), /* Tool specific glow */
            inset 0 0 15px rgba(255, 255, 255, 0.1); /* Inner light */
        }
        
        /* Icon Box Styling (uses tool colors) */
        .tool-icon-box {
          width: 55px;
          height: 55px;
          margin: 0;
          margin-top: 5px;
          border-radius: 18px;
          font-size: 25px;
          /* Tool-specific gradient background */
          background: linear-gradient(135deg, var(--tool-primary), var(--tool-accent));
          background-size: 400% 400%;
          animation: iconGradient 6s ease infinite;

          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;

          box-shadow: 0 0 16px var(--tool-glow, #00e0ff), /* Tool-specific glow */
                      inset 0 0 20px rgba(255, 255, 255, 0.3);

          transition: transform var(--transition), box-shadow var(--transition);
        }

        .tool-card:hover .tool-icon-box {
          transform: scale(1.15) rotateZ(3deg);
          box-shadow: 0 0 30px var(--tool-glow, #00e0ff),
                      inset 0 0 25px rgba(255, 255, 255, 0.4);
        }

        /* Text Styles */
        .tool-title {
          margin-top: 16px;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text);
          letter-spacing: 0.5px;
          /* Slight text glow for neon theme */
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.4); 
          flex-shrink: 0;
        }

        .tool-desc {
          margin: 8px 0 16px;
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.4rem;
          text-align: center;
          flex-grow: 1; 
        }

        /* Action Button */
        .tool-btn {
          margin-top: auto; 
          padding: 10px 20px;
          
          /* --- NEON STYLES START: Transparent Button with Colored Border/Text --- */
          background: transparent; 
          border: 1px solid var(--tool-primary); /* Border color matches tool */
          color: var(--tool-primary); /* Text color matches tool */
          
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--transition);
          /* Strong initial glow using tool-specific glow variable */
          box-shadow: 0 0 5px var(--tool-glow, rgba(255, 255, 255, 0.5)); 
          /* --- NEON STYLES END --- */
        }

        .tool-btn:hover {
          /* Solid background fill on hover */
          background: var(--tool-primary); 
          color: #000; /* Black text on bright fill */
          transform: translateY(-2px);
          /* Intense glow on hover */
          box-shadow: 0 0 20px var(--tool-glow), 0 0 30px var(--tool-glow);
        }

        /* ------------------------------------------------
           🌟 ANIMATIONS
        -------------------------------------------------- */
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes borderMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes iconGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
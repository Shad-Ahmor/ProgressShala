import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "../main/Sidebar";
import HomeHeader from "../components/HomeHeader";
import ScrollReveal from "../components/ScrollReveal";
import CategorySection from "../components/CategorySection";
import AnimatedStats from "../components/AnimatedStats";
import { categories } from "../../content";
import useParallax from "../hooks/useParallax";
import Courses from "./Courses";
import CareerToolsSection from "../components/CareerToolsSection";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------
// ✨ Hero Content with Parallax
// ----------------------------------------------------------------------
function HeroContent() {
  const parallaxStyle = useParallax(0.5);

  return (
    <div className="full-width-hero-content">
      <div className="hero-center" style={parallaxStyle}>
        <ScrollReveal delay={0}>
          <h1 className="hero-title">Master Future-Ready Skills — Learn with Mentors</h1>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="hero-sub">
            Practical projects, guided mentors and internship pipelines — learn what industry hires for.
          </p>
        </ScrollReveal>

      </div>
    </div>
  );
}


// ----------------------------------------------------------------------
// ⭐ Main Home Component
// ----------------------------------------------------------------------
export default function Home({ openLogin }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [userimg, setUserimg] = useState("");

  const navigate = useNavigate();
  let staggerIndex = 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const drawerWidth = 240;

  // ----------------------------------------------------------------------
  // ⭐ Logged-in Dashboard View
  // ----------------------------------------------------------------------
  if (isLoggedIn) {
    return (
      <Box sx={{ display: "flex" }}>
        <Sidebar
          open={openSidebar}
          Setuserimg={setUserimg}
          handleDrawerClose={() => setOpenSidebar(false)}
          isLoggedIn={isLoggedIn}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: "64px",
            ml: openSidebar ? `${drawerWidth}px` : 0,
          }}
        >
          {/* Add your dashboard content here */}
        </Box>
      </Box>
    );
  }

  // ----------------------------------------------------------------------
  // ⭐ Public Landing Page (Non-Logged In)
  // ----------------------------------------------------------------------
  return (
    <main>
      {/* --------------------------------------------------------------
          Hero Section
      --------------------------------------------------------------- */}
      <section className="neo-section hero-full-width-section">
        <HomeHeader isOverlay={true} openLogin={openLogin} />
        <HeroContent />
      </section>

{/* --------------------------------------------------------------
    Why Learners Choose Us
--------------------------------------------------------------- */}
<section className="page-container neo-section">
  <ScrollReveal delay={0}>
    <h2 className="section-title">Why Learners Choose Us</h2>
    <p className="section-subtitle">
      Experience a learning journey that actually prepares you for the industry.
    </p>
  </ScrollReveal>

  <div className="cards-grid">
    {[
      { icon: "🎓", title: "Expert Mentors", subtitle: "Learn from industry leaders" },
      { icon: "💻", title: "Hands-on Projects", subtitle: "Work on real-world challenges" },
      { icon: "🚀", title: "Career Support", subtitle: "Internships & guidance guaranteed" },
      { icon: "🤖", title: "AI Labs", subtitle: "Learn cutting-edge tech with AI tools" },
    ].map((item, i) => {
      const staggerIndex = i * 0.15 + 0.1;
      return (
        <ScrollReveal key={i} delay={staggerIndex}>
          <div className="neo-card why-choose-card">
            <div className="why-icon-wrapper">
              <span className="why-icon">{item.icon}</span>
            </div>
            <div className="why-text-wrapper">
              <h3 className="why-title">{item.title}</h3>
              <p className="why-sub">{item.subtitle}</p>
            </div>
          </div>
        </ScrollReveal>
      );
    })}
  </div>
</section>


{/* --------------------------------------------------------------
    Popular Categories
--------------------------------------------------------------- */}
<section className="page-container neo-section">
  <ScrollReveal delay={0.1}>
<CategorySection categories={categories} />

  </ScrollReveal>

 
</section>

      {/* --------------------------------------------------------------
          Top Courses (with pagination, load more, 6 cards default)
      --------------------------------------------------------------- */}
      <Courses />

      {/* --------------------------------------------------------------
          Career Tools Section
      --------------------------------------------------------------- */}
      <CareerToolsSection
        onSelectTool={(tool) => {
          console.log("Selected Tool:", tool);
          // future: navigate(`/tools/${tool}`);
        }}
      />

      {/* --------------------------------------------------------------
          Outcomes Section
      --------------------------------------------------------------- */}
      <section className="page-container neo-section">
        <AnimatedStats />
      </section>
    </main>
  );
}

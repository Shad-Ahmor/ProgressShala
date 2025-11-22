import React from "react";
// ThreeDHero अब आवश्यक नहीं है
// import ThreeDHero from "../components/ThreeDHero";
// 🔥 ASSUMPTION: ScrollReveal now uses the useScrollReveal hook and accepts a 'delay' prop
import ScrollReveal from "../components/ScrollReveal";
import CategoryCard from "../components/CategoryCard";
import CourseCard from "../components/CourseCard";
import AnimatedStats from "../components/AnimatedStats";
import { categories, courses } from "../../content";
import useParallax from "../hooks/useParallax"

// 💡 FIX: HomeHeader को इम्पोर्ट किया गया है
import HomeHeader from "../components/HomeHeader";

// 💡 UPDATED: Hero Content component
function HeroContent() {
  
  // 🔥 UPDATED: Apply Parallax Hook to control vertical position (intensity 0.5 means half the scroll speed)
  const parallaxStyle = useParallax(0.5); 
  
  return (
    // 'full-width-hero-content' will handle 100vh height and centering
    <div className="full-width-hero-content"> 
      
      {/* 🛑 Apply parallax style to the content container */}
      <div 
        className="hero-center" 
        style={{
          ...parallaxStyle, 
          // 🔥 FIX: Hero Content को टॉप से 80px नीचे धकेलें 
          // ताकि HomeHeader के लिए जगह बन सके और टाइटल Header से न टकराए।
          marginTop: '80px', 
          // 💡 साथ ही, यदि आप Parallax को धीमा करना चाहते हैं ताकि यह ज्यादा देर तक दिखे:
          // transform: `translateY(${parallaxStyle.transform.match(/translateY\(([^)]+)\)/)[1]})` // original Parallax
        }}
      > 
        
        {/* Delay 0s */}
        <ScrollReveal delay={0}>
          <h1 className="hero-title">Master Future-Ready Skills — Learn with Mentors</h1>
        </ScrollReveal>

        {/* Delay 0.15s */}
        <ScrollReveal delay={0.15}>
          <p className="hero-sub" style={{ marginTop: 12 }}>
            Practical projects, guided mentors and internship pipelines — learn what industry hires for.
          </p>
        </ScrollReveal>

        {/* Delay 0.3s */}
        <ScrollReveal delay={0.3}>
          <div className="hero-actions" style={{ marginTop: 20 }}>
            <a href="/courses" className="enroll-btn">Explore Courses</a>
            <button className="btn btn-ghost">Watch Demo</button>
          </div>
        </ScrollReveal>

      </div>
      
      {/* यदि आप बैकग्राउंड में एक स्थिर (fixed) या धीमी गति से चलने वाला तत्व चाहते हैं,
         तो आप उसे HeroContent के अंदर जोड़ सकते हैं और उसे 0.2 जैसी कम तीव्रता दे सकते हैं।
      */}
      
    </div>
  );
}


export default function Home() {
  // Stagger index to control delay in loops
  let staggerIndex = 0.0;
  
  return (
    <main>

      {/* ================= HERO SECTION (Full Page Width) ================= */}
      <section className="neo-section hero-full-width-section"> 
        
        {/* 🔥 FIX: HomeHeader को Hero Section के अंदर Render किया गया है */}
        <HomeHeader isOverlay={true} />
        
        {/* HeroContent handles its own internal staggering */}
        <HeroContent /> 
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      {/* 💡 NOTE: यह सेक्शन अब Hero Content के नीचे पर्याप्त जगह के बाद शुरू होगा। */}
      <section className="page-container neo-section"> 
        {/* Title reveals first (Delay 0.0s for this section's content) */}
        <ScrollReveal delay={0}>
          <h2 className="section-title">Why Learners Choose Us</h2>
        </ScrollReveal>

        <div className="cards-grid">
          {[
            "Industry expert mentors",
            "Hands-on real projects",
            "Career support & guaranteed internship",
            "AI Powered Learning Labs",
          ].map((item, i) => {
            staggerIndex = i * 0.15 + 0.1; // Sequential delay: 0.1s, 0.25s, 0.4s...
            return (
              <ScrollReveal key={i} delay={staggerIndex}>
                <div className="neo-card">{item}</div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ================= POPULAR CATEGORIES ================= */}
      <section className="page-container neo-section">
        <ScrollReveal delay={0.1}>
          <h2 className="section-title">Popular Categories</h2>
        </ScrollReveal>

        <div className="cards-grid">
          {categories.map((cat, i) => {
             staggerIndex = i * 0.15;
             return (
              <ScrollReveal key={cat.id} delay={staggerIndex}>
                <CategoryCard {...cat} />
              </ScrollReveal>
             )
          })}
        </div>
      </section>

      {/* ================= TOP COURSES ================= */}
      <section className="page-container neo-section">
        <ScrollReveal delay={0.1}>
          <h2 className="section-title">Top Courses</h2>
        </ScrollReveal>

        <div className="cards-grid course-grid">
          {courses.map((course, i) => {
            staggerIndex = i * 0.1; // Slightly faster stagger for larger lists
            return (
              <ScrollReveal key={course.id} delay={staggerIndex}>
                <CourseCard data={course} />
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ================= OUTCOMES SECTION ================= */}
      <section className="page-container neo-section">
        <ScrollReveal delay={0.1}>
          <h2 className="section-title">Outcomes</h2>
        </ScrollReveal>
        
        {/* Let AnimatedStats handle its own internal staggering */}
        <AnimatedStats />
      </section>
    </main>
  );
}
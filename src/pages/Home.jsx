import React from "react";
import ThreeDHero from "../components/ThreeDHero";
import ScrollReveal from "../components/ScrollReveal";
import CategoryCard from "../components/CategoryCard";
import CourseCard from "../components/CourseCard";
import AnimatedStats from "../components/AnimatedStats";
import { categories, courses } from "../../content";

export default function Home() {
  return (
    <main>
      {/* Hero Section - Uses the .neo-hero layout implicitly through ThreeDHero */}
      <div className="page-container">
        <ThreeDHero />
      </div>

      {/* Why Choose Us Section */}
      <section className="page-container">
        <ScrollReveal>
          <h2 className="section-title">Why Learners Choose Us</h2>
        </ScrollReveal>

        {/* Changed class to .cards-grid for better Neon styling/hover effect */}
        <div className="cards-grid" style={{ marginTop: 16 }}>
          <ScrollReveal><div className="neo-card">Industry expert mentors</div></ScrollReveal>
          <ScrollReveal><div className="neo-card">Hands-on projects</div></ScrollReveal>
          <ScrollReveal><div className="neo-card">Career support & internships</div></ScrollReveal>
          <ScrollReveal><div className="neo-card">AI Powered Labs</div></ScrollReveal>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="page-container">
        <ScrollReveal><h2 className="section-title">Popular Categories</h2></ScrollReveal>
        {/* Changed class to .cards-grid for better Neon styling/grid layout */}
        <div className="cards-grid" style={{ marginTop: 16 }}>
          {categories.map(c => <ScrollReveal key={c.id}><CategoryCard {...c} /></ScrollReveal>)}
        </div>
      </section>

      {/* Top Courses Section */}
      <section className="page-container">
        <ScrollReveal><h2 className="section-title">Top Courses</h2></ScrollReveal>
        {/* Using .cards-grid for 3-column course layout (on large screens) */}
        <div className="cards-grid" style={{ marginTop: 18 }}>
          {courses.map(c => <ScrollReveal key={c.id}><CourseCard data={c} /></ScrollReveal>)}
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="page-container">
        <ScrollReveal><h2 className="section-title">Outcomes</h2></ScrollReveal>
        {/* AnimatedStats component will now use the new stats-grid layout */}
        <AnimatedStats />
      </section>
    </main>
  );
}
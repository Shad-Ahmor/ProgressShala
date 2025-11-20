import React, { useState } from "react";
import { courses as courseData } from "../../content";
import CourseCard from "../components/CourseCard";
import ScrollReveal from "../components/ScrollReveal";

export default function Courses() {
  const [query, setQuery] = useState("");
  const filtered = courseData.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: 'wrap' }}>
        <div>
          {/* Changed .h1 to .page-title */}
          <h1 className="page-title">All Courses</h1>
          <p className="section-sub">Browse learning paths crafted with mentors.</p>
        </div>
        {/* Changed .input to .search-input (Neon CSS) */}
        <input 
          className="search-input" 
          placeholder="Search courses" 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          style={{ width: 260, minWidth: '200px' }} 
        />
      </div>

      {/* Using .cards-grid for consistent layout */}
      <div className="cards-grid" style={{ marginTop: 28 }}>
        {filtered.map(c => <ScrollReveal key={c.id}><CourseCard data={c} /></ScrollReveal>)}
      </div>
    </main>
  );
}
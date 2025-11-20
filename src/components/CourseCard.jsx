import React from "react";

export default function CourseCard({ data }) {
const { title, description, thumbnail, level, duration } = data;

return ( <article className="course-card neo-card">
{/* Thumbnail with hover effect */} <div className="thumb"> <img src={thumbnail} alt={title} /> <div className="thumb-badge">{level}</div> </div>


  {/* Course content */}
  <div className="course-content">
    <h3>{title}</h3>
    <p className="muted">{description}</p>

    <div className="course-footer">
      <div className="muted" style={{ fontSize: 13 }}>{duration}</div>
      <button className="enroll-btn">Enroll</button>
    </div>
  </div>
</article>

);
}
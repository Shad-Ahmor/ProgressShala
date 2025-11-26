import React from "react";

export default function CourseCard({ data }) {
  // Backend se mapped data
  const {
    id,
    title,
    description,
    thumbnail,
    level,
    duration
  } = data;

  return (
    <article className="course-card neo-card">
      
      {/* Thumbnail Section */}
      <div className="thumb">
        <img
          src={thumbnail || "https://via.placeholder.com/300x200?text=Course+Image"}
          alt={title}
        />
        <div className="thumb-badge">
          {level || "General"}
        </div>
      </div>

      {/* Content Section */}
      <div className="course-content">
        <h3>{title || "Untitled Course"}</h3>

        <p className="muted">
          {description?.slice(0, 80) + (description?.length > 80 ? "..." : "")}
        </p>

        <div className="course-footer">
          <div className="muted" style={{ fontSize: 13 }}>
            {duration || "Self-paced"}
          </div>

          <button
            className="enroll-btn"
            onClick={() => window.location.href = `/course/${id}`}
          >
            Enroll
          </button>
        </div>
      </div>
      
    </article>
  );
}

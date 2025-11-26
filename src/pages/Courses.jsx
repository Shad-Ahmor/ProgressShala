import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollReveal from "../components/ScrollReveal";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../security/cryptoUtils";

export default function Home({ designation }) {
const [courses, setCourses] = useState([]);
const [page, setPage] = useState(1); // Current page for API
const [hasMore, setHasMore] = useState(true); // Flag if more courses exist
const [loading, setLoading] = useState(false); // Loading state
const [userDesignation, setUserDesignation] = useState("");
const [selectedCourse, setSelectedCourse] = useState(null);
const PAGE_SIZE = 4; // Matches API limit
const navigate = useNavigate();

const fetchCourses = async (pageNum) => {
  setLoading(true);
  try {
    const res = await axios.get(`http://localhost:5000/courses?page=${pageNum}&limit=${PAGE_SIZE}`);
    let data = res.data;

    let coursesArray = [];
    if (Array.isArray(data)) {
      coursesArray = data.map((item) => ({
        id: item?.id,
        title: item?.title || item?.name || "Untitled",
        description: item?.description || "",
        thumbnail: item?.thumbnail || item?.image || "",
        level: item?.level || item?.category || "General",
        duration: item?.duration || "Self-paced",
      }));
    } else if (typeof data === "object") {
      coursesArray = Object.entries(data).map(([id, info]) => ({
        id,
        title: info?.title || info?.name || "Untitled",
        description: info?.description || "",
        thumbnail: info?.thumbnail || info?.image || "",
        level: info?.level || info?.category || "General",
        duration: info?.duration || "Self-paced",
      }));
    }

    // Filter out duplicates based on id
    setCourses((prev) => {
      const newCourses = coursesArray.filter(c => !prev.some(pc => pc.id === c.id));
      return [...prev, ...newCourses];
    });

    setHasMore(coursesArray.length === PAGE_SIZE); // If fewer items returned, no more pages
  } catch (err) {
    console.error("Error fetching courses:", err);
  }
  setLoading(false);
};


useEffect(() => {
fetchCourses(page);
}, [page]);

useEffect(() => {
setUserDesignation(designation || "");
}, [designation]);

const handleCourseSelection = async (courseId, courseCategory) => {
const userId = decryptData(localStorage.getItem("uid"));
if (!userId) {
console.error("User ID is not defined");
return;
}


const subrolesArray = userDesignation.split(",").map((role) => role.trim());
if (subrolesArray.includes("admin") || subrolesArray.includes(courseCategory)) {
  try {
    const res = await axios.post("http://localhost:5000/courses/select", { userId, courseId });
    console.log(res.data);
    setSelectedCourse(courseId);
    navigate(`/course/${courseId}`);
  } catch (error) {
    console.error("Error selecting course", error);
  }
} else {
  console.log("Access Denied: User's subrole does not match course category");
}


};

const handleLoadMore = () => {
if (!loading && hasMore) setPage((prev) => prev + 1);
};

return (
  <section className="page-container neo-section">
    <ScrollReveal delay={0.1}>
      <h2
        className="section-title"
        style={{ 
          textAlign: "center",
          fontWeight: "800",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          color: "#222"
        }}
      >
        🔥 Trending Courses
      </h2>

      <p
        className="section-subtitle"
        style={{
          textAlign: "center",
          marginTop: "-10px",
          color: "#555",
          fontSize: "1.1rem"
        }}
      >
        Unlock industry-ready skills with curated, high-impact learning programs.
      </p>
    </ScrollReveal>

    <div className="cards-grid course-grid" style={{ marginTop: "40px" }}>
      {courses.map((course, i) => (
        <ScrollReveal key={course.id || i} delay={i * 0.05}>
          <CourseCard
            data={course}
            onSelect={() => handleCourseSelection(course.id, course.level)}
          />
        </ScrollReveal>
      ))}
    </div>

    {hasMore && (
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button 
          onClick={handleLoadMore} 
          disabled={loading} 
          className="load-more-btn"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    )}

    {!hasMore && courses.length > 0 && (
      <p style={{ textAlign: "center", margin: "2rem 0" }}>No more courses</p>
    )}

    {courses.length === 0 && !loading && (
      <p style={{ textAlign: "center" }}>No courses available</p>
    )}
  </section>
);

}

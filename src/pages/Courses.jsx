import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollReveal from "../components/ScrollReveal";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../security/cryptoUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Home({ designation }) {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userDesignation, setUserDesignation] = useState("");

  const navigate = useNavigate();
  const PAGE_SIZE = 4;

  // ⭐ Your Demo Courses
  const demoCourses = [
    {
      id: "1",
      title: "Full Stack Web Development",
      description: "Build robust applications using React and Node.js.",
      level: "Intermediate",
      duration: "10 Weeks",
      isDemo: true
    },
    {
      id: "2",
      title: "Advanced Data Science with Python",
      description: "Master machine learning and deep learning algorithms.",
      level: "Advanced",
      duration: "120 Hrs",
      isDemo: true
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      description: "Learn Figma and create intuitive user interfaces.",
      level: "Beginner",
      duration: "4 Weeks",
      isDemo: true
    },
    {
      id: "4",
      title: "Cloud Computing (AWS/Azure)",
      description: "Deploy and manage scalable services on the cloud.",
      level: "Intermediate",
      duration: "8 Weeks",
      isDemo: true
    },
  ];


  const fetchCourses = async (pageNum) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${API_BASE_URL}/courses?page=${pageNum}&limit=${PAGE_SIZE}`
      );

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

      setCourses((prev) => {
        const newCourses = coursesArray.filter(
          (c) => !prev.some((pc) => pc.id === c.id)
        );
        return [...prev, ...newCourses];
      });

      setHasMore(coursesArray.length === PAGE_SIZE);
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


  const handleCourseSelection = (courseId, courseCategory) => {
    if (courseCategory.isDemo) return; // block demo click

    const userId = decryptData(localStorage.getItem("uid"));
    if (!userId) return;

    const subs = userDesignation.split(",").map((r) => r.trim());

    if (subs.includes("admin") || subs.includes(courseCategory)) {
      navigate(`/course/${courseId}`);
    } else {
      console.log("Access denied");
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
          style={{ textAlign: "center", fontWeight: 800 }}
        >
          🔥 Trending Courses
        </h2>

        <p
          className="section-subtitle"
          style={{ textAlign: "center", marginTop: -10 }}
        >
          Unlock industry-ready skills with curated programs.
        </p>
      </ScrollReveal>

      <div className="cards-grid course-grid" style={{ marginTop: 40 }}>

        {/* ⭐ If loading → Show Demo Cards */}
        {loading
          ? demoCourses.map((course, i) => (
              <ScrollReveal key={course.id} delay={i * 0.05}>
                <CourseCard
                  data={course}
                  onSelect={() => {}}
                />
              </ScrollReveal>
            ))
          : courses.map((course, i) => (
              <ScrollReveal key={course.id} delay={i * 0.05}>
                <CourseCard
                  data={course}
                  onSelect={() => handleCourseSelection(course.id, course.level)}
                />
              </ScrollReveal>
            ))}
      </div>

      {!loading && hasMore && (
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <button onClick={handleLoadMore} className="load-more-btn">
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

import React, { useState } from "react";
import axios from "axios";
import "./ATSChecker.css";

export default function ATSChecker({ onBack, token }) {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);

  const handleCheck = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/doc/ats",
        { resumeText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setScore(res.data.score);
    } catch (err) {
      console.error(err);
      alert("Error checking ATS score!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ats-wrapper">
      <button onClick={onBack} className="back-button-common">⬅ Back</button>

      <h2 className="ats-title">📊 ATS Score Checker</h2>
      <p className="ats-subtitle">
        Paste your resume text below to get an ATS compatibility score
      </p>

      <textarea
        className="ats-textarea"
        rows={12}
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your full resume text here..."
      />

      <button className="action-button ats-button" onClick={handleCheck}>
        {loading ? "Checking..." : "Check ATS Score"}
      </button>

      {score !== null && (
        <div className="score-box">
          <h3>Your ATS Score</h3>
          <p className="score-value">{score}%</p>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import ATSChecker from "./ATSChecker";

// Icons
import {
  PencilSquareIcon,
  EyeIcon,
  BugAntIcon,
} from "@heroicons/react/24/outline";

import "./ResumeCreator.css";

export default function ResumeCreator() {
  const [view, setView] = useState(null); // null | "create" | "preview" | "ats"

  // user auth details
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = currentUser.uid || "demoUser123"; 
  const token = localStorage.getItem("token");

  return (
    <div className="creator-container">

      {/* --------------- Main Welcome Card --------------- */}
      {!view && (
        <div className="main-card">
          <h1 className="main-title">Create Your Perfect Resume</h1>
          <p className="main-subtitle">
            Build an ATS-optimized professional resume in minutes
          </p>

          {/* Buttons */}
          <div className="button-group">

            {/* Create Resume */}
            <button
              onClick={() => setView("create")}
              className="action-button create-button"
            >
              <span>Create Resume</span>
            </button>

            {/* Preview Resume */}
            <button
              onClick={() => setView("preview")}
              className="action-button preview-button"
            >
              <span>Preview Resume</span>
            </button>

            {/* ATS Checker */}
            <button
              onClick={() => setView("ats")}
              className="action-button ats-button"
            >
              <span>ATS Checker</span>
            </button>

          </div>
        </div>
      )}

      {/* --------------- Resume Form Section --------------- */}
      {view === "create" && (
        <div className="content-card fade-in">
          <ResumeForm onBack={() => setView(null)} />
        </div>
      )}

      {/* --------------- Resume Preview Section --------------- */}
      {view === "preview" && (
        <div className="content-card fade-in">
          <ResumePreview onBack={() => setView(null)} userId={userId} token={token} />
        </div>
      )}

      {/* --------------- ATS Checker Section --------------- */}
      {view === "ats" && (
        <div className="content-card fade-in">
          <ATSChecker onBack={() => setView(null)} token={token} />
        </div>
      )}

    </div>
  );
}

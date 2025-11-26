import React, { useState } from "react";
import axios from "axios";
import {
  Person, Email, Phone, School, Work, GitHub, LinkedIn,
  Language, Star, EmojiObjects, CheckCircle, Certificate
} from "@mui/icons-material";
import "./ResumeForm.css";

// Icons map
const icons = {
  name: <Person style={{ color: "#ff6b6b" }} />,
  email: <Email style={{ color: "#4dabf7" }} />,
  phone: <Phone style={{ color: "#51cf66" }} />,
  github: <GitHub style={{ color: "#24292e" }} />,
  linkedin: <LinkedIn style={{ color: "#0077b5" }} />,
  portfolio: <Language style={{ color: "#845ef7" }} />,
  degree: <School style={{ color: "#fab005" }} />,
  institution: <School style={{ color: "#fab005" }} />,
  year: <School style={{ color: "#fab005" }} />,
  grade: <Star style={{ color: "#fcc419" }} />,
  company: <Work style={{ color: "#15aabf" }} />,
  position: <Work style={{ color: "#15aabf" }} />,
  duration: <Work style={{ color: "#15aabf" }} />,
  description: <EmojiObjects style={{ color: "#f06595" }} />,
  skills: <EmojiObjects style={{ color: "#f06595" }} />,
  project: <EmojiObjects style={{ color: "#845ef7" }} />,
  certificate: <EmojiObjects style={{ color: "#22c55e" }} />,
};

const steps = ["Basic Info", "Education", "Experience", "Skills", "Projects", "Certificates"];

export default function ResumeForm({ onBack }) {
  const token = localStorage.getItem("token");
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);


  const [resumeData, setResumeData] = useState({
  name: "",
  title: "",
  contact: { email: "", phone: "", location: "", github: "", linkedin: "" },
  summary: "",
  skills: "", // comma separated, will convert to array
  experience: [], // array of { role, company, duration, details[] }
  education: [],  // array of { degree, school, year }
  projects: [],   // array of { name, description, link, technologies }
  certificates: [] // array of { title, issuer, year }
});


  // -------------------- Dynamic Section Handlers --------------------
  const addEntry = (section, newEntry) => {
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], newEntry] }));
  };

  const updateEntry = (section, index, field, value) => {
    const updated = [...resumeData[section]];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, [section]: updated }));
  };

  const removeEntry = (section, index) => {
    const updated = [...resumeData[section]];
    updated.splice(index, 1);
    setResumeData(prev => ({ ...prev, [section]: updated }));
  };

  // -------------------- Submit Function --------------------
const handleSubmit = async () => {
  try {
    setLoading(true);

    // Prepare payload in the exact desired format
    const payload = {
      name: resumeData.name.trim(),
      title: resumeData.title.trim(),
      contact: {
        email: resumeData.contact.email.trim(),
        phone: resumeData.contact.phone.trim(),
        location: resumeData.contact.location.trim(),
        linkedin: resumeData.contact.linkedin.trim(),
        github: resumeData.contact.github.trim(),
      },
      summary: resumeData.summary.trim(),
      skills: resumeData.skills
        ? resumeData.skills.split(",").map(s => s.trim())
        : [],
      experience: resumeData.experience.map(exp => ({
        role: exp.position || exp.role || "",
        company: exp.company || "",
        duration: exp.duration || "",
        details: Array.isArray(exp.details)
          ? exp.details
          : exp.description
          ? [exp.description]
          : [],
      })),
      education: resumeData.education.map(edu => ({
        degree: edu.degree || "",
        school: edu.institution || edu.school || "",
        year: edu.year || "",
      })),
      projects: resumeData.projects.map(proj => ({
        name: proj.name || proj.title || "",
        description: proj.description || "",
        link: proj.link || "",
        technologies: proj.technologies || "",
      })),
      certificates: resumeData.certificates.map(cert => ({
        title: cert.title || "",
        issuer: cert.issuer || "",
        year: cert.year || "",
      })),
    };

    const res = await axios.post(
      "http://localhost:5000/doc/resume",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Resume saved successfully!");
    console.log("Saved Resume:", res.data);
    if (onBack) onBack("preview");
  } catch (err) {
    console.error("❌ Error saving resume:", err);
    alert("❌ Failed to save resume. Check console for details.");
  } finally {
    setLoading(false);
  }
};


  // -------------------- Stepper --------------------
  const handleNext = () => {
    if (activeStep === steps.length - 1) handleSubmit();
    else setActiveStep(prev => prev + 1);
  };
  const handleBack = () => setActiveStep(prev => prev - 1);

  // -------------------- Render Input --------------------
  const renderInput = (section, index, field, placeholder) => (
    <div className="input-row" key={`${section}-${index}-${field}`}>
      <div className="icon">{icons[field] || <EmojiObjects />}</div>
      <div className="input-content">
        <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
        <input
          type="text"
          placeholder={placeholder}
          value={resumeData[section][index]?.[field] || ""}
          onChange={e => updateEntry(section, index, field, e.target.value)}
          className="input-box"
        />
      </div>
      <button onClick={() => removeEntry(section, index)} className="btn-secondary ml-2">
        Remove
      </button>
    </div>
  );

  // -------------------- Render Step Content --------------------
  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Basic Info
  return (
    <>
      <div className="input-row">
        <div className="icon">{icons.name}</div>
        <div className="input-content">
          <label>Name</label>
          <input
            type="text"
            value={resumeData.name}
            onChange={e => setResumeData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your name"
            className="input-box"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="icon">{icons.title}</div>
        <div className="input-content">
          <label>Title</label>
          <input
            type="text"
            value={resumeData.title}
            onChange={e => setResumeData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter your professional title"
            className="input-box"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="icon">{icons.email}</div>
        <div className="input-content">
          <label>Email</label>
          <input
            type="email"
            value={resumeData.contact.email}
            onChange={e =>
              setResumeData(prev => ({
                ...prev,
                contact: { ...prev.contact, email: e.target.value }
              }))
            }
            placeholder="Enter your email"
            className="input-box"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="icon">{icons.phone}</div>
        <div className="input-content">
          <label>Phone</label>
          <input
            type="text"
            value={resumeData.contact.phone}
            onChange={e =>
              setResumeData(prev => ({
                ...prev,
                contact: { ...prev.contact, phone: e.target.value }
              }))
            }
            placeholder="Enter your phone"
            className="input-box"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="icon">{icons.linkedin}</div>
        <div className="input-content">
          <label>LinkedIn</label>
          <input
            type="text"
            value={resumeData.contact.linkedin}
            onChange={e =>
              setResumeData(prev => ({
                ...prev,
                contact: { ...prev.contact, linkedin: e.target.value }
              }))
            }
            placeholder="LinkedIn profile"
            className="input-box"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="icon">{icons.github}</div>
        <div className="input-content">
          <label>GitHub</label>
          <input
            type="text"
            value={resumeData.contact.github}
            onChange={e =>
              setResumeData(prev => ({
                ...prev,
                contact: { ...prev.contact, github: e.target.value }
              }))
            }
            placeholder="GitHub profile"
            className="input-box"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="icon">{icons.portfolio}</div>
        <div className="input-content">
          <label>Location</label>
          <input
            type="text"
            value={resumeData.contact.location}
            onChange={e =>
              setResumeData(prev => ({
                ...prev,
                contact: { ...prev.contact, location: e.target.value }
              }))
            }
            placeholder="City, Country"
            className="input-box"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="icon">{icons.description}</div>
        <div className="input-content">
          <label>Summary</label>
          <textarea
            rows="3"
            value={resumeData.summary}
            onChange={e => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
            placeholder="Write a short professional summary"
            className="input-box"
          />
        </div>
      </div>
    </>
  );
case 1: // Education
  return (
    <div>
      {resumeData.education.map((edu, idx) => (
        <div key={idx} className="education-card">
          <h4 className="section-heading">🎓 Education {idx + 1}</h4>

          {renderInput("education", idx, "degree", "Degree / Qualification")}
          {renderInput("education", idx, "school", "Institution / College / University")}
          {renderInput("education", idx, "city", "City / Location")}
          {renderInput("education", idx, "year", "Year / Duration (e.g. 2017 – 2021)")}
          {renderInput("education", idx, "score", "Score / Percentage / CGPA")}

          <button
            onClick={() => removeEntry("education", idx)}
            className="btn-secondary mt-2"
          >
            Remove
          </button>

          <hr className="divider" />
        </div>
      ))}

      <button
        className="btn-primary mt-3"
        onClick={() =>
          addEntry("education", { degree: "", school: "", year: "", city: "", score: "" })
        }
      >
        + Add Education
      </button>
    </div>
  );

case 2: // Experience
  return (
    <div>
      {resumeData.experience.map((exp, idx) => (
        <div key={idx} className="experience-card">
          <h4 className="section-heading">💼 Experience {idx + 1}</h4>

          {/* Basic Fields */}
          {renderInput("experience", idx, "role", "Role / Designation")}
          {renderInput("experience", idx, "company", "Company Name")}
          {renderInput("experience", idx, "duration", "Duration (e.g. Jan 2023 – Present)")}

          {/* Description Points */}
          <div className="details-section mt-3">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Key Responsibilities / Achievements
            </label>

            {(exp.details || []).map((detail, dIdx) => (
              <div key={dIdx} className="input-row items-start mb-2">
                <div className="icon mt-2">•</div>

                <textarea
                  value={detail}
                  onChange={(e) => {
                    const updated = [...(exp.details || [])];
                    updated[dIdx] = e.target.value;
                    updateEntry("experience", idx, "details", updated);
                  }}
                  placeholder="Describe a key contribution or achievement..."
                  className="input-box multiline-textarea flex-1"
                  rows={3}
                />

                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(exp.details || [])];
                    updated.splice(dIdx, 1);
                    updateEntry("experience", idx, "details", updated);
                  }}
                  className="btn-secondary ml-2"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Add new point button */}
            <button
              type="button"
              onClick={() => {
                const updated = [...(exp.details || []), ""];
                updateEntry("experience", idx, "details", updated);
              }}
              className="btn-primary mt-2"
            >
              + Add Another Point
            </button>
          </div>

          {/* Remove entire experience */}
          <button
            type="button"
            onClick={() => removeEntry("experience", idx)}
            className="btn-secondary mt-4"
          >
            🗑️ Remove This Experience
          </button>

          <hr className="divider" />
        </div>
      ))}

      {/* Add New Experience */}
      <button
        type="button"
        className="btn-primary mt-3"
        onClick={() =>
          addEntry("experience", {
            role: "",
            company: "",
            duration: "",
            details: [""],
          })
        }
      >
        + Add Experience
      </button>
    </div>
  );

      case 3: // Skills
        return (
          <div className="input-row">
            <div className="icon">{icons.skills}</div>
            <div className="input-content">
              <label>Skills (comma separated)</label>
              <textarea
                rows="3"
                placeholder="React, Node.js, Python, SQL, ..."
                value={resumeData.skills}
                onChange={e => setResumeData(prev => ({ ...prev, skills: e.target.value }))}
                className="input-box"
              />
            </div>
          </div>
        );

      case 4: // Projects
        return (
          <div>
            {resumeData.projects.map((proj, idx) =>
              <>
                {renderInput("projects", idx, "title", "Project Title")}
                {renderInput("projects", idx, "link", "Project Link")}
                {renderInput("projects", idx, "description", "Description")}
                {renderInput("projects", idx, "technologies", "Technologies Used")}
              </>
            )}
            <button
              className="btn-primary mt-3"
              onClick={() => addEntry("projects", { title: "", link: "", description: "", technologies: "" })}
            >
              + Add Project
            </button>
          </div>
        );

      case 5: // Certificates
        return (
          <div>
            {resumeData.certificates.map((cert, idx) =>
              <>
                {renderInput("certificates", idx, "title", "Certificate / Award Name")}
                {renderInput("certificates", idx, "issuer", "Issuer / Organization")}
                {renderInput("certificates", idx, "year", "Year")}
              </>
            )}
            <button
              className="btn-primary mt-3"
              onClick={() => addEntry("certificates", { title: "", issuer: "", year: "" })}
            >
              + Add Certificate
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="resume-form">
      <h2 className="title text-center animate-pulse">🌈 Professional Resume Builder</h2>
      <p className="subtitle text-center">Build a corporate-ready, ATS-friendly resume step by step</p>

      {/* Stepper */}
      <div className="stepper flex justify-between mb-6">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`step ${activeStep === i ? "active" : ""} ${activeStep > i ? "completed" : ""}`}
          >
            <div className="step-circle">
              {activeStep > i ? <CheckCircle fontSize="small" /> : i + 1}
            </div>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="form-section p-4 bg-white rounded-2xl shadow-xl">{renderStepContent()}</div>

      <div className="button-group flex justify-between mt-6">
        <button onClick={handleBack} disabled={activeStep === 0} className="btn-secondary">
          ⬅ Back
        </button>
        <button onClick={handleNext} disabled={loading} className="btn-primary">
          {loading
            ? "Saving..."
            : activeStep === steps.length - 1
            ? "🎉 Finish & Save"
            : "Next ➡"}
        </button>
      </div>
    </div>
  );
}

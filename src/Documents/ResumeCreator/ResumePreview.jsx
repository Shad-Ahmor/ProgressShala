import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import './ResumePreview.css';

export default function ResumePreview({ onBack }) {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await api.get("/doc", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        // Map API response to your professional layout
        const formattedData = {
          name: data.basicDetails?.name || "",
          title: data.formDetails?.headline || "Professional Headline",
          contact: {
            email: data.basicDetails?.email || "",
            phone: data.basicDetails?.phone || "",
            location: data.basicDetails?.city || "",
            linkedin: data.basicDetails?.linkedin || "",
            github: data.basicDetails?.github || "",
            portfolio: data.basicDetails?.portfolio || "",
          },
          summary: data.formDetails?.summary || data.formDetails?.headline || "",
          skills: data.formDetails?.skills || [],
          experience: (data.formDetails?.experience || data.experience || []).map(exp => ({
            role: exp.position || exp.role || "",
            company: exp.company || "",
            duration: exp.duration || "",
            details: Array.isArray(exp.details) ? exp.details : exp.description ? [exp.description] : [],
          })),
          projects: (data.formDetails?.projects || data.projects || []).map(proj => ({
            name: proj.title || proj.name || "",
            description: proj.description || "",
            link: proj.link || "",
            technologies: proj.technologies || "",
          })),
          education: (data.formDetails?.education || data.education || []).map(edu => ({
            degree: edu.degree || "",
            school: edu.institution || edu.school || "",
            year: edu.year || edu.duration || "",
            grade: edu.grade || "",
          })),
          certificates: (data.formDetails?.certifications || data.certificates || []).map(cert => ({
            title: cert.title || cert.name || "",
            issuer: cert.issuer || "",
            year: cert.year || "",
          })),
        };

        setResumeData(formattedData);
      } catch (err) {
        console.error("Error fetching resume:", err);
        setError("Failed to load resume data.");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [navigate]);

  if (loading) return <div className="loading-screen">Loading Resume...</div>;
  if (error || !resumeData)
    return (
      <div className="error-screen">
        <p className="error-message">{error || "No Resume Data Found"}</p>
        <button onClick={onBack} className="back-button">← Go Back</button>
      </div>
    );

  return (
    <div className="resume-container">
      <button onClick={onBack} className="back-button print-hide">← Back</button>

      {/* Header */}
      <div className="resume-header">
        <h1 className="resume-name">{resumeData.name}</h1>
        <p className="resume-title">{resumeData.title}</p>
        <div className="contact-info">
          {resumeData.contact.location && <span>{resumeData.contact.location}</span>}
          {resumeData.contact.email && <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a>}
          {resumeData.contact.phone && <span>{resumeData.contact.phone}</span>}
          {resumeData.contact.linkedin && <a href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>}
          {resumeData.contact.github && <a href={`https://${resumeData.contact.github}`} target="_blank" rel="noreferrer">GitHub</a>}
          {resumeData.contact.portfolio && <a href={`https://${resumeData.contact.portfolio}`} target="_blank" rel="noreferrer">Portfolio</a>}
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <section className="resume-section">
          <h2 className="section-heading">Professional Summary</h2>
          <p>{resumeData.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Skills</h2>
          <div className="skills-list">
            {resumeData.skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
          </div>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Experience</h2>
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="detail-item">
              <div className="item-header">
                <p className="item-role">{exp.role}</p>
                <p className="item-duration">{exp.duration}</p>
              </div>
              <p className="item-company">{exp.company}</p>
              <ul className="item-bullet-points">
                {exp.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Projects</h2>
          {resumeData.projects.map((proj, idx) => (
            <div key={idx} className="detail-item">
              <p className="item-role">{proj.name}</p>
              <p>{proj.description}</p>
              {proj.technologies && <p>Tech Stack: {proj.technologies}</p>}
              {proj.link && <p>Link: <a href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a></p>}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Education</h2>
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="detail-item">
              <div className="item-header">
                <p className="item-degree">{edu.degree}</p>
                <p className="item-year">{edu.year}</p>
              </div>
              <p className="item-school">{edu.school}</p>
              {edu.grade && <p className="education-grade">Grade: {edu.grade}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resumeData.certificates.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Certifications</h2>
          {resumeData.certificates.map((cert, idx) => (
            <div key={idx} className="detail-item">
              <p className="item-role">{cert.title} | {cert.issuer}</p>
              {cert.year && <p className="item-duration">Year: {cert.year}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

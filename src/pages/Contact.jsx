import React, { useState } from "react";
import ScrollReveal from "../components/ScrollReveal"; // हुक वाला कंपोनेंट

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e) => {
    e.preventDefault();
    alert("Message sent (demo).");
    setForm({ name: "", email: "", message: "" });
  };

  return ( 
    <main className="page-container contact-container"> 
      
      {/* Title reveals first (Delay 0.0s) */}
      <ScrollReveal delay={0.0}>
        <h1 className="page-title">Contact Us</h1> 
      </ScrollReveal>

      {/* Subtitle reveals second (Delay 0.1s) */}
      <ScrollReveal delay={0.1}>
        <p className="section-sub">Questions? Partnerships? Drop a note.</p>
      </ScrollReveal>

      <form onSubmit={submit} className="contact-form">
        
        {/* Input fields stagger (Delay 0.2s, 0.3s, 0.4s) */}
        <ScrollReveal delay={0.2}>
          <input
            className="search-input"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <input
            className="search-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <textarea
            className="search-input"
            placeholder="Message"
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </ScrollReveal>

        {/* Button reveals last (Delay 0.5s) */}
        <ScrollReveal delay={0.5}>
          <button type="submit" className="enroll-btn" style={{ width: '100%', maxWidth: 220 }}>
            Send Message
          </button>
        </ScrollReveal>
      </form>
    </main>
  );
}
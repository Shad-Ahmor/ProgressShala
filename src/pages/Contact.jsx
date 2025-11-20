import React, { useState } from "react";

export default function Contact() {
const [form, setForm] = useState({ name: "", email: "", message: "" });
const submit = (e) => {
e.preventDefault();
alert("Message sent (demo).");
setForm({ name: "", email: "", message: "" });
};

return ( 
  <main className="page-container contact-container"> 
    {/* Changed .h1 to .page-title */}
    <h1 className="page-title">Contact Us</h1> 
    <p className="section-sub">Questions? Partnerships? Drop a note.</p>

    <form onSubmit={submit} className="contact-form">
      {/* Changed .input to .search-input/contact-form input for neon style */}
      <input
        className="search-input"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="search-input"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        className="search-input" // Using search-input style for textarea as well
        placeholder="Message"
        rows={6}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {/* Changed .btn .btn-primary to .enroll-btn for a prominent neon button */}
      <button type="submit" className="enroll-btn" style={{ width: '100%', maxWidth: 220 }}>
        Send Message
      </button>
    </form>
  </main>
);
}
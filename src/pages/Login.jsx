import React, { useState } from "react";
import LoginModal from "../components/LoginModal";

export default function Login() {
  const [open, setOpen] = useState(true);
  return (
    <main className="page-container">
      <h1 className="h1">Login</h1>
      <p className="muted">Open the modal to sign in (demo).</p>
      <div style={{ marginTop: 18 }}>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>Open Login</button>
      </div>

      {open && <LoginModal onClose={() => setOpen(false)} />}
    </main>
  );
}

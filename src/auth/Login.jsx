// Login.jsx

import React, { useState, useEffect, useRef } from "react";
import { X, UserPlus, LogIn } from "lucide-react";
import "../../styles/login.css"; 
import AnimatedStepper from "./AnimatedStepper";

import { auth, signInWithEmailAndPassword } from "../firebase"; 


// --- CONTEXT DEPENDENCIES ---
import { useNavigate } from "react-router-dom"; 
// --- END CONTEXT DEPENDENCIES ---

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login({ onClose, onLogin,setUseruidRole }) {
      const [isLogin, setIsLogin] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(""); // Simplified error/message state

    const navigate = useNavigate();
  
    const sessionRef = useRef({ token: null });
    const refreshInterval = useRef(null);
  
    const handleLogout = () => {
      clearInterval(refreshInterval.current);
      sessionRef.current = { token: null };
      onLogin(null);
      navigate("/login", { replace: true });
    };
  
    const startTokenRefresh = async (user) => {
      refreshInterval.current = setInterval(async () => {
        try {
          const idToken = await user.getIdToken(true);
          sessionRef.current.token = idToken;
        } catch (err) {
          console.error("Token refresh failed:", err);
          handleLogout();
        }
      }, 30 * 60 * 1000);
    };

    useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 20);
    return () => clearTimeout(timer);
}, []);
  
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      setOpenSnackbar(false);
    if (!isLogin) {
      setLoading(false);
      return;
    }
      try {
        // Backend login
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Invalid Credentials");
  
        // Firebase login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        const idToken = await firebaseUser.getIdToken();
  
        const cleanedFirstName = email.split("@")[0].split(".")[0].replace(/[^a-zA-Z]/g, "");
  
        const userRoleData = {
          uid: data.user.uid,
          role: data.user.role,
          designation: data.user.designation,
          name: cleanedFirstName,
          subrole: data.user.subrole,
          courses: data.user.courses,
          profile: data.user.image,
        };
  
        setUseruidRole(userRoleData);
        localStorage.setItem("hc_user_role", JSON.stringify(userRoleData)); // ✅ persist
  
        sessionRef.current = { token: idToken, ...userRoleData };
  
        startTokenRefresh(firebaseUser);
  
        onLogin({
          email,
          role: data.user.role,
          uid: data.user.uid,
          name: cleanedFirstName,
          getToken: () => sessionRef.current.token,
          logout: handleLogout,
        });
  
        setMessage("Login successful! Redirecting...");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/interndashboard"), 1000);
      } catch (err) {
        console.error(err);
        setMessage(err.message || "Something went wrong.");
        setOpenSnackbar(true);
      }
  
      setLoading(false);
    };
  
  

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 900);
  };

  const stopClick = (e) => e.stopPropagation();

  // --- JSX Rendering (Unchanged) ---
  return (
    <div
      className="book-auth-wrapper" 
      onClick={handleClose}
    >
      <div
        className={`book-container ${isOpen ? "open" : ""}`} 
        onClick={stopClick}
      >
        {/* LEFT PAGE — LOGIN PANEL */}
        <div
          className={`book-page left ${
            isLogin ? "active-panel" : ""
          } ${isRegisterMode ? "shrink-left" : ""}`}
        >
          <div className="panel-header">
            <LogIn size={20} className="icon-badge" />
            <h2>Welcome Back!</h2>
          </div>

          <p className="sub-text">
            Sign in to continue your learning journey.
          </p>

          <form onSubmit={handleSubmit} className="form-content">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              className="book-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="book-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Display error/message here */}
            {error && isLogin && <p className={`error-msg ${error.includes("successful") ? 'success-msg' : ''}`}>{error}</p>}

            <button type="submit" className="book-btn" disabled={loading}>
              {loading ? "Signing In..." : "Log In"}
            </button>

            {/* Register link */}
            <div className="text-small">
              Don't have an account?
              <span
                className="link-switch"
                onClick={() => {
                  setIsLogin(false);
                  setIsRegisterMode(true);
                }}
              >
                &nbsp;Register here.
              </span>
            </div>
          </form>
        </div>

        {/* RIGHT PAGE — REGISTER STEPPER */}
        <div
          className={`book-page right ${
            !isLogin ? "active-panel" : ""
          } ${isRegisterMode ? "slide-over active-front" : ""}`}
        >
          {!isLogin ? (
            <AnimatedStepper onSuccessClose={handleClose} />
          ) : (
            <>
              <div className="panel-header">
                <UserPlus size={20} className="icon-badge secondary" />
                <h2>Join ProgressShala</h2>
              </div>

              <p className="sub-text">
                Create your account and start mastering skills.
              </p>
            </>
          )}
        </div>

        {/* Close Button */}
        <button
          className="close-x-book"
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
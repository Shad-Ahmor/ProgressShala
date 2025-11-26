// App.jsx

import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// Components
import Footer from "./components/Footer";
import RoutesConfig from "./main/RoutesConfig";
import Login from "./Auth/Login";

export default function App() {
// --- Global App State ---
const [openLogin, setOpenLogin] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [role, setRole] = useState(null);
const [userId, setUserId] = useState(null);
const storedUserRole = JSON.parse(localStorage.getItem("hc_user_role")) || {};
const [useruidrole, setUseruidRole] = useState(storedUserRole);
// 🛑 ADDITION: Loading state to wait for session restoration
const [authLoaded, setAuthLoaded] = useState(false); 

// Session object as single source of truth
const sessionRef = useRef({ token: null, user: null });


// ✅ Session Restoration: Check localStorage on component mount
useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userDataString = localStorage.getItem("userRoleData");

    if (token && userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            
            // 1. Update sessionRef
            sessionRef.current = {
                token: token,
                ...userData,
                user: { 
                    uid: userData.uid, 
                    role: userData.role, 
                    name: userData.name, 
                    profile: userData.profile 
                },
            };

            // 2. Update App-level state for rendering
            setIsLoggedIn(true);
            setRole(userData.role);
            setUserId(userData.uid);
            console.log("Session restored from localStorage.");
            
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("authToken");
            localStorage.removeItem("userRoleData");
            setIsLoggedIn(false);
        }
    }
    
    // 🛑 IMPORTANT: Mark loading complete after checking localStorage
    setAuthLoaded(true); 
    
}, []); // Run only once on mount


// --- Helper Functions ---

const handleLoginSuccess = (data) => {
// Data comes from Login.jsx, which already handled localStorage and sessionRef update
sessionRef.current = {
    token: data.getToken(),
    user: { uid: data.uid, role: data.role, name: data.name },
};

// Update App-level state for rendering
setIsLoggedIn(true);
setRole(data.role);
setUserId(data.uid);

setOpenLogin(false);
};

// ✅ Logout Function: Clears state and localStorage
const handleLogout = () => {
sessionRef.current = { token: null, user: null };

// 🛑 Clears localStorage on explicit logout
localStorage.removeItem("authToken");
localStorage.removeItem("userRoleData");

setIsLoggedIn(false);
setRole(null);
setUserId(null);
setOpenLogin(false);
};

// Function to trigger login modal
const openLoginModal = () => setOpenLogin(true);


// 🛑 ADDITION: Wait for session restoration before rendering routes
if (!authLoaded) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px', color: '#555' }}>
            Loading Session...
        </div>
    );
}

return ( 
    <BrowserRouter>
        {/* Routes */}
        <RoutesConfig
            sessionRef={sessionRef}
            setSession={(data) => (sessionRef.current = data)}
            openLogin={openLoginModal}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setRole={setRole}
            // ✅ PASSING LOGOUT: Pass the complete handleLogout function down
            handleLogout={handleLogout} 
        />

        {/* Footer */}
        <Footer />

        {/* Global Login Modal */}
        {openLogin && (
            <div
                className="fixed-login-overlay"
                onClick={() => setOpenLogin(false)}
            >
                <Login
                    onClose={() => setOpenLogin(false)}
                    onLogin={handleLoginSuccess}
                    setUseruidRole={setUseruidRole}
                />
            </div>
        )}
    </BrowserRouter>
);
}
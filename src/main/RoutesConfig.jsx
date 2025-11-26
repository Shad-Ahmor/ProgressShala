import React, { useState, useRef, useEffect, cloneElement } from "react"; // cloneElement इंपोर्ट किया गया
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Attendance from "../auth/Attendance";
import CreateAssignment from "../course/CreateAssignment";
import SubmitTaskPage from "../course/SubmitTaskPage";
import ManagerReview from "../course/ManagerReview";
import FinalReviewPage from "../course/AdminReviewPage";
import AssignmentResults from "../course/AssignmentResults";
import InternDashboard from "../Intern/InternDashboard";
import Sidebar from "./Sidebar";
import { Box, useTheme } from "@mui/material";
import ChangePassword from "../auth/ChangePassword";
import CourseSelectionPage from "../course/CourseSelectionPage";
import SelectedCourse from "../course/SelectedCourse";
import AddCourse from "../course/AddCourse";
import CompanyHierarchy from "../Hierarchy/Profile/CompanyHierarchy";

// ---------------- Dashboard Layout Wrapper (FINAL MODIFIED) ----------------
// यह कंपोनेंट sessionRef को अपने children (रूट कंपोनेंट) को पास करने का काम करता है।
const DashboardLayout = ({ children, isLoggedIn, setIsLoggedIn, setRole, sessionRef, handleLogout }) => { 
  const [openSidebar, setOpenSidebar] = useState(true);
  const theme = useTheme(); 
  const drawerWidth = 250; 
  const closedDrawerWidth = theme.spacing(9); 

  // 🛑 FIX: children को sessionRef प्रॉप के साथ क्लोन करें
  const childrenWithProps = cloneElement(children, { sessionRef });

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        open={openSidebar}
        handleDrawerClose={() => setOpenSidebar(false)}
        handleDrawerOpen={() => setOpenSidebar(true)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setRole={setRole}
        // ✅ DashboardLayout को sessionRef पास करें (Sidebar के लिए)
        sessionRef={sessionRef} 
        handleGlobalLogout={handleLogout}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",
          ml: openSidebar ? `${drawerWidth}px` : closedDrawerWidth,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {childrenWithProps} {/* क्लोन किए गए चाइल्ड को रेंडर करें */}
      </Box>
    </Box>
  );
};

// ---------------- Routes Configuration (FINAL MODIFIED) ----------------
export default function RoutesConfig({sessionRef,setSession ,openLogin, isLoggedIn, setIsLoggedIn, setRole,handleLogout  }) { 

  const isAuthenticated = () => !!sessionRef?.current?.token;

  // DashboardLayout को पास करने के लिए पुन: प्रयोज्य प्रॉप ऑब्जेक्ट
  const dashboardProps = {
    isLoggedIn,
    setIsLoggedIn,
    setRole,
    // ✅ DashboardLayout को sessionRef और handleLogout पास करें
    sessionRef, 
    handleLogout
  };

  // ✅ HELPER COMPONENT: यह सभी प्रोटेक्टेड रूट्स को रैप करता है और sessionRef को इंजेक्ट करता है।
  const ProtectedRoute = ({ element: Component }) => (
    isAuthenticated() ? (
      <DashboardLayout {...dashboardProps}>
        {/* Component को यहाँ पास करें। DashboardLayout इसे क्लोन करके sessionRef देगा। */}
        <Component />
      </DashboardLayout>
    ) : (
      <Navigate to="/" />
    )
  );


  return (
    <Routes>
      {/* Public Home */}
      <Route path="/" element={<Home openLogin={openLogin} />} />

      {/* -------------------- Protected Routes -------------------- */}
      
      {/* ✅ FIX: अब सभी कंपोनेंट को sessionRef खुद से मिलेगा */}
      <Route path="/attendance" element={<ProtectedRoute element={Attendance} />} />
      <Route path="/interndashboard" element={<ProtectedRoute element={InternDashboard} />} />
      <Route path="/passwordchange" element={<ProtectedRoute element={ChangePassword} />} />
      
      {/* Course Routes */}
      <Route path="/course-selection" element={<ProtectedRoute element={CourseSelectionPage} />} />
      <Route path="/course/:courseId" element={<ProtectedRoute element={SelectedCourse} />} />
      <Route path="/addcourse" element={<ProtectedRoute element={AddCourse} />} />
      
      {/* Assignment/Task Routes */}
      <Route path="/assign-task" element={<ProtectedRoute element={CreateAssignment} />} />
      <Route path="/submit-task" element={<ProtectedRoute element={SubmitTaskPage} />} />
      <Route path="/review-submission" element={<ProtectedRoute element={ManagerReview} />} />
      <Route path="/final-review" element={<ProtectedRoute element={FinalReviewPage} />} />
      <Route path="/assignmentresult" element={<ProtectedRoute element={AssignmentResults} />} />
      
      {/* New Hierarchy Route */}
      <Route path="/hierarchy" element={<ProtectedRoute element={CompanyHierarchy} />} />

    </Routes>
  );
}
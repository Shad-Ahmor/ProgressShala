import React, { useMemo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Divider,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuBar from "./Menubar.jsx";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "linear-gradient(145deg, #f7f7f7, #ffffff)",
  color: "#333",
  boxShadow:
    "4px 4px 10px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.7)",
  borderRight: "1px solid #eee",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  background: "linear-gradient(145deg, #f8f8f8, #ffffff)",
  color: "#333",
  boxShadow:
    "inset 3px 3px 6px rgba(0,0,0,0.05), inset -3px -3px 6px rgba(255,255,255,0.8)",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 2),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// --------------------------------------------------
// 🧠 SIDEBAR COMPONENT
// --------------------------------------------------
const Sidebar = ({
  Setuserimg,
  open,
  handleDrawerClose,
  handleDrawerOpen, // 🛑 New prop added for opening the drawer
  isLoggedIn,
  setIsLoggedIn,
  setRole,
  sessionRef,
  handleGlobalLogout,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: "", role: "" });

  const token = sessionRef?.current?.token || null;
  const user = sessionRef?.current?.user || {};

  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  useEffect(() => {
    if (Setuserimg && user?.profileImg) {
      Setuserimg(user.profileImg);
    }
  }, [Setuserimg, user?.profileImg]);

  useEffect(() => {
    if (token && user?.role) {
      setIsLoggedIn(true);
      setRole(user.role);
      setUserProfile({
        name: user.name?.toUpperCase() || "USER",
        role: user.role?.toUpperCase() || "ROLE",
      });
    }
  }, [token, user, setIsLoggedIn, setRole]);

  // Fetch Permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!token || !user?.uid || !user?.role) return;
      try {
        const res = await axios.post(
          "http://localhost:5000/api/permission-summary",
          { uid: user.uid, role: user.role, department: user.department, team: user.team },
          { headers }
        );
        setPermissions(res.data.permissions || []);
      } catch (err) {
        console.error("Error fetching permissions:", err);
      }
    };
    fetchPermissions();
  }, [headers, token, user]);

  const hasPermission = useCallback(
    (baseurl, url, method) => {
      if (!Array.isArray(permissions)) return false;
      const key = `${baseurl || ""}${url || ""}:${(method || "GET").toUpperCase()}`;
      return permissions.includes(key);
    },
    [permissions]
  );

  const handleNavigate = useCallback(
    (route) => {
      navigate(route);
      // 🛑 Only call close if it's open, otherwise it does nothing if we are handling open/close here
      open ? handleDrawerClose?.() : null; 
    },
    [navigate, handleDrawerClose, open]
  );

  const handleLoginButtonClick = useCallback(() => navigate("/login"), [navigate]);




  const handleLogoutButtonClick = useCallback(() => {
    handleGlobalLogout(); // 🛑 This now runs the App.jsx function (clears localStorage, clears state, navigates)
    navigate("/"); // Navigate to home or login after clearing session
  }, [handleGlobalLogout, navigate]);


  const currentUser = {
    id: user?.uid,
    name: user?.name,
    role: user?.role,
    subrole: user?.subrole,
    course: user?.course,
    department: user?.department,
    team: user?.team,
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {open && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src={user?.profileImg}
              alt="User"
              sx={{ width: 46, height: 46, boxShadow: "0 4px 8px rgba(0,0,0,0.15)", border: "2px solid #fff" }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#222", letterSpacing: 0.5 }}>
                {userProfile.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#777" }}>
                {userProfile.role}
              </Typography>
            </Box>
          </Box>
        )}

        {/* 🛑 MODIFIED ICON AND LOGIC: Use different icons and functions based on 'open' state */}
        <Tooltip title={open ? "Close Sidebar" : "Open Sidebar"}>
          <IconButton
            onClick={open ? handleDrawerClose : handleDrawerOpen} // 🛑 Calls close when open, calls open when closed
            sx={{ color: "#666", backgroundColor: "#fff", boxShadow: "2px 2px 6px rgba(0,0,0,0.1), -2px -2px 6px rgba(255,255,255,0.6)", "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            {/* 🛑 Display appropriate icon based on 'open' state */}
            {open ? (
              theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />
            ) : (
              theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />
            )}
          </IconButton>
        </Tooltip>
      </DrawerHeader>

      <Divider sx={{ borderColor: "#eee" }} />

      <MenuBar
        open={open}
        handleNavigate={handleNavigate}
        hasPermission={hasPermission}
        isLoggedIn={isLoggedIn}
        handleLoginButtonClick={handleLoginButtonClick}
        handleLogoutButtonClick={handleLogoutButtonClick} 
        decryptroles={user?.role}
        decryptdesignation={user?.designation}
        permissions={permissions}
      />
    </Drawer>
  );
};

export default Sidebar;
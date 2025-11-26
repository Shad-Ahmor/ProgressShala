import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, ListItemButton, Collapse } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    CalendarMonth as CalendarMonthIcon,
    LockOpen as LockOpenIcon,
    School as SchoolIcon, 
    Assignment as AssignmentIcon, 
    ChevronRight as ExpandMore,
    ChevronLeft as ExpandLess,
    Task as AssignTaskIcon,
    AddTask as AddCourseIcon, 
    RateReview as ReviewIcon, 
    CheckCircle as FinalReviewIcon, 
    History as ResultsIcon, 
    Add as AddIcon,
    LocalLibrary as LocalLibraryIcon,
    Group as HierarchyIcon // ✅ NEW ICON for Hierarchy Management
} from '@mui/icons-material';

export default function Menubar({
    decryptroles,
    decryptdesignation,
    open,
    handleNavigate,
    hasPermission,
    isLoggedIn,
    handleLoginButtonClick,
    handleLogoutButtonClick,
    permissions,
}) {
    const [openAssignment, setOpenAssignment] = useState(false);
    const [openCourseAdmin, setOpenCourseAdmin] = useState(false); 

    const isAdmin = decryptroles === 'Admin';
    const isManager = decryptdesignation === 'Mnager';
    const isIntern = decryptdesignation === 'Intern';

    useEffect(() => {
        if (!open) {
            setOpenAssignment(false);
            setOpenCourseAdmin(false);
        }
    }, [open]);

    const iconColors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#F7B32B", "#9D4EDD", "#FF914D", "#3CCF4E"];
    const randomColor = () => iconColors[Math.floor(Math.random() * iconColors.length)];
    const iconBox = (IconComponent) => <IconComponent sx={{ color: randomColor(), fontSize: 24 }} />;

    // ✅ MODIFIED: renderMenuItem अब optional padding (pl) और custom styles (sx) स्वीकार करता है
    const renderMenuItem = (path, text, IconComponent, sx = {}) => (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                onClick={() => handleNavigate(path)}
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    ...sx // Apply custom styles (like padding-left)
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {iconBox(IconComponent)}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    );

    return (
        <div>
            <List>
                {/* -------------------- CORE ROUTES -------------------- */}

                {renderMenuItem('/interndashboard', 'Dashboard', DashboardIcon)}
                {renderMenuItem('/attendance', 'Attendance', CalendarMonthIcon)}
                {renderMenuItem('/passwordchange', 'Change Password', LockOpenIcon)}
                
                {/* 🛑 NEW: Hierarchy Management (Admin Only) */}
                {renderMenuItem('/hierarchy', 'Hierarchy', HierarchyIcon)}

                {/* -------------------- COURSE MANAGEMENT (ADMIN/MANAGER) -------------------- */}
                
                {(isAdmin || isManager) && (
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => setOpenCourseAdmin(!openCourseAdmin)}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {iconBox(SchoolIcon)}
                            </ListItemIcon>
                            <ListItemText primary="Course Admin" sx={{ opacity: open ? 1 : 0 }} />
                            {open ? (openCourseAdmin ? <ExpandLess /> : <ExpandMore />) : null}
                        </ListItemButton>
                    </ListItem>
                )}

                {(isAdmin || isManager) && (
                    <Collapse in={openCourseAdmin} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            
                            {/* Sub-Item: Add Course */}
                            {renderMenuItem('/addcourse', 'Add Course', AddIcon, { pl: 4 })}
                     
                            {/* Sub-Item: Select Course */}
                            {renderMenuItem('/course-selection', 'Select Course', LocalLibraryIcon, { pl: 4 })}
                            
                        </List>
                    </Collapse>
                )}
                
                {/* -------------------- ASSIGNMENT / TASK MODULE -------------------- */}
                
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        onClick={() => setOpenAssignment(!openAssignment)}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {iconBox(AssignmentIcon)}
                        </ListItemIcon>
                        <ListItemText primary="Task Management" sx={{ opacity: open ? 1 : 0 }} />
                        {open ? (openAssignment ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItemButton>
                </ListItem>

                <Collapse in={openAssignment} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        
                        {/* Assign Task (Admin/Manager) */}
                        {(isAdmin || isManager) && renderMenuItem('/assign-task', 'Create Assignment', AssignTaskIcon, { pl: 4 })}

                        {/* Submit Task (Intern) */}
                        {isIntern && renderMenuItem('/submit-task', 'Submit Task', AssignTaskIcon, { pl: 4 })}

                        {/* Manager Review */}
                        {(isManager || isAdmin) && renderMenuItem('/review-submission', 'Manager Review', ReviewIcon, { pl: 4 })}

                        {/* Final Review (Admin) */}
                        {isAdmin && renderMenuItem('/final-review', 'Final Review', FinalReviewIcon, { pl: 4 })}
                        
                        {/* Assignment Results (All) */}
                        {renderMenuItem('/assignmentresult', 'Task Results', ResultsIcon, { pl: 4 })}

                    </List>
                </Collapse>

                {/* -------------------- LOGIN / LOGOUT -------------------- */}
                {isLoggedIn ? (
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleLogoutButtonClick}
                            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>{iconBox(LogoutIcon)}</ListItemIcon>
                            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ) : (
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleLoginButtonClick}
                            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>{iconBox(LoginIcon)}</ListItemIcon>
                            <ListItemText primary="Login" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </div>
    );
}
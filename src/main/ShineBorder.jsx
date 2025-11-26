// src/main/ShineBorder.jsx (Modified - Assuming this structure)

import React from 'react';
import '../../styles/ShineBorder.css';

const ShineBorder = ({ children, sx }) => { // sx prop added for flexibility
  return (
    <div className="shine-border-wrapper" style={sx}>
      {/* 1. Glow effect (the actual shine) */}
      <div className="shine-border-glow" />
      
      {/* 2. Content container (to hide the glow in the center) */}
      {/* ✅ FIX: 3D effect के लिए एक internal wrapper जोड़ें */}
      <div className="shine-border-content">
        {children} {/* Card is placed here */}
      </div>
    </div>
  );
};

export default ShineBorder;
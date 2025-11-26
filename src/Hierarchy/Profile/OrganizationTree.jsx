// src/Hierarchy/OrganizationTree.jsx

import React, { useState } from 'react';
import EmployeeCard from './EmployeeCard';

const OrganizationTree = ({ data, level = 0, currentUserId }) => { // currentUserId प्रॉप को स्वीकार करें
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  if (!data) {
    return <p>Data not available</p>;
  }

  const employees = Array.isArray(data.employees) ? data.employees : [];
  
  // ✅ LOGIC: वर्तमान यूजर की पहचान
  const isCurrentUser = data.id === currentUserId; 

  // बटन केवल तभी दिखाएं जब बच्चे हों
  const showToggleButton = employees.length > 0;

  return (
    <div
      className="treeNode"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // 🛑 FIX: अनावश्यक हॉरिजॉन्टल मार्जिन हटा दिया गया
        position: 'relative',
      }}
    >
      <div className="cardHeader" onClick={showToggleButton ? toggleCollapse : undefined} >
        {/* ✅ PASS: isCurrentUser प्रॉप पास करें */}
        <EmployeeCard name={data.name} role={data.role} imageUrl={data.imageUrl} isCurrentUser={isCurrentUser} />
        {showToggleButton && <button className="toggleButton">{isExpanded ? '—' : '+'}</button>}
      </div>

      {isExpanded && employees.length > 0 && (
        <div
          className="childrenContainer"
          style={{
            display: 'flex',
            // ✅ FIX: केवल केंद्र में जस्टिफाई करें ताकि यह अनावश्यक रूप से न फैले
            justifyContent: 'center', 
            width: '100%',
            marginTop: '30px', 
            position: 'relative',
          }}
        >
          {/* Parent से Horizontal Line तक की Vertical Line */}
          <div className="verticalLine" /> 
          
          <div
            className="childNodes"
            style={{
              display: 'flex',
              // ✅ FIX: justify-content को center करें
              justifyContent: 'center',
              // ✅ ADD: सुनिश्चित करें कि यह एक लाइन में रहे (ओवरफ्लो-X के लिए)
              flexWrap: 'nowrap', 
              // 🛑 REMOVED: width: '100%',
            }}
          >
            {employees.map((employee) => (
              <div 
                key={employee.id} 
                className="childWrapper"
                style={{ 
                  // 🛑 FIX: flex: 1 को हटा दिया गया जो ओवरफ्लो कर रहा था
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  padding: '0 20px', // Siblings के बीच जगह
                }}
              >
                {/* Child Card के ऊपर की Vertical Line */}
                <div className="connectionLine" />
                <OrganizationTree 
                  data={employee} 
                  level={level + 1} 
                  currentUserId={currentUserId} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default OrganizationTree;
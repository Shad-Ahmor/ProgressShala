// src/Hierarchy/EmployeeCard.jsx

import React from 'react';

// ✅ ADDED: isCurrentUser प्रॉप स्वीकार करें
const EmployeeCard = ({ name, role, imageUrl, isCurrentUser }) => {
  return (
    <div className={`card ${isCurrentUser ? 'current-user' : ''}`}>
      <div className="imageContainer">
        <img src={imageUrl} alt={name} className={`image ${isCurrentUser ? 'current-user-image' : ''}`} />
      </div>
      <div className="cardContent">
        <h3 className="name">{name}</h3>
        <p className="role">{role}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
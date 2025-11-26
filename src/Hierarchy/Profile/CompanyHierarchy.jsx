// src/Hierarchy/CompanyHierarchy.jsx

import OrganizationTree from './OrganizationTree';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import '../../.././styles/OrganizationTree.css'

import React, { useEffect,useState } from 'react';

export default function CompanyHierarchy({sessionRef}) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    // ✅ NEW: वर्तमान उपयोगकर्ता ID निकालें
    // Note: 'user.id' assumption requires correct sessionRef structure
    const currentUserId = sessionRef?.current?.user?.id; 

    useEffect(() => {
        // Fetch organization data from the backend API
        const fetchOrganizationData = async () => {
          try {
            const token = sessionRef?.current?.token || null; 
            if (!token) {
              console.error('Token not found.');
              navigate('/login');  // Redirect to login if no token exists
              return;
            }    
            // Fetch organization data
            const response = await api.get('/users/organization', {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the header
              },
            });
            setData(response.data); // Set organization data
          } catch (error) {
            console.error('Error fetching organization data:', error);
          }
        };
    
        fetchOrganizationData();
      }, [navigate, sessionRef]); // dependency array updated
      
  return (
    <div className="hierarchyRoot">
      <h2>Organization Chart</h2>
      {!data || data.length === 0 ? <p>Loading...</p> :  
        // ✅ PASS: currentUserId प्रॉप पास करें
        <OrganizationTree data={data[0]} currentUserId={currentUserId} />
      }
    </div>
  )
}
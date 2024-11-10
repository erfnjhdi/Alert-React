// Sidebar.js
import React from 'react';

const Sidebar = ({ incident }) => {
  if (!incident.type || incident.type === 'Please select a marker to view information') {
    return (
      <div className='sidebar'>
        <h3>{incident.type}</h3>
      </div>
    );
  }
  return (
    <div className='sidebar'>
      <h3>Incident Details</h3>
      <p><strong>Type:</strong> {incident.type}</p>
      <p><strong>Location:</strong> {incident.location}</p>
      <p><strong>Description:</strong> {incident.description}</p>
      <p><strong>Severity:</strong> {incident.severity}</p>
    </div>
  );
};

export default Sidebar;

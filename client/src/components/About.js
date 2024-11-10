import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Alert</h1>
      <p className="about-description">
        Alert is a real-time incident reporting platform that empowers users to report disturbances and stay informed about critical events in their community. Whether it's theft, assaults, protests, or natural disasters like flooding, Alert provides an interactive, collaborative space for monitoring safety and security.
      </p>
      
      <div className="features-section">
        <h2 className="features-title">Key Features</h2>
        <ul className="features-list">
          <li>Real-time reporting and monitoring of incidents</li>
          <li>Interactive map with advanced markers for easy navigation</li>
          <li>Incident details, including type, location, description, and severity</li>
          <li>Community-driven platform to enhance public safety</li>
          <li>Collaborative space for sharing information and raising awareness</li>
        </ul>
      </div>

      <div className="impact-section">
        <h2 className="impact-title">Our Impact</h2>
        <p>Alert helps individuals and communities stay informed, make better decisions, and respond to emergencies more effectively. By promoting transparency and collaboration, we aim to foster safer, more connected neighborhoods.</p>
      </div>
    </div>
  );
};

export default About;

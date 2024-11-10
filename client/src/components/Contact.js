import React from 'react';
import { FaLinkedin} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Me</h1>
      <p>I'd love to hear from you! Here are some ways to reach out:</p>
      <ul>
        <li>Phone: 438.928.7493</li>
        <li>Email: <a href="mailto:erfanjahedi81@gmail.com" target='_blank' rel="noopener noreferrer">erfanjahedi81@gmail.com</a></li>
        <li>LinkedIn: <a href="https://www.linkedin.com/in/erfan-jahedi-b46568295/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a></li>
      </ul>
    </div>
  );
};

export default Contact;

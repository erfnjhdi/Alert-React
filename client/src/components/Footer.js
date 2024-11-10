import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; 

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-social'>
          <a href='https://github.com/erfnjhdi' target='_blank' rel='noopener noreferrer'>
            <FaGithub />
          </a>
          <a href='https://www.linkedin.com/in/erfan-jahedi-b46568295/' target='_blank' rel='noopener noreferrer'>
            <FaLinkedin />
          </a>
        </div>
        <div className='footer-nav'>
          <ul>
            <li><a href='/about'>About</a></li>
            <li><a href='/contact'>Contact</a></li>
            <li><a href='/privacy'>Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2024 Alert. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;

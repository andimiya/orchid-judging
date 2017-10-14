import React from 'react';
const instagramSVG = require('../assets/instagram.svg');
const githubSVG = require('../assets/github.svg');
const linkedinSVG = require('../assets/linkedin.svg');
const gmailSVG = require('../assets/gmail.svg');

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-container-inner">
        <div className="footer-item">
          <a href="https://www.linkedin.com/in/andreatakamiya/">
            <img src={linkedinSVG} alt="Instagram" />
          </a>
        </div>
        <div className="footer-item">
          <a href="https://github.com/andimiya">
            <img src={githubSVG} alt="Github" />
          </a>
        </div>
        <div className="footer-item">
          <a href="https://www.instagram.com/andi_miya/">
            <img src={instagramSVG} alt="Instagram" />
          </a>
        </div>
        <div className="footer-item">
          <a href="mailto:takamiya.andrea@gmail.com">
            <img src={gmailSVG} alt="Email" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

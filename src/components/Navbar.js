import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faAward, faBrain } from '@fortawesome/free-solid-svg-icons';
import '../index.css'; 

function TopNavbar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []); 
  return (
    <div className="topnav">
      <h1 className='top'>BE<br/>GRATEFUL<br/>{time.toLocaleTimeString()}</h1>
      <ul>
        <li>
          <a href="#home" className={activeSection === 'home' ? 'active' : ''}>
            <FontAwesomeIcon icon={faHome} className="icon" /><br />
            <span className="icon-text">Home</span>
          </a>
        </li>
        <li>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>
            <FontAwesomeIcon icon={faInfoCircle} className="icon" /><br />
            <span className="icon-text">About</span>
          </a>
        </li>
        <li>
          <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>
            <FontAwesomeIcon icon={faBrain} className="icon" /><br />
            <span className="icon-text">Skills</span>
          </a>
        </li>
        <li>
          <a href="#certification" className={activeSection === 'certification' ? 'active' : ''}>
            <FontAwesomeIcon icon={faAward} className="icon" /><br />
            <span className="certi">Certification</span>
          </a>
        </li>
        <li>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>
            <FontAwesomeIcon icon={faEnvelope} className="icon" /><br />
            <span className="icon-text">Contact</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default TopNavbar;

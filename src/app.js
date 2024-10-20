import React, { useState } from 'react';
import TopNavbar from './components/Navbar.js';
import { FaMagic, FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin, FaUser, FaMapMarkerAlt, FaSmile, FaInstagram} from 'react-icons/fa';
function App() {

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = '+918973513797';

    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Hello, my name is ${encodeURIComponent(
      name
    )}. ${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="App">
      <TopNavbar />
      <div className="content">
        <section id="home">
          <h2 className='hello'><hr />MERN STACK DEVELOPER<br /><br />SRI DHARINI</h2><hr /><br /><br />
          <div className="content"><h1 className='intro'>Hii, I Am Sri Dharini</h1><br /><p className='paragraph'><FaMagic />  MERN Stack Developer with hands-on experience in building scalable web applications and APIs. Proficient in Node.js, Express.js, MongoDB, and React.js with a strong foundation in backend development, including RESTful API design and database management. Completed a certification in Node.js and Postman, and successfully developed a doctor-user appointment management system using Node.js for the backend and MongoDB as the database. Seeking to leverage technical skills in a dynamic team to build innovative solutions.</p></div>
        </section>

        <section id="about">
          <h2 className='about'>ABOUT</h2><hr /><br />
          <h1 id='edu'>Education</h1>
          <h3 className='detail'><li>Bachelour Of Information Technology(81%)<br /><br /></li><li>Sourashtra Girls Higher Secondary School<br />              (SSLC 74.4%,HSLC 75%)</li></h3>
          <h1 id='edu'>Contact</h1>
          <h3 className='contact'>    S.Sri Dharini<br /><br /><FaPhoneAlt />   8973513797<br /><br /><FaEnvelope />  <a href='sridharini2103@gmail.com'>sridharini2103@gmail.com</a><br /><br /><FaGithub />   <a href='https://github.com/dharini21/sri21.git'>https://github.com/dharini21/sri21.git</a><br /><br /><FaLinkedin />   <a href='https://www.linkedin.com/in/sri-dharini-301154293/'>https://www.linkedin.com/in/sri-dharini-301154293/</a><br /><br /><FaUser />   <a href='https://drive.google.com/file/d/1ALFOTo3X72rabd1lxIgTpNsn68ldnAgl/view'>Profile</a><br /><br /><FaMapMarkerAlt />  Madurai
          </h3>
        </section>

        <section id="skills">
          <h2 className='certification'>SKILLS</h2><hr /><br />
          <div className='div'>
            <h1 className='only'>Technical Skills</h1>
            <ul className='skill'>
              <li>HTML</li>
              <li>CSS</li>
              <li>JAVASCRIPT<br /><p className='line'><li>REACT(FrontEnd)</li><li>NODE(BackEnd)</li></p></li>
              <li>REST API</li>
              <li>EXPRESS</li>
              <li>PYTHON(Basic)</li>
            </ul>
            <h1 className='only'>Technical Tools</h1>
            <ul className='skill'><li>POSTMAN</li><li>VS CODE</li><li>GITHUB</li></ul>
            <h1 className='only'>DATABASE</h1>
            <ul className='skill'><li>MONGO DB</li><li>SQL</li></ul>
          </div>
        </section>

        <section id="certification">
          <h2 className='certification'>CERTIFICATION</h2><hr /><br />
          <div className='upload'>
            <li>Node js </li>
            <li>Python</li>
            <li>Postman API Fundamentals Student Expert</li>
            <li>SQL & Node js and GitHub
              Bootcamp </li>
            <li>Type Writing English(Junior)</li>
          </div><br /><br />
          <a id='link' href='https://drive.google.com/drive/u/0/folders/1F1UWi0W3_toEXcoulSflAAIp43HopzWR'>certification link: https://drive.google.com/drive/u/0/folders/1F1UWi0W3_toEXcoulSflAAIp43HopzWR</a><br /><br /><hr />
          <h1 className='certification'>Projects</h1><hr /><br />
          <h1 className='only'>Doctor User Appointment Management System</h1>
          <p id='para'>Built a Doctor-User Appointment System using Node.js, Express.js, and MongoDB, with JWT for authentication and role-based access control (RBAC).
            Developed and tested RESTful APIs in Postman for appointment scheduling, cancellation, and user management.
            Integrated real-time availability tracking for doctors and ensured secure role-specific functionality.<br /><br />
            <FaGithub />   <a href='https://github.com/dharini21/sri21.git'>https://github.com/dharini21/sri21.git</a></p>
        </section>

        <section id="contact">
          <h2 className='certification'>CONTACT</h2><hr /><br />
          <div className="connect-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div>
                <p className='connect'>CONNECT WITH ME...<FaSmile /></p>
                <label htmlFor="name">Your Name:</label> <br /><br />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <br />
                <br />
              </div>
              <div>
                <label htmlFor="message">Your Message:</label> <br /><br />
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  cols={50}
                ></textarea>
              </div>
              <br />
              <br />
              <button type="submit" className="submit-button">
                Send via WhatsApp
              </button>
            </form>
          </div>

          <div class="footer">
            <ul>
            <li><a href='https://www.instagram.com/sri_dharini21' className='insta'><FaInstagram size={40}/></a></li> 
            <li><a href='https://www.linkedin.com/in/sri-dharini-301154293/' className='linked'><FaLinkedin size={40}/></a></li>
            <li><a href='https://github.com/dharini21/sri21.git'><FaGithub size={40}/></a></li>
            <li><a href='sridharini2103@gmail.com'><FaEnvelope size={40}/></a></li>
            </ul>  
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

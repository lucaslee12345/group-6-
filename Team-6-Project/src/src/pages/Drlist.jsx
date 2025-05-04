import { useState } from 'react';

import '../css/Drlist.css';
import profilepicture from '../img/9706583.png';

function Drlist({ setPage }) {

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  
  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };
    const DoctorBox = ({ name, specialty }) => (

      
        <div
          style={{
            display: 'flex',
            alignItems: 'center', // Vertically center all content
            justifyContent: 'flex-start', // Align content to the left
            backgroundColor: 'rgb(127, 154, 228)', // Match the background color
            width: '100%',
            height: '90px',
            padding: '10px 20px',
            boxSizing: 'border-box',
            marginTop: '15px',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for depth
            transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover effect
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, content: 'center' }}>
            <img
              src={profilepicture}
              width="60px"
              height="60px"
              style={{
                
                borderRadius: '50%', // Circular profile picture
                 // Add border for contrast
              }}
              alt="Profile"
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center text vertically
                flex: 1,
                textAlign: 'left',
              }}
            >
              <p style={{  marginLeft:"7em",marginBottom:'0', fontSize: '18px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}> 
                {name}
              </p>
              <p style={{  marginLeft:"8.5em",fontSize: '14px', color: '#555' }}>{specialty}</p>
            </div>
          </div>
          <button
            onClick={() => setPage('chatbox')}
            style={{
              fontSize: '16px',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50', // Green button
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, background-color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Start New Chat 📧
          </button>
        </div>
      );

  return (
    <>
    
      <div id='container33'>
            <img
        src={profilepicture}
        className="profile-icon"
        alt="Profile"
      />
      <h1 style={{ fontSize: 'large', textAlign: 'center', marginTop:'1.5em' }}>Dr.Finder</h1> 
      
    
      <div style={{ marginTop: '1em', padding: '20px' }}>
      {/* Reusable DoctorBox components */}
      <DoctorBox name="Dr.Ren (MD)" specialty="Pediatrist"/>
      <DoctorBox name="Dr.Smith (MD)" specialty="Anaesthesiologist"/>
      <DoctorBox name="Dr.Joey (MD)" specialty="Oncologist"/>
      <DoctorBox name="Dr.Sally (MD)" specialty="Gastroenterologist"/>
      <DoctorBox name="Dr.Fickle (MD)" specialty="Neurologist"/>
      <DoctorBox name="Dr.Zilly (MD)" specialty="Cardiologist"/>
      <DoctorBox name="Dr.Wok (MD)" specialty="Geriatrician"/>
      <DoctorBox name="Dr.Wong (MD)" specialty="Oncologist"/>
      <DoctorBox name="Dr.Ronaldo (MD)" specialty="Physicist"/>
      <DoctorBox name="Dr.Hare (MD)" specialty="Computerist"/>
      <DoctorBox name="Dr.Keenan (MD)" specialty="Mathist"/>
    </div>
      
    </div>

    <div id='newnavbar'>
            <button onClick={togglePanel}>☰</button>
              <div className={`sliding-panel ${isPanelVisible ? 'visible' : ''}`}>
                <button className="close-panel" onClick={togglePanel}>
                  ✖
                </button>
                <ul>
                <li onClick={() => setPage('profile')}>Home</li>
                  <li onClick={() => setPage('dmlist')}>DmList</li>
                  <li onClick={() => setPage('drlist')}>DrList</li>
                  <li onClick={() => setPage('chatbox')}>Chat</li>
                  <li onClick={() => setPage('settings')}>Settings</li>
                </ul>
              </div>
          </div>
    </>
  );
}

export default Drlist;
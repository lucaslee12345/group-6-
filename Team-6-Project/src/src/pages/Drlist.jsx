import { useState, useEffect } from 'react';

import '../css/Drlist.css';
import profilepicture from '../img/9706583.png';

function Drlist({ setPage }) {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          'https://npiregistry.cms.hhs.gov/api/?version=2.1&state=CA&limit=10'
        );
        const data = await response.json();
        const fetchedDoctors = data.results.map((doctor) => ({
          name: doctor.basic.name,
          specialty: doctor.taxonomies[0]?.desc || 'Specialty not available',
        }));
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const DoctorBox = ({ name, specialty }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(127, 154, 228)',
        width: '100%',
        height: '90px',
        padding: '10px 20px',
        boxSizing: 'border-box',
        marginTop: '15px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
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
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <img
          src={profilepicture}
          width="60px"
          height="60px"
          style={{
            borderRadius: '50%',
          }}
          alt="Profile"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'left',
            marginLeft: '1em',
          }}
        >
          <p
            style={{
              marginBottom: '0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            {name}
          </p>
          <p style={{ fontSize: '14px', color: '#555' }}>{specialty}</p>
        </div>
      </div>
      <button
        onClick={() => setPage('chatwithdoctor')}
        style={{
          fontSize: '16px',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
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
      <div id="container33">
        <img src={profilepicture} className="profile-icon" alt="Profile" />
        <h1 style={{ fontSize: 'large', textAlign: 'center', marginTop: '1.5em' }}>
          Dr.Finder
        </h1>

        <div style={{ marginTop: '1em', padding: '20px' }}>
          {/* Render DoctorBox components dynamically */}
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <DoctorBox key={index} name={doctor.name} specialty={doctor.specialty} />
            ))
          ) : (
            <p>Loading doctors...</p>
          )}
        </div>
      </div>

      <div id="newnavbar">
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

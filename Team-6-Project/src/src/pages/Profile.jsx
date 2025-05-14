import { useState } from 'react';
import '../css/Profile.css';
import profilepicture from '../img/9706583.png'; // Adjust the path as necessary

function Profile({ setPage, user }) {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  // 🔑 Safely pull name or email from the user object
  const username = user?.displayName || user?.email || 'User';

  return (
    <>
      {/* Profile Picture in the Top-Right Corner */}
      <img
        src={profilepicture}
        className="profile-icon"
        alt="Profile"
      />

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

      <br /><br /><br /><br /><br />

      {/* Rest of the Profile Page */}
      <div style={{ marginTop: '-4em' }}>
        <h2>Dr.Finder</h2>
      </div>

      <div>
        <h1 style={{ fontSize: "40px" }}>
          Welcome, <br /> {username}
        </h1>
      </div>

      <div>
        <img
          src={profilepicture}
          width="200px"
          height="200px"
          style={{ borderRadius: '50%' }}
          alt="Profile"
        />
      </div>

      <div id='profile-buttons'>
        <button
          onClick={() => setPage('dmlist')}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2881C6')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
        >
          Messages
        </button>
        <br /><br />
        <button
          onClick={() => setPage('drlist')}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2881C6')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
        >
          Doctor List
        </button>
        <br /><br />
        <button
          onClick={() => setPage('chatbox')}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2881C6')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
        >
          AI Chat
        </button>
        <br /><br />
        <button
          onClick={() => setPage('settings')}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2881C6')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
        >
          Settings
        </button>
      </div>
    </>
  );
}

const buttonStyle = {
  fontSize: '20px',
  padding: '15px 80px',
  borderRadius: '12px',
  cursor: 'pointer',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, background-color 0.2s',
};

export default Profile;

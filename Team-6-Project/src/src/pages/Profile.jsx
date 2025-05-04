import { useState } from 'react';
import '../css/Profile.css';
import profilepicture from '../img/9706583.png'; // Adjust the path as necessary

function Profile({ setPage}) {

  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };








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








          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>









    
          {/* Rest of the Profile Page */}
          <div>
            <h2>Dr.Finder</h2>
          </div>  

          <div>
            <h1 style={{fontSize:'50px'}}>Welcome, <br></br> Name</h1>
          </div>

          <div> 

            <img src={profilepicture} width="200px" height="200px" style={{borderRadius:'50%'}} alt="Profile" />
          </div>
          <br></br>
          <br></br>
    
          <div id='profile-buttons'>
            <button
              onClick={() => setPage('dmlist')}
              style={{
                fontSize: '30px',
                padding: '30px 100px',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: '#2196F3', // Blue background
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                transition: 'transform 0.2s, background-color 0.2s', // Smooth hover effect
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2881C6')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
            >
              DmList
            </button>
            <br />
            <br />
            <button
              onClick={() => setPage('drlist')}
              style={{
                fontSize: '30px',
                padding: '30px 100px',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: '#2196F3', // Blue background
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                transition: 'transform 0.2s, background-color 0.2s', // Smooth hover effect
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2881C6')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
            >
              DrList
            </button>
            <br>
            </br>
            <br></br>
            <button
              onClick={() => setPage('chatbox')}
              style={{
                fontSize: '30px',
                padding: '30px 100px',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: '#2196F3', // Blue background
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                transition: 'transform 0.2s, background-color 0.2s', // Smooth hover effect
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2881C6')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
            >
              Chat
            </button>
            <br />
            <br />
            <button
              onClick={() => setPage('settings')}
              style={{
                fontSize: '30px',
                padding: '30px 100px',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: '#2196F3', // Blue background
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                transition: 'transform 0.2s, background-color 0.2s', // Smooth hover effect
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2881C6')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
            >
              Settings
            </button>
          </div>
    
          {/* Navbar */}
          
        </>
      );
}

export default Profile;
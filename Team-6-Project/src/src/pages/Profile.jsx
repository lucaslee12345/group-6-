import { useState } from 'react';
import '../css/Profile.css';
import profilepicture from '../img/9706583.png'; // Adjust the path as necessary

function Profile({ setPage}) {
    return (
        <>
          {/* Profile Picture in the Top-Right Corner */}
          <img
            src={profilepicture}
            width="60px"
            height="60px"
            style={{
              float: 'right',
              borderRadius: '50%', // Make it circular
              border: '2px solid white', // Add a white border for contrast
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
              margin: '10px', // Add spacing around the image
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
            alt="Profile"
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
    
          {/* Rest of the Profile Page */}
          <div>
            <h3>Dr.Finder</h3>
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
          <div
          
          
          
          >
            <nav style={{  }}>
              <ul
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  listStyle: 'none',
                  padding: 0,
                  margin: '30px 0', // Add spacing at the bottom
                 
                  
                }}
              >
                <li style={{ margin: '0 15px' }}>
                  <button
                    onClick={() => setPage('home')}
                    style={{
                      fontSize: '18px',
                      padding: '15px 30px',
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
                    &#8592; Back
                  </button>
                </li>
                <li style={{ margin: '0 15px' }}>
                  <button
                    onClick={() => setPage('profile')}
                    style={{
                      fontSize: '18px',
                      padding: '15px 30px',
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
                    &#8962; Home
                  </button>
                </li>
                <li style={{ margin: '0 15px' }}>
                  <button
                    onClick={() => setPage('settings')}
                    style={{
                      fontSize: '18px',
                      padding: '15px 30px',
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
                    &#9788; Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      );
}

export default Profile;
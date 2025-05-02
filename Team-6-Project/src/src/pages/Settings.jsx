import { useState } from 'react';
import '../css/Settings.css';
import profilepicture from '../img/9706583.png';
function Settings({ setPage }) {
    return (
        <>
            <div className="top-bar">
                <h1>Dr.Finder</h1>
            </div>
            <br />
            <div className="home">
                <h1>Settings</h1>
            
            <img src={profilepicture} width="200px" height="200px" style={{borderRadius:'50%'}} alt="Profile" />
          
            </div>

            <div className="body-buttons">
                <button className="button" onClick={() => setPage('changeUser')}>Change User</button>
                <br />
                <button className="button" onClick={() => setPage('changePassword')}>Change Password</button>
                <br />
                <button className="button" onClick={() => setPage('changeEmail')}>Change Email</button>
                <br />
                <button className="button" onClick={() => setPage('logout')}>Log Out</button>
                <br />
                <button className="button" onClick={() => setPage('deleteAccount')}>Delete Account</button>
                <br />
            </div>

            <div>
            <nav>
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

export default Settings;
import React, { useState } from "react";
import "../css/Settings.css";
import profilepicture from "../img/9706583.png"; // Adjust the path as necessary

const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

const validateEmailMatch = (email, confirmEmail) => {
  return email === confirmEmail;
};

const confirmAction = (message) => {
  return window.confirm(message);
};

const Settings = ({ setPage }) => {
  const [popup, setPopup] = useState(null);
  const [formData, setFormData] = useState({
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
    currentEmail: "",
    newEmail: "",
    confirmNewEmail: "",
    deletePass: "",
  });

  const openPopup = (id) => setPopup(id);
  const closePopup = () => {
    setPopup(null);
    setFormData({
      currentPass: "",
      newPass: "",
      confirmNewPass: "",
      currentEmail: "",
      newEmail: "",
      confirmNewEmail: "",
      deletePass: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const submitChangePassword = () => {
    const { newPass, confirmNewPass } = formData;

    if (!validatePasswordMatch(newPass, confirmNewPass)) {
      alert("New passwords do not match!");
      return;
    }

    alert("Password changed successfully!");
    closePopup();
  };

  const submitChangeEmail = () => {
    const { newEmail, confirmNewEmail } = formData;

    if (!validateEmailMatch(newEmail, confirmNewEmail)) {
      alert("Emails do not match!");
      return;
    }

    alert("Email changed successfully!");
    closePopup();
  };

  const submitDeleteAccount = () => {
    const { deletePass } = formData;

    if (!deletePass) {
      alert("Please enter your password to confirm.");
      return;
    }

    if (confirmAction("This action is irreversible. Are you sure?")) {
      alert("Account deleted.");
      closePopup();
    }
  };

  return (
    <div className="settings-page">
      <img src={profilepicture} className="profile-icon" alt="Profile" />
      <header>
        <h1>Dr. Finder</h1>
        <h2>Settings</h2>
      </header>
      <img
        src={profilepicture}
        style={{ width: "10%", height: "10%", marginTop: "-27em" }}
        alt="Profile"
      />
      <div className="settings-buttons" style={{ marginTop: "-25em" }}>
        <button
          onClick={() => setPage("changeUser")}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c9c7c7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ddd")}
        >
          Change User
        </button>
        <button
          onClick={() => openPopup("password")}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c9c7c7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ddd")}
        >
          Change Password
        </button>
        <button
          onClick={() => openPopup("email")}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c9c7c7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ddd")}
        >
          Change Email
        </button>
        <button
          onClick={() => setPage("logout")}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c9c7c7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ddd")}
        >
          Log Out
        </button>
        <button
          className="delete"
          onClick={() => openPopup("delete")}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c9c7c7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ddd")}
        >
          Delete Account
        </button>
      </div>

      <div
        style={{
          marginTop: "-15em",
          justifyContent: "center",
          display: "flex",
          
        }}
      >
        <nav>
              <ul
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  listStyle: 'none',
                  padding: 0,
                  margin: '30px 0', // Add spacing at the bottom
                  backgroundColor: '#f9f9f9',
                  
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

      {/* Popup Modals */}
      {popup === "password" && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              id="currentPass"
              value={formData.currentPass}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="New Password"
              id="newPass"
              value={formData.newPass}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              id="confirmNewPass"
              value={formData.confirmNewPass}
              onChange={handleInputChange}
            />
            <button onClick={submitChangePassword}>Submit</button>
          </div>
        </div>
      )}

      {popup === "email" && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>Change Email</h2>
            <input
              type="email"
              placeholder="Current Email"
              id="currentEmail"
              value={formData.currentEmail}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="New Email"
              id="newEmail"
              value={formData.newEmail}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Confirm New Email"
              id="confirmNewEmail"
              value={formData.confirmNewEmail}
              onChange={handleInputChange}
            />
            <button onClick={submitChangeEmail}>Submit</button>
          </div>
        </div>
      )}

      {popup === "delete" && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>Do you really want to delete your account?</h2>
            <input
              type="password"
              placeholder="Type password to confirm"
              id="deletePass"
              value={formData.deletePass}
              onChange={handleInputChange}
            />
            <button className="delete-btn" onClick={submitDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
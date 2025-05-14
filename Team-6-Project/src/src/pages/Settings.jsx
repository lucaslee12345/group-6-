import React, { useState } from "react";
import "../css/Settings.css";
import profilepicture from "../img/9706583.png"; // Adjust the path as necessary
import '../css/Drlist.css';
// logging out
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Successfully logged out!");
      setPage("home");  // or whatever page you want to show after logout
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to log out. Please try again.");
    }
  };  

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


  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };
  return (
    <div className="settings-page">

      <img
          src={profilepicture}
          className="profile-icon"
          alt="Profile"
                      />
        <div id='newnavbar'>
            <button onClick={togglePanel} style={{}}>☰</button>
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


      <header>
        <h1 style={{marginTop:'0em'}}>Dr.Finder</h1>
        <h1 style={{fontSize:'50px'}}>Settings</h1>
      </header>
      <img
        src={profilepicture}
        style={{ width: "200px", height: "2",  borderRadius: "50%", position: "absolute", marginTop: "8em" }}
        alt="Profile"
      />
      <div className="settings-buttons" style={{position:'absolute', marginTop:'23em', }}>       
        <button
          onClick={() => openPopup("password")}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = "#c9c7c7";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = "#ddd";
          }}
        >
          Change Password
        </button>
        <button
          onClick={() => openPopup("email")}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = "#c9c7c7";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = "#ddd";
          }}
        >
          Change Email
        </button>
        <button
          onClick={handleLogout}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = "#c9c7c7";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = "#ddd";
          }}
        >
          Log Out
        </button>

        <button
          className="delete"
          onClick={() => openPopup("delete")}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = "#c9c7c7";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = "#ddd";
          }}
        >
          Delete Account
        </button>
      </div>

      <div>
        <h1>(WIP)</h1>
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
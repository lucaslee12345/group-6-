import React, { useState, useEffect } from "react";
import "../css/Settings.css";
import profilepicture from "../img/9706583.png";
import {
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  auth,
  db
} from "../firebase";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc
} from "firebase/firestore";


const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
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
    currentUsername: "",
    newUsername: "",
    confirmNewUsername: "",
    deletePass: "",
  });
  const [error, setError] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    const fetchCurrentUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'Accounts', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUsername(userData.username || user.displayName || '');
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };
    fetchCurrentUsername();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Successfully logged out!");
      setPage("home");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const openPopup = (id) => {
    setPopup(id);
    setError("");
  };

  const closePopup = () => {
    setPopup(null);
    setError("");
    setFormData({
      currentPass: "",
      newPass: "",
      confirmNewPass: "",
      currentUsername: "",
      newUsername: "",
      confirmNewUsername: "",
      deletePass: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const submitChangePassword = async () => {
    const { currentPass, newPass, confirmNewPass } = formData;
    setError("");

    if (!validatePasswordMatch(newPass, confirmNewPass)) {
      setError("New passwords do not match!");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("No user is currently signed in.");
        return;
      }

      if (user.providerData[0].providerId === 'google.com') {
        setError("Password change is not available for Google sign-in accounts.");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, currentPass);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPass);
      alert("Password changed successfully!");
      closePopup();
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setError("Current password is incorrect.");
      } else {
        setError(error.message);
      }
    }
  };

  const submitChangeUsername = async () => {
    const { currentUsername: inputCurrentUsername, newUsername, confirmNewUsername } = formData;
    setError("");

    if (!validatePasswordMatch(newUsername, confirmNewUsername)) {
      setError("New usernames do not match!");
      return;
    }

    try {
      if (inputCurrentUsername !== currentUsername) {
        setError("Current username is incorrect.");
        return;
      }

      const usersRef = collection(db, 'Accounts');
      const q = query(usersRef, where('username', '==', newUsername));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("Username already exists.");
        return;
      }

      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'Accounts', user.uid), {
          username: newUsername
        });
        setCurrentUsername(newUsername);
        alert("Username changed successfully!");
        closePopup();
      }
    } catch (error) {
      console.error("Error changing username:", error);
      setError(error.message);
    }
  };

  const deleteUserAndData = async (user) => {
    try {
      // Delete all messaging data
      const messagingRef = collection(db, 'Messaging', user.uid);
      const messagingSnapshot = await getDocs(messagingRef);
      
      // Delete all doctors and their chats
      for (const doctorDoc of messagingSnapshot.docs) {
        const doctorName = doctorDoc.id;
        const doctorRef = doc(db, 'Messaging', user.uid, doctorName);
        
        // Get all subcollections (Messages and quickInfo)
        const messagesRef = collection(doctorRef, 'Messages');
        const messagesSnapshot = await getDocs(messagesRef);
        
        // Delete all messages
        for (const messageDoc of messagesSnapshot.docs) {
          await deleteDoc(doc(messagesRef, messageDoc.id));
        }
        
        // Delete quickInfo document if it exists
        const quickInfoRef = doc(doctorRef, 'quickInfo');
        await deleteDoc(quickInfoRef).catch(() => {}); // Ignore if doesn't exist
        
        // Delete chat document if it exists
        const chatRef = doc(doctorRef, 'chat');
        await deleteDoc(chatRef).catch(() => {}); // Ignore if doesn't exist
        
        // Delete the doctor document
        await deleteDoc(doctorRef);
      }

      // Delete the user's messaging root document
      await deleteDoc(doc(db, 'Messaging', user.uid));

      // Delete the user's account document
      await deleteDoc(doc(db, 'Accounts', user.uid));

      // Delete the user from Firebase Auth
      await user.delete();
    } catch (err) {
      console.error("Error deleting user data:", err);
      throw new Error("Failed to delete user data.");
    }
  };

  const submitDeleteAccount = async () => {
    const { deletePass } = formData;
    setError("");
  
    if (!deletePass) {
      setError("Please enter your password to confirm.");
      return;
    }
  
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("No user is currently signed in.");
        return;
      }
  
      const confirm = confirmAction("This action is irreversible. Are you sure?");
      if (!confirm) return;
  
      // If user signed in with Google, no password is needed
      if (user.providerData[0].providerId === 'google.com') {
        await deleteUserAndData(user);
        alert("Account deleted successfully.");
        setPage("home");
        return;
      }
  
      // Reauthenticate email/password user
      const credential = EmailAuthProvider.credential(user.email, deletePass);
      await reauthenticateWithCredential(user, credential);
  
      // Delete all user data
      await deleteUserAndData(user);
  
      alert("Account deleted successfully.");
      setPage("home");
  
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setError("Password is incorrect.");
      } else if (error.code === 'auth/requires-recent-login') {
        setError("Please log in again and try deleting your account.");
      } else {
        console.error("Error deleting account:", error);
        setError(error.message);
      }
    }
  };  

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  return (
    <div className="settings-page">
      <img src={profilepicture} className="profile-icon" alt="Profile" />
      <div id='newnavbar'>
        <button onClick={togglePanel}>☰</button>
        <div className={`sliding-panel ${isPanelVisible ? 'visible' : ''}`}>
          <button className="close-panel" onClick={togglePanel}>✖</button>
          <ul>
            <li onClick={() => setPage('profile')}>Home</li>
            <li onClick={() => setPage('dmlist')}>Messages</li>
            <li onClick={() => setPage('drlist')}>Find Doctor</li>
            <li onClick={() => setPage('chatbox')}>AI Chat</li>
            <li onClick={() => setPage('settings')}>Settings</li>
          </ul>
        </div>
      </div>

      <header>
        <h1 style={{ marginTop: '0em' }}>Dr.Finder</h1>
        <h1 style={{ fontSize: '50px' }}>Settings</h1>
      </header>

      <img
        src={profilepicture}
        style={{ width: "200px", height: "2", borderRadius: "50%", position: "absolute", marginTop: "8em" }}
        alt="Profile"
      />

      <div className="settings-buttons" style={{ position: 'absolute', marginTop: '23em' }}>
        <button onClick={() => openPopup("password")}>Change Password</button>
        <button onClick={() => openPopup("username")}>Change Username</button>
        <button onClick={handleLogout}>Log Out</button>
        {/* <button className="delete" onClick={() => openPopup("delete")}>Delete Account</button> */}
      </div>

      {/* Popup Modals */}
      {popup === "password" && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={closePopup}>&times;</span>
            <h2>Change Password</h2>
            {error && <p className="error">{error}</p>}
            <input type="password" placeholder="Current Password" id="currentPass" value={formData.currentPass} onChange={handleInputChange} />
            <input type="password" placeholder="New Password" id="newPass" value={formData.newPass} onChange={handleInputChange} />
            <input type="password" placeholder="Confirm New Password" id="confirmNewPass" value={formData.confirmNewPass} onChange={handleInputChange} />
            <button onClick={submitChangePassword}>Submit</button>
          </div>
        </div>
      )}

      {popup === "username" && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={closePopup}>&times;</span>
            <h2>Change Username</h2>
            {error && <p className="error">{error}</p>}
            <input type="text" placeholder="Current Username" id="currentUsername" value={formData.currentUsername} onChange={handleInputChange} />
            <input type="text" placeholder="New Username" id="newUsername" value={formData.newUsername} onChange={handleInputChange} />
            <input type="text" placeholder="Confirm New Username" id="confirmNewUsername" value={formData.confirmNewUsername} onChange={handleInputChange} />
            <button onClick={submitChangeUsername}>Submit</button>
          </div>
        </div>
      )}

      {/* {popup === "delete" && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={closePopup}>&times;</span>
            <h2>Do you really want to delete your account?</h2>
            {error && <p className="error">{error}</p>}
            <input type="password" placeholder="Type password to confirm" id="deletePass" value={formData.deletePass} onChange={handleInputChange} />
            <button className="delete-btn" onClick={submitDeleteAccount}>Delete Account</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Settings;
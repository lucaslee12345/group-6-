import React, { useState } from "react";
import "../css/Settings.css";
import profilepicture from "../img/9706583.png"; // Adjust the path as necessary
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";


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


     // Check if user is signed in with Google
     if (user.providerData[0].providerId === 'google.com') {
       setError("Password change is not available for Google sign-in accounts.");
       return;
     }


     // Reauthenticate user before changing password
     const credential = EmailAuthProvider.credential(user.email, currentPass);
     await reauthenticateWithCredential(user, credential);
    
     // Update password
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
   const { currentUsername, newUsername, confirmNewUsername } = formData;
   setError("");
    if (!validatePasswordMatch(newUsername, confirmNewUsername)) {
     setError("New usernames do not match!");
     return;
   }
    try {
     const user = auth.currentUser;
     if (!user) {
       setError("No user is currently signed in.");
       return;
     }
      // Get current user data from the correct collection
     const userDocRef = doc(db, 'Accounts', user.uid);
     const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
       setError("User data not found.");
       return;
     }
      const userData = userDoc.data();
      // Check if current username matches
     if (userData.username !== currentUsername) {
       setError("Current username is incorrect.");
       return;
     }
      // Check if new username already exists
     const usersRef = collection(db, 'Accounts');
     const q = query(usersRef, where('username', '==', newUsername));
     const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
       setError("Username already exists.");
       return;
     }
      // Update username in Firestore
     await updateDoc(userDocRef, {
       username: newUsername,
     });
      alert("Username changed successfully!");
     closePopup();
   } catch (error) {
     console.error("Error changing username:", error);
     setError(error.message);
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


     // Check if user is signed in with Google
     if (user.providerData[0].providerId === 'google.com') {
       if (confirmAction("This action is irreversible. Are you sure?")) {
         await user.delete();
         alert("Account deleted successfully.");
         setPage("home");
       }
       return;
     }


     // Reauthenticate user before deleting account
     const credential = EmailAuthProvider.credential(user.email, deletePass);
     await reauthenticateWithCredential(user, credential);


     if (confirmAction("This action is irreversible. Are you sure?")) {
       await user.delete();
       alert("Account deleted successfully.");
       setPage("home");
     }
   } catch (error) {
     if (error.code === 'auth/wrong-password') {
       setError("Password is incorrect.");
     } else {
       setError(error.message);
     }
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
       <h1 style={{marginTop:'0em'}}>Dr.Finder</h1>
       <h1 style={{fontSize:'50px'}}>Settings</h1>
     </header>
     <img
       src={profilepicture}
       style={{ width: "200px", height: "2", borderRadius: "50%", position: "absolute", marginTop: "8em" }}
       alt="Profile"
     />
     <div className="settings-buttons" style={{position:'absolute', marginTop:'23em'}}>      
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
         onClick={() => openPopup("username")}
         onMouseOver={(e) => {
           e.currentTarget.style.transform = 'scale(1.05)';
           e.currentTarget.style.backgroundColor = "#c9c7c7";
         }}
         onMouseOut={(e) => {
           e.currentTarget.style.transform = 'scale(1)';
           e.currentTarget.style.backgroundColor = "#ddd";
         }}
       >
         Change Username
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


     {/* Popup Modals */}
     {popup === "password" && (
       <div className="popup-overlay">
         <div className="popup">
           <span className="close" onClick={closePopup}>&times;</span>
           <h2>Change Password</h2>
           {error && <p className="error">{error}</p>}
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


     {popup === "username" && (
       <div className="popup-overlay">
         <div className="popup">
           <span className="close" onClick={closePopup}>&times;</span>
           <h2>Change Username</h2>
           {error && <p className="error">{error}</p>}
           <input
             type="text"
             placeholder="Current Username"
             id="currentUsername"
             value={formData.currentUsername}
             onChange={handleInputChange}
           />
           <input
             type="text"
             placeholder="New Username"
             id="newUsername"
             value={formData.newUsername}
             onChange={handleInputChange}
           />
           <input
             type="text"
             placeholder="Confirm New Username"
             id="confirmNewUsername"
             value={formData.confirmNewUsername}
             onChange={handleInputChange}
           />
           <button onClick={submitChangeUsername}>Submit</button>
         </div>
       </div>
     )}


     {popup === "delete" && (
       <div className="popup-overlay">
         <div className="popup">
           <span className="close" onClick={closePopup}>&times;</span>
           <h2>Do you really want to delete your account?</h2>
           {error && <p className="error">{error}</p>}
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
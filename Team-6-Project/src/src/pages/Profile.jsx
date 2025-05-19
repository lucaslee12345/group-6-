import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../css/Profile.css';
import profilepicture from '../img/9706583.png'; // Adjust the path as necessary
import { getAuth } from 'firebase/auth';

function Profile({ setPage}) {


 const [isPanelVisible, setIsPanelVisible] = useState(false);
 const [username, setUsername] = useState('');


 useEffect(() => {
   const fetchUserData = async () => {
     const user = auth.currentUser;
     if (user) {
       try {
         const userDoc = await getDoc(doc(db, 'Accounts', user.uid));
         if (userDoc.exists()) {
           const userData = userDoc.data();
           setUsername(userData.username || user.displayName || '');
         }
       } catch (error) {
         console.error("Error fetching username:", error);
       }
     }
   };


   fetchUserData();
 }, []);


 const updateUsername = async (newUsername) => {
   const user = auth.currentUser;
   if (user) {
     try {
       await updateDoc(doc(db, 'Accounts', user.uid), {
         username: newUsername
       });
       setUsername(newUsername);
     } catch (error) {
       console.error("Error updating username:", error);
       throw error;
     }
   }
 };


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
                 <li onClick={() => setPage('dmlist')}>Messages</li>
                 <li onClick={() => setPage('drlist')}>Find Doctor</li>
                 <li onClick={() => setPage('chatwithdoctor')}>AI Chat</li>
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
         <div style={{marginTop:'-4em'}}>
           <h2>Dr.Finder</h2>
         </div> 


         <div>
           <h1 style={{fontSize:'40px'}}>Welcome, <br></br> {username}</h1>
         </div>


          <div>


           <img src={profilepicture} width="200px" height="200px" style={{borderRadius:'50%'}} alt="Profile" />
          </div>
          <div id='profile-buttons'>
              <button onClick={() => setPage('dmlist')} className="profile-button">
                Messages
              </button>

            <button onClick={() => setPage('drlist')} className="profile-button">
              Find Doctors
            </button>

            <button onClick={() => setPage('chatbox')} className="profile-button">
              AI Chat
            </button>

            <button onClick={() => setPage('settings')} className="profile-button">
              Settings
            </button>
          </div>

  
         {/* Navbar */}
        
       </>
     );
}


export default Profile;
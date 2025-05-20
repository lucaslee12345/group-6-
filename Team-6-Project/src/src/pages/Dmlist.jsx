import '../css/Dmlist.css';
import profilepicture from '../img/9706583.png';
import '../css/Drlist.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function Dmlist({ setPage }) {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchChats(user);
      } else {
        setPreviousChats([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchChats = async (user) => {
    try {
      const messagingRef = collection(db, 'Messaging', user.uid, 'doctors');
      const doctorDocsSnapshot = await getDocs(messagingRef);
      const chats = [];

      for (const docSnap of doctorDocsSnapshot.docs) {
        const doctorName = docSnap.id;
        const doctorData = docSnap.data();

        const quickInfoRef = doc(db, 'Messaging', user.uid, 'doctors', doctorName, 'quickInfo', 'info');
        const quickInfoSnap = await getDoc(quickInfoRef);

        chats.push({
          doctorName,
          location: doctorData.location || '',
          specialty: doctorData.specialty || '',
          lastMessage: quickInfoSnap.exists() ? quickInfoSnap.data().lastMessage || '' : '',
        });
      }

      setPreviousChats(chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const DoctorBox = ({ doctorName, location, specialty, lastMessage }) => (
    <div
      className="doctor-box"
      onClick={() =>
        setPage('chatwithdoctor', {
          name: doctorName,
          location,
          specialty
        })
      }
    >
      <img src={profilepicture} width="60" height="60" style={{ borderRadius: '50%', marginRight: '15px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
        <p style={{ fontWeight: 'bold', margin: 0 }}>{doctorName}</p>
        <p style={{ margin: 0 }}>{location}</p>
        <p style={{ margin: 0 }}>{specialty}</p>
        <p style={{ margin: 0 }}>{lastMessage}</p>
      </div>
    </div>
  );

  return (
    <div id="container44">
      <img src={profilepicture} className="profile-icon" alt="Profile" />
      <h2 style={{ textAlign: 'center' }}>Dr.Finder</h2>
      <h1>(WIP)</h1>
      <div style={{ padding: '20px' }}>
        {previousChats.length === 0 ? (
          <div className="no-messages">No messages have been started yet.</div>
        ) : (
          previousChats.map((chat, i) => (
            <DoctorBox
              key={i}
              doctorName={chat.doctorName}
              location={chat.location}
              specialty={chat.specialty}
              lastMessage={chat.lastMessage}
            />
          ))
        )}
      </div>
      <div id="newnavbar">
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
    </div>
  );
}

export default Dmlist;

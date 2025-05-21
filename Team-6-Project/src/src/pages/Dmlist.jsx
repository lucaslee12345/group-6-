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
      onClick={() =>
        setPage('chatwithdoctor', {
          name: doctorName,
          location,
          specialty
        })
      }
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e6f2ff',
        borderRadius: '12px',
        padding: '15px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
        cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src={profilepicture}
        width="60"
        height="60"
        style={{ borderRadius: '50%', marginRight: '15px' }}
        alt="Doctor"
      />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.3em', marginBottom: '4px' }}>{doctorName}</span>
        <span style={{ fontSize: '0.95em', color: '#555' }}>{specialty}</span>
        <span style={{ fontSize: '0.85em', color: '#777', marginTop: '6px' }}>{lastMessage}</span>
      </div>
    </div>
  );

  return (
    <div id="container44" style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Profile Icon */}
      <img src={profilepicture} className="profile-icon" alt="Profile" />

      {/* Dr.Finder Heading */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Dr.Finder</h2>
      </div>

      {/* Scrollable Message List */}
      <div
        style={{
          padding: '20px',
          flex: 1,
          overflowY: 'auto'
        }}
      >
        {previousChats.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '1em',
              padding: '30px 20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              marginTop: '20px',
              animation: 'fadeIn 0.5s ease-in-out'
            }}
          >
            <p style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '8px' }}>
              No messages yet.
            </p>
            <p style={{ fontSize: '0.95em', color: '#999' }}>
              Start chatting with a doctor from the "Find Doctor" section.
            </p>
          </div>
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

      {/* Navigation Menu */}
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

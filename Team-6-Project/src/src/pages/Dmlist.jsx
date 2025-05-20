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
    console.log('Dmlist mounted, setting up auth listener');

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User logged in:', user.uid);
        fetchChats(user);
      } else {
        console.log('No user logged in');
        setPreviousChats([]);
      }
    });

    return () => {
      console.log('Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  const fetchChats = async (user) => {
    try {
      console.log('Fetching doctors under Messaging/' + user.uid);
      const messagingRef = collection(db, 'Messaging', user.uid, 'doctors');
      const doctorDocsSnapshot = await getDocs(messagingRef);
  
      const chats = [];
  
      for (const docSnap of doctorDocsSnapshot.docs) {
        const doctorName = docSnap.id;
        console.log('Doctor name:', doctorName);  
        console.log('Fetching quickInfo for doctor:', doctorName);
  
        // ✅ Fixed path: even segments
        const quickInfoRef = doc(db, 'Messaging', user.uid, 'doctors', doctorName, 'quickInfo', 'info');
        const quickInfoSnap = await getDoc(quickInfoRef);
  
        if (quickInfoSnap.exists()) {
          const data = quickInfoSnap.data();
  
          chats.push({
            doctorName: data.doctorName || doctorName,
            location: data.location || '',
            specialty: data.specialty || '',
            lastMessage: data.lastMessage || '',
            timestamp: data.timestamp || null,
          });
        } else {
          console.log('No quickInfo document for doctor:', doctorName);
        }
      }
  
      chats.sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });
  
      setPreviousChats(chats);
      console.log('Previous chats state updated:', chats);
    } catch (error) {
      console.error('Error fetching quickInfo documents:', error);
    }
  };  

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const DoctorBox = ({ name, location, specialty, message }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(117, 192, 142)',
        width: '100%',
        height: 'auto',
        padding: '15px 20px',
        boxSizing: 'border-box',
        marginTop: '15px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
      onClick={() => setPage('chatwithdoctor')}
    >
      <img
        src={profilepicture}
        width="60px"
        height="60px"
        style={{
          borderRadius: '50%',
          border: '2px solid white',
          marginRight: '15px',
        }}
        alt="Profile"
      />
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flex: 1 }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0', color: '#333' }}>{name}</p>
        <p style={{ fontSize: '14px', margin: '2px 0', color: '#555' }}>{location}</p>
        <p style={{ fontSize: '14px', margin: '2px 0', color: '#555' }}>{specialty}</p>
        <p style={{ fontSize: '14px', margin: '2px 0', color: '#555' }}>{message}</p>
      </div>
    </div>
  );

  return (
    <>
      <div id="container44">
        <img src={profilepicture} className="profile-icon" alt="Profile" />
        <h2 style={{ fontSize: 'large', textAlign: 'center', marginTop: '1.5em' }}>Dr.Finder</h2>
        <h1>(WIP)</h1>

        <div style={{ marginTop: '1em', padding: '20px' }}>
          {previousChats.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2em',
                color: '#666',
                fontSize: '1.1em',
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                marginTop: '2em',
              }}
            >
              No messages have been started yet.
            </div>
          ) : (
            previousChats.map((chat, index) => (
              <DoctorBox
                key={index}
                name={chat.doctorName}
                location={chat.location}
                specialty={chat.specialty}
                message={chat.lastMessage}
              />
            ))
          )}
        </div>

        <div id="newnavbar">
          <button onClick={togglePanel}>☰</button>
          <div className={`sliding-panel ${isPanelVisible ? 'visible' : ''}`}>
            <button className="close-panel" onClick={togglePanel}>
              ✖
            </button>
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
    </>
  );
}

export default Dmlist;
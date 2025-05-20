import '../css/Dmlist.css';
import profilepicture from '../img/9706583.png';
import '../css/Drlist.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';

function Dmlist({ setPage }) {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log('No user logged in');
      setPreviousChats([]);
      return;
    }

    console.log('Setting up chat listener for user:', user.uid);

    const doctorsCollectionRef = collection(db, 'Messaging', user.uid, 'Doctors');

    const unsubscribe = onSnapshot(
      doctorsCollectionRef,
      async (snapshot) => {
        console.log('Doctors snapshot received:', snapshot.docs.length, 'doctors found');

        if (snapshot.docs.length === 0) {
          setPreviousChats([]);
          return;
        }

        const promises = [];

        for (const doctorDoc of snapshot.docs) {
          const doctorName = doctorDoc.id;
          console.log('Processing doctor:', doctorName);

          const chatDocRef = doc(db, 'Messaging', user.uid, 'Doctors', doctorName, 'Final', 'chat');

          promises.push(
            getDoc(chatDocRef)
              .then((chatSnapshot) => {
                console.log('Chat document for', doctorName, 'exists:', chatSnapshot.exists());
                if (chatSnapshot.exists()) {
                  const chatData = chatSnapshot.data();
                  console.log('Chat data for', doctorName, ':', chatData);
                  return {
                    id: chatSnapshot.id, // This will be 'chat' for all docs
                    doctorName: chatData.doctorName || doctorName, // fallback to doctorName if missing
                    specialty: chatData.specialty || '',
                    lastMessage: chatData.lastMessage || '',
                    timestamp: chatData.timestamp || null,
                  };
                }
                return null;
              })
              .catch((error) => {
                console.error('Error fetching chat for doctor', doctorName, ':', error);
                return null;
              })
          );
        }

        const chatResults = await Promise.all(promises);
        const validChats = chatResults.filter((chat) => chat !== null);

        console.log('Chats before sorting:', validChats);

        validChats.sort((a, b) => {
          const timeA = a.timestamp?.seconds || 0;
          const timeB = b.timestamp?.seconds || 0;
          return timeB - timeA;
        });

        console.log('Chats after sorting by timestamp:', validChats);

        setPreviousChats(validChats);
      },
      (error) => {
        console.error('Error in Doctors snapshot listener:', error);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser]);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const DoctorBox = ({ name, message, specialty }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'rgb(117, 192, 142)',
          width: '100%',
          height: '90px',
          padding: '10px 20px',
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
          }}
          alt="Profile"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'left',
          }}
        >
          <p
            style={{
              marginRight: '2.7em',
              marginBottom: '0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            {name}
          </p>
          <p style={{ marginRight: '2.7em', fontSize: '14px', color: '#555' }}>{specialty}</p>
          <p style={{ marginRight: '2.7em', fontSize: '14px', color: '#555' }}>{message}</p>
        </div>
      </div>
    );
  };

  console.log('Rendering previousChats:', previousChats);

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
            previousChats.map((chat) => (
              <DoctorBox
                key={chat.doctorName} // Use doctorName as unique key
                name={chat.doctorName}
                message={chat.lastMessage}
                specialty={chat.specialty}
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
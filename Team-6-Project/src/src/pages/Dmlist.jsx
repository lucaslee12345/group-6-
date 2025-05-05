import '../css/Dmlist.css'
import profilepicture from '../img/9706583.png'
import { useState } from 'react';

function Dmlist({ setPage }) {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };
  const DoctorBox = ({ name, message }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(117, 192, 142)', // Light blue background
        width: '100%',
        height: '90px', // Slightly taller for better spacing
        padding: '10px 20px', // Add padding for better spacing
        boxSizing: 'border-box',
        marginTop: '15px', // Add spacing between boxes
        borderRadius: '15px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover effect
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
          
          borderRadius: '50%', // Circular profile picture
          border: '2px solid white', // Add a border for better contrast
        }}
        alt="Profile"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          textAlign: 'left', // Align text to the left
        }}
      >
        <p style={{ marginRight:"2.7em", marginBottom:"0", fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
          {name}
        </p>
        <p style={{ marginRight:"2.7em", fontSize: '14px', color: '#555' }}>{message}</p>
      </div>
    </div>
  );

  return (
    <>
    <div id='container44'>
      <img
          src={profilepicture}
          className="profile-icon"
          alt="Profile"
      />







      <h2 style={{ fontSize: 'large', textAlign: 'center', marginTop:'1.5em'  }}>Dr.Finder</h2>
    
      


      {/* Reusable DoctorBox components */}
    <div style={{ marginTop: '1em', padding: '20px' }}>
      <DoctorBox name="Dr.Ren (MD)" message="If you are sick visit me." />
      <DoctorBox name="Dr.Smith (MD)" message="Appointment is on March 6th." />
      <DoctorBox name="Dr.Joey (MD)" message="Could you give me some advice?" />
      <DoctorBox name="Dr.Sally (MD)" message="When should I take the drugs?" />
      <DoctorBox name="Dr.Fickle (MD)" message="When are you available?" />
      <DoctorBox name="Dr.Zilly (MD)" message="Should I take it before a meal?" />
      <DoctorBox name="Dr.Wok (MD)" message="I am super sick!" />
      <DoctorBox name="Dr.Wong (MD)" message="Let me use my magic to cure you." />
      <DoctorBox name="Dr.Ronaldo (MD)" message="Siuuuuu." />
      <DoctorBox name="Dr.Hare (MD)" message="So this will be your project due tomorrow." />
      <DoctorBox name="Dr.Keenan (MD)" message="Do you like math?" />
      <DoctorBox name="Dr.Hollow (MD)" message="I really love pumpkins." />
      <DoctorBox name="Dr.Chicken (MD)" message="Any questions?" />
      <DoctorBox name="Dr.Jockey (MD)" message="So How did it go?" />
      <DoctorBox name="Dr.Nye (MD)" message="Sorry, I will be a little late" />
      <DoctorBox name="Dr.Bill (MD)" message="No, No, No." />
      <DoctorBox name="Dr.Nelson (MD)" message="Come over." />
      <DoctorBox name="Dr.Kim (MD)" message="Wanna hangout?" />
      <DoctorBox name="Dr.Apple (MD)" message="Yes, yes, yes." />
    </div>

      <div id='newnavbar'>
            <button onClick={togglePanel}>☰</button>
              <div className={`sliding-panel ${isPanelVisible ? 'visible' : ''}`}>
                <button className="close-panel" onClick={togglePanel}>
                  ✖
                </button>
                <ul>
                <li onClick={() => setPage('profile')}>Home</li>
                  <li onClick={() => setPage('dmlist')}>DmList</li>
                  <li onClick={() => setPage('drlist')}>DrList</li>
                  <li onClick={() => setPage('chatbox')}>AI Chat</li>
                  <li onClick={() => setPage('settings')}>Settings</li>
                  
                </ul>
              </div>
          </div>
    </div>
</>

    )

}
export default Dmlist;
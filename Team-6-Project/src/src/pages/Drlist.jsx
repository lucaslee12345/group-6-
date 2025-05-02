import '../css/Drlist.css';
import profilepicture from '../img/9706583.png';

function Drlist({ setPage }) {
    const DoctorBox = ({ name, specialty }) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center', // Vertically center all content
            justifyContent: 'flex-start', // Align content to the left
            backgroundColor: 'rgb(127, 154, 228)', // Match the background color
            width: '100%',
            height: '90px',
            padding: '10px 20px',
            boxSizing: 'border-box',
            marginTop: '15px',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for depth
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
        >
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <img
              src={profilepicture}
              width="60px"
              height="60px"
              style={{
                marginRight: '20px',
                borderRadius: '50%', // Circular profile picture
                border: '2px solid white', // Add border for contrast
              }}
              alt="Profile"
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center text vertically
                textAlign: 'left',
              }}
            >
              <p style={{ marginLeft:'780px', marginBottom:'0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                {name}
              </p>
              <p style={{ marginLeft:'780px', fontSize: '14px', color: '#555' }}>{specialty}</p>
            </div>
          </div>
          <button
            onClick={() => setPage('chatbox')}
            style={{
              fontSize: '16px',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50', // Green button
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, background-color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Start New Chat 📧
          </button>
        </div>
      );

  return (
    <>
       <img
        src={profilepicture}
        width="60px" // Slightly larger for better visibility
        height="60px"
        style={{
          float: 'right',
          borderRadius: '50%', // Make it circular
          border: '2px solid white', // Add a white border for contrast
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
          margin: '10px', // Add spacing around the image
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
      
        alt="Profile"
      />
      <h2 style={{ fontSize: 'large', textAlign: 'center', marginLeft:'50px'  }}>
        Dr.Finder
    
      </h2>
      <h2
        style={{
          fontSize: 'large',
          textAlign: 'center',
          marginLeft: '50px',
          border: '2px solid #333', // Add a border around the box
          borderRadius: '10px', // Rounded corners
          padding: '10px 20px', // Add padding inside the box
          display: 'inline-block', // Ensure the box wraps tightly around the text
          backgroundColor: 'white', // Optional: Add a background color
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
        }}
        >  Dr List </h2>
      {/* Reusable DoctorBox components */}
      <DoctorBox name="Dr.Ren (MD)" specialty="Pediatrist"/>
      <DoctorBox name="Dr.Smith (MD)" specialty="Anaesthesiologist"/>
      <DoctorBox name="Dr.Joey (MD)" specialty="Oncologist"/>
      <DoctorBox name="Dr.Sally (MD)" specialty="Gastroenterologist"/>
      <DoctorBox name="Dr.Fickle (MD)" specialty="Neurologist"/>
      <DoctorBox name="Dr.Zilly (MD)" specialty="Cardiologist"/>
      <DoctorBox name="Dr.Wok (MD)" specialty="Geriatrician"/>
      <DoctorBox name="Dr.Wong (MD)" specialty="Oncologist"/>
      <DoctorBox name="Dr.Ronaldo (MD)" specialty="Physicist"/>
      <DoctorBox name="Dr.Hare (MD)" specialty="Computerist"/>
      <DoctorBox name="Dr.Keenan (MD)" specialty="Mathist"/>

      <div>
        <nav>
          <ul
            style={{
              display: 'flex',
              justifyContent: 'center',
              listStyle: 'none',
              padding: 0,
              margin: '30px 0',
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
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s, background-color 0.2s',
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
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s, background-color 0.2s',
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
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s, background-color 0.2s',
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
    </>
  );
}

export default Drlist;
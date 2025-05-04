import '../css/Dmlist.css'
import profilepicture from '../img/9706583.png'


function Dmlist({ setPage }) {
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
      onClick={() => setPage('chatbox')}
      
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
  width="60px" // Slightly larger for better visibility
  height="60px"
  style={{
    float: 'right',
    borderRadius: '50%', // Make it circular
   
   
    border: '2px solid white', // Add a white border for contrast
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
     // Add spacing around the image
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







      <h2 style={{ fontSize: 'large', textAlign: 'center', marginLeft: '3.75em'  }}>Dr.Finder</h2>
      <h2 style={{ fontSize: 'large', textAlign: 'center', marginLeft: '3.75em'  }}>Click to Chat</h2>
      <h2
        style={{
          fontSize: 'large',
          textAlign: 'center',
          
          border: '2px solid #333', // Add a border around the box
          borderRadius: '10px', // Rounded corners
          padding: '10px 20px', // Add padding inside the box
          display: 'inline-block', // Ensure the box wraps tightly around the text
          backgroundColor: 'white', // Optional: Add a background color
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
          marginLeft: '3.75em'
        }}
      >  
  Dm List
        
</h2>


      {/* Reusable DoctorBox components */}
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

      <div>
        <nav>
          <ul
            style={{
              display: 'flex',
              justifyContent: 'center',
              listStyle: 'none',
              padding: 0,
              margin: '30px 0', // Add spacing at the bottom
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
                  backgroundColor: '#2196F3', // Green background
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                  transition: 'transform 0.2s, background-color 0.2s', // Smooth hover effect
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
                  backgroundColor: '#2196F3', // Blue background
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                  transition: 'transform 0.2s, background-color 0.2s', // Smooth hover effect
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
                  backgroundColor: '#2196F3', // Red background
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                  transition: 'transform 0.2s, background-color 0.2s', // Smooth hover effect
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
    </div>
</>

    )

}
export default Dmlist;
import { useState, useEffect } from 'react';
import '../css/doctorslist.css';

function HomePage({ setPage }) {
  const [talkedDoctors, setTalkedDoctors] = useState([]);

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          'https://npiregistry.cms.hhs.gov/api/?version=2.1&state=CA&limit=10'
        );
        const data = await response.json();
        const fetchedDoctors = data.results.map((doctor) => ({
          name: doctor.basic.name,
          specialty: doctor.taxonomies[0]?.desc || 'Specialty not available',
        }));
        setTalkedDoctors(fetchedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <img
        src="9706583.png"
        width="50px"
        height="50px"
        style={{ float: 'right' }}
        alt="Profile"
      />
      <br />
      <br />
      <h2 style={{ fontSize: 'large', textAlign: 'center' }}>Dr.Finder</h2>
      {talkedDoctors.length > 0 ? (
        talkedDoctors.map((doctor, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'rgb(112, 151, 251)',
              width: '100%',
              height: 70,
              marginTop: index === 0 ? '0' : '-10px',
            }}
          >
            <img
              src="9706583.png"
              width="50px"
              height="50px"
              style={{ float: 'left', padding: '10px 0', paddingLeft: 10 }}
              alt="Doctor"
            />
            <p style={{ padding: '16.7px 0' }}>{doctor.name}</p>
            <p style={{ marginTop: '-2em' }}>{doctor.specialty}</p>
            <a
              style={{
                float: 'right',
                marginTop: '-1.9em',
                marginRight: '2em',
                fontSize: 30,
              }}
              href="Chatbox Page"
            >
              📧
            </a>
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center', marginTop: '1em' }}>
          Loading doctors...
        </p>
      )}
      <div>
        <nav>
          <ul>
            <li>
              <a href="Homescreen.html">Back</a>
            </li>
            <li>
              <a href="Homescreen.html">Home</a>
            </li>
            <li>
              <a href="Settings.html">Settings</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default HomePage;

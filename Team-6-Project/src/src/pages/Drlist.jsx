import React, { useState } from 'react';

const SPECIALTIES = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Dermatology",
  "Cardiology",
  "Psychiatry",
  "Obstetrics & Gynecology",
  "Orthopedic Surgery",
  "Ophthalmology",
  "Radiology",
  "Emergency Medicine",
  "General Surgery",
  "Anesthesiology",
  "Neurology",
  "Urology"
];

// Add more postal codes near 92130
const POSTAL_CODES = [
  "92130", "92121", "92127", "92129", "92131", "92128", "92014", "92075", "92067"
];

function Drlist({ setPage }) {
  // NPI Registry state
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorError, setDoctorError] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [specialty, setSpecialty] = useState('');
  const [mapOverlay, setMapOverlay] = useState({ visible: false, address: "" });

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const lookupDoctors = async () => {
    setLoadingDoctors(true);
    setDoctorError(null);
    setDoctors([]);
    // Build multiple postal_code params for the API
    const postalParams = POSTAL_CODES.map(code => `&postal_code=${code}`).join('');
    const specialtyParam = specialty ? `&taxonomy_description=${encodeURIComponent(specialty)}` : '';
    const npiUrl = `https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1&city=San%20Diego&state=CA${postalParams}&limit=30${specialtyParam}`;
    try {
      const response = await fetch(npiUrl);
      if (!response.ok) throw new Error('Failed to fetch doctors');
      const data = await response.json();
      setDoctors(data.results || []);
    } catch (err) {
      setDoctorError('Failed to fetch doctors');
    }
    setLoadingDoctors(false);
  };

  // Overlay map for address
  const showMapOverlay = (address) => {
    setMapOverlay({ visible: true, address });
  };
  const closeMapOverlay = () => {
    setMapOverlay({ visible: false, address: "" });
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: '2.5rem 0',
      background: 'linear-gradient(120deg,rgb(139, 162, 235) 0%,rgb(103, 146, 238) 100%)',
      minHeight: '100vh'
    }}>
      {/* Map Overlay */}
      {mapOverlay.visible && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 3000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            padding: "1.5rem",
            maxWidth: "90vw",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
          }}>
            <button
              onClick={closeMapOverlay}
              style={{
                position: "absolute",
                top: "12px",
                right: "18px",
                background: "none",
                border: "none",
                fontSize: "1.7rem",
                color: "#184d47",
                cursor: "pointer"
              }}
              aria-label="Close map"
            >✖</button>
            <h3 style={{ marginBottom: "1rem", color: "#184d47" }}>Location Map</h3>
            <div style={{
              width: "70vw",
              maxWidth: "500px",
              height: "55vw",
              maxHeight: "400px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid #43cea2",
              background: "#eee"
            }}>
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapOverlay.address)}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ marginTop: "1rem", color: "#22577a", fontWeight: 500, textAlign: "center" }}>
              {mapOverlay.address}
            </div>
          </div>
        </div>
      )}

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(67, 206, 162, 0.13)',
        padding: '2.5rem 2rem'
      }}>
        <h2 style={{
          color: '#184d47',
          marginBottom: '2rem',
          fontWeight: 700,
          fontSize: '2.1rem',
          letterSpacing: '0.5px'
        }}>
          Find Doctors Near You
        </h2>
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem'
        }}>
          <select
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            style={{
              padding: '0.7rem 1.1rem',
              borderRadius: '10px',
              border: '1.5px solidrgb(84, 107, 238)',
              fontSize: '1.08rem',
              outline: 'none',
              flex: 1,
              maxWidth: '320px',
              background: '#f7fafc',
              transition: 'border 0.2s'
            }}
          >
            <option value="">Choose a Specialty (optional)</option>
            {SPECIALTIES.map((spec, idx) => (
              <option key={idx} value={spec}>{spec}</option>
            ))}
          </select>
          <button
            onClick={lookupDoctors}
            style={{
              padding: '0.7rem 2rem',
              background: 'linear-gradient(90deg,rgb(104, 122, 224) 0%,rgb(23, 66, 109) 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '1.08rem',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(67, 206, 162, 0.13)',
              transition: 'background 0.2s'
            }}
          >
            Search Doctors
          </button>
        </div>

        {doctorError && <p style={{ color: '#d90429', marginBottom: '1.2rem', fontWeight: 500 }}>{doctorError}</p>}
        {loadingDoctors && <div style={{ marginTop: '20px', color: '#22577a', fontWeight: 500 }}>Loading doctors...</div>}

        {doctors.length > 0 && (
          <div style={{
            marginTop: '30px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '22px'
          }}>
            {doctors.map((doc, idx) => {
              // Compose Google Maps query from address
              const address = doc.addresses && doc.addresses[0]
                ? `${doc.addresses[0].address_1}, ${doc.addresses[0].city}, ${doc.addresses[0].state} ${doc.addresses[0].postal_code}`
                : null;
              return (
                <div
                  key={doc.number || idx}
                  style={{
                    background: 'linear-gradient(120deg,rgb(159, 173, 235) 0%,rgb(130, 190, 230) 100%)',
                    borderRadius: '18px',
                    boxShadow: '0 4px 18px rgba(67, 206, 162, 0.10)',
                    padding: '26px 22px',
                    color: '#184d47',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '150px',
                    border: '1.5px solidrgb(70, 106, 226)',
                    cursor: address ? 'pointer' : 'default',
                    transition: 'box-shadow 0.18s, transform 0.13s'
                  }}
                  onClick={() => {
                    if (address) showMapOverlay(address);
                  }}
                  title={address ? "Click to view on map" : ""}
                >
                  <div style={{
                    fontWeight: 700,
                    fontSize: '1.22rem',
                    color: '#184d47',
                    marginBottom: '0.7em',
                    letterSpacing: '0.2px'
                  }}>
                    {(doc.basic?.first_name || doc.basic?.last_name)
                      ? `${doc.basic?.first_name || ''} ${doc.basic?.last_name || ''}`.trim()
                      : doc.basic?.name || doc.basic?.authorized_official_name || "No Name Provided"}
                  </div>
                  <div style={{
                    marginBottom: '0.5em',
                    color: '#22577a',
                    fontSize: '1.07rem',
                    fontWeight: 500
                  }}>
                    {doc.taxonomies && doc.taxonomies[0]
                      ? `Specialty: ${doc.taxonomies[0].desc}`
                      : 'Specialty: N/A'}
                  </div>
                  <div style={{
                    color: '#555',
                    fontSize: '1.01rem',
                    fontWeight: 400,
                    textDecoration: address ? 'underline dotted' : 'none'
                  }}>
                    {address
                      ? `Address: ${address}`
                      : 'Address: N/A'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
  );
}

export default Drlist;
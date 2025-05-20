import React, { useState } from 'react';
import { auth, db } from '../firebase';
import {
  doc, setDoc, collection, addDoc, serverTimestamp
} from 'firebase/firestore';

const SPECIALTIES = [
  "Family Medicine", "Internal Medicine", "Pediatrics", "Dermatology", "Cardiology",
  "Psychiatry", "Obstetrics & Gynecology", "Orthopedic Surgery", "Ophthalmology",
  "Radiology", "Emergency Medicine", "General Surgery", "Anesthesiology", "Neurology", "Urology"
];

function Drlist({ setPage }) {
  const [specialty, setSpecialty] = useState('');
  const [zipInput, setZipInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapOverlay, setMapOverlay] = useState({ visible: false, address: "" });
  const [showNoNameDoctors, setShowNoNameDoctors] = useState(false);

  const lookupDoctors = async () => {
    setError('');
    setDoctors([]);
    setLoading(true);

    const zipCodes = zipInput.split(',').map(z => z.trim()).filter(z => z.length > 0);
    if (!zipCodes.length) {
      setError("Please enter at least one ZIP code.");
      setLoading(false);
      return;
    }

    const postalParams = zipCodes.map(code => `&postal_code=${code}`).join('');
    const specialtyParam = specialty ? `&taxonomy_description=${encodeURIComponent(specialty)}` : '';
    const apiUrl = `https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1${postalParams}&limit=30${specialtyParam}`;

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();

      let result = data.results || [];
      if (!showNoNameDoctors) {
        result = result.filter(d => d.basic?.first_name || d.basic?.last_name || d.basic?.name);
      }
      setDoctors(result);
    } catch {
      setError("Failed to fetch doctors. Try again later.");
    }
    setLoading(false);
  };

  const showMap = (address) => setMapOverlay({ visible: true, address });
  const closeMap = () => setMapOverlay({ visible: false, address: "" });

  const startChat = async (doctorData) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in to start a chat.");
      return;
    }
  
    const first = doctorData.basic?.first_name || '';
    const last = doctorData.basic?.last_name || '';
    const fallbackName = doctorData.basic?.name || doctorData.basic?.authorized_official_name || 'Unnamed Doctor';
    const doctorName = (first || last) ? `${first} ${last}`.trim() : fallbackName;
    const specialty = doctorData.taxonomies?.[0]?.desc || 'N/A';
    const address = doctorData.addresses?.[0]
      ? `${doctorData.addresses[0].address_1}, ${doctorData.addresses[0].city}, ${doctorData.addresses[0].state} ${doctorData.addresses[0].postal_code}`
      : 'N/A';
  
    const userUID = user.uid;
    const messagingPath = `Messaging/${userUID}/${doctorName}`;
  
    try {
      // Create a new document called 'chat' with minimal initial data
      const chatDocRef = doc(db, messagingPath, 'chat');
      await setDoc(chatDocRef, {
        createdAt: serverTimestamp(),
        doctorName,
        specialty,
        messages: [],
        lastMessage: "Chat started",
        userId: userUID,
      });
  
      // Also create or update quickInfo (summary)
      const quickInfoRef = doc(db, messagingPath, 'quickInfo');
      await setDoc(quickInfoRef, {
        doctorName,
        specialty,
        address,
        lastMessage: "Chat started",
        timestamp: serverTimestamp(),
      });
  
      // Pass complete doctor data to the chat page
      setPage('chatwithdoctor', {
        name: doctorName,
        specialty: specialty,
        address: address,
        npi: doctorData.npi,
        basic: doctorData.basic,
        addresses: doctorData.addresses,
        taxonomies: doctorData.taxonomies
      });
    } catch (e) {
      console.error("Failed to create chat", e);
      alert("Failed to start chat.");
    }
  };    

  return (
    <div style={{ padding: '2.5rem', background: 'linear-gradient(120deg,#8ba2eb,#6792ee)', minHeight: '100vh' }}>
      {mapOverlay.visible && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "14px", padding: "1.5rem", maxWidth: "90%", maxHeight: "80%", overflow: "auto", position: "relative" }}>
            <button onClick={closeMap} style={{ position: "absolute", top: 10, right: 12, fontSize: "1.5rem", background: "none", border: "none", cursor: "pointer" }}>✖</button>
            <h3 style={{ marginBottom: "1rem" }}>Location</h3>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapOverlay.address)}&output=embed`}
              width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              title="Map" />
            <p style={{ marginTop: "1rem" }}>{mapOverlay.address}</p>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#184d47' }}>Find Doctors Near You</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <select value={specialty} onChange={e => setSpecialty(e.target.value)} style={{ flex: 1, minWidth: '200px', padding: '0.7rem', borderRadius: '8px' }}>
            <option value="">Select Specialty (optional)</option>
            {SPECIALTIES.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>

          <input
            type="text" placeholder="ZIP codes (comma-separated)" value={zipInput}
            onChange={e => setZipInput(e.target.value)}
            style={{ flex: 1, minWidth: '220px', padding: '0.7rem', borderRadius: '8px' }}
          />

          <button onClick={lookupDoctors} style={{ padding: '0.7rem 1.5rem', background: '#184d47', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        <label style={{ fontSize: '0.95rem' }}>
          <input type="checkbox" checked={showNoNameDoctors} onChange={e => setShowNoNameDoctors(e.target.checked)} />
          &nbsp;Include doctors with no name
        </label>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        {loading && <p>Loading...</p>}

        {doctors.length > 0 && (
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {doctors.map((doc, idx) => {
              const address = doc.addresses?.[0]
                ? `${doc.addresses[0].address_1}, ${doc.addresses[0].city}, ${doc.addresses[0].state} ${doc.addresses[0].postal_code}`
                : 'N/A';
              const fullName = (doc.basic?.first_name || doc.basic?.last_name)
                ? `${doc.basic?.first_name || ''} ${doc.basic?.last_name || ''}`.trim()
                : doc.basic?.name || doc.basic?.authorized_official_name || 'Unnamed Doctor';

              return (
                <div key={idx} style={{ padding: '1.2rem', background: '#eef3fc', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ marginBottom: '0.5rem', color: '#184d47' }}>{fullName}</h3>
                  <p style={{ marginBottom: '0.3rem' }}>Specialty: {doc.taxonomies?.[0]?.desc || 'N/A'}</p>
                  <p
                    onClick={() => address !== 'N/A' && showMap(address)}
                    style={{ color: '#22577a', textDecoration: 'underline dotted', cursor: address !== 'N/A' ? 'pointer' : 'default', marginBottom: '1rem' }}
                  >
                    Address: {address}
                  </p>
                  <button onClick={() => startChat(doc)} style={{ padding: '0.6rem 1.2rem', background: '#184d47', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    Chat with Doctor
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Drlist;
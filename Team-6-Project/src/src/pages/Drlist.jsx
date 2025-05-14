import React, { useState } from 'react';

function Drlist({SetPage})  {
  const [npi, setNpi] = useState('1922037787');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '<NdULrh5KGpv4Om7hr0U4Oxpl4YFjbaYG>'; // Replace with your actual API key

  const getProvider = async () => {
    const url = `https://portal.api.trillianthealth.com/v1/providers/${npi}`;
    try {
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          apiKey: apiKey,
          'user-agent': ''
        }
      });
      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch provider data');
      setResult(null);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '1rem' }}>
      <h2>Provider Lookup</h2>
      <input
        type="text"
        value={npi}
        onChange={(e) => setNpi(e.target.value)}
        placeholder="Enter NPI"
        style={{ marginRight: '1rem' }}
      />
      <button onClick={getProvider}>Lookup</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <pre style={{ background: '#f4f4f4', padding: '1rem', marginTop: '1rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Drlist;
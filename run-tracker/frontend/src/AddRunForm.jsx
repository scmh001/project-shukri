import React, { useState } from 'react';

function AddRunForm({ onAddRun }) {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRun = { distance, time };

    const response = await fetch('/api/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRun),
    });

    if (response.ok) {
      const addedRun = await response.json();
      onAddRun(addedRun);
      setDistance('');
      setTime('');
    } else {
      console.error('Failed to add run:', response.statusText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Distance (km):</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Run</button>
    </form>
  );
}

export default AddRunForm;
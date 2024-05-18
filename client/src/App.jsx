import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [runs, setRuns] = useState([]);
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/runs')
      .then(response => setRuns(response.data))
      .catch(error => console.error('Error fetching runs:', error));
  }, []);

  const addRun = () => {
    axios.post('http://127.0.0.1:5000/api/runs', { distance, time })
      .then(response => setRuns([...runs, response.data]))
      .catch(error => console.error('Error adding run:', error));
  };

  return (
    <div>
      <h1>Run Tracker</h1>
      <div>
        <input
          type="number"
          placeholder="Distance (km)"
          value={distance}
          onChange={e => setDistance(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time (minutes)"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <button onClick={addRun}>Add Run</button>
      </div>
      <ul>
        {runs.map(run => (
          <li key={run.id}>
            {run.distance} km in {run.time} minutes on {new Date(run.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
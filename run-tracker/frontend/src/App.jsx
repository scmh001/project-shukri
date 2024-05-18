import React, { useState, useEffect } from 'react';
import AddRunForm from './AddRunForm';

function App() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    fetch('/api/runs')
      .then(response => response.json())
      .then(data => setRuns(data));
  }, []);

  const handleAddRun = (newRun) => {
    setRuns([...runs, newRun]);
  };

  return (
    <div>
      <h1>Run Tracker</h1>
      <AddRunForm onAddRun={handleAddRun} />
      <ul>
        {runs.map(run => (
          <li key={run.id}>
            Distance: {run.distance} km, Time: {run.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
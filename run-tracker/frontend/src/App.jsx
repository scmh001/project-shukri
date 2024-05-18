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

  const handleDeleteRun = async (id) => {
    const response = await fetch(`/api/runs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setRuns(runs.filter(run => run.id !== id));
    } else {
      console.error('Failed to delete run:', response.statusText);
    }
  };

  return (
    <div>
      <h1>Run Tracker</h1>
      <AddRunForm onAddRun={handleAddRun} />
      <ul>
        {runs.map(run => (
          <li key={run.id}>
            Distance: {run.distance} km, Time: {run.time}
            <button onClick={() => handleDeleteRun(run.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
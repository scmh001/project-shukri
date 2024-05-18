import React, { useState, useEffect } from 'react';
import AddWeeklyGoalForm from './AddWeeklyGoalForm';
import AddRunToDayForm from './AddRunToDayForm';

function App() {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetch('/api/weekly_data')
      .then(response => response.json())
      .then(data => setWeeklyData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddWeeklyGoal = (newWeeklyGoal) => {
    setWeeklyData([...weeklyData, newWeeklyGoal]);
  };

  const handleAddRunToDay = (weekId, day, newRun) => {
    setWeeklyData(weeklyData.map(week => {
      if (week.week_id === weekId) {
        return {
          ...week,
          runs: {
            ...week.runs,
            [day]: [...week.runs[day], newRun]
          }
        };
      }
      return week;
    }));
  };

  const handleDeleteWeeklyData = async (week_id) => {
    const response = await fetch(`/api/weekly_data/${week_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setWeeklyData(weeklyData.filter(data => data.week_id !== week_id));
    } else {
      console.error('Failed to delete weekly data:', response.statusText);
    }
  };

  return (
    <div>
      <h1>Weekly Goal and Run Tracker</h1>
      <AddWeeklyGoalForm onAddWeeklyGoal={handleAddWeeklyGoal} />
      <ul>
        {weeklyData.length > 0 ? (
          weeklyData.map(week => (
            <li key={week.week_id}>
              <h2>Week {week.week_id}</h2>
              <ul>
                {Object.keys(week.goals).map(day => (
                  <li key={day}>
                    <h3>{day}</h3>
                    <p>Target Distance: {week.goals[day].target_distance} km, Target Time: {week.goals[day].target_time}</p>
                    <ul>
                      {week.runs[day]?.map((run, index) => (
                        <li key={index}>
                          Distance: {run.distance} km, Time: {run.time}
                        </li>
                      ))}
                    </ul>
                    <AddRunToDayForm weekId={week.week_id} day={day} onAddRun={(day, run) => handleAddRunToDay(week.week_id, day, run)} />
                  </li>
                ))}
              </ul>
              <button onClick={() => handleDeleteWeeklyData(week.week_id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No weekly data available.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
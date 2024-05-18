import React, { useState } from 'react';

function AddWeeklyGoalForm({ onAddWeeklyGoal }) {
  const [weeklyGoals, setWeeklyGoals] = useState({
    Monday: { target_distance: '', target_time: '' },
    Tuesday: { target_distance: '', target_time: '' },
    Wednesday: { target_distance: '', target_time: '' },
    Thursday: { target_distance: '', target_time: '' },
    Friday: { target_distance: '', target_time: '' },
    Saturday: { target_distance: '', target_time: '' },
    Sunday: { target_distance: '', target_time: '' },
  });

  const handleChange = (day, field, value) => {
    setWeeklyGoals({
      ...weeklyGoals,
      [day]: {
        ...weeklyGoals[day],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/weekly_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goals: weeklyGoals, runs: {} }),
    });

    if (response.ok) {
      const addedWeeklyGoal = await response.json();
      onAddWeeklyGoal(addedWeeklyGoal);
      setWeeklyGoals({
        Monday: { target_distance: '', target_time: '' },
        Tuesday: { target_distance: '', target_time: '' },
        Wednesday: { target_distance: '', target_time: '' },
        Thursday: { target_distance: '', target_time: '' },
        Friday: { target_distance: '', target_time: '' },
        Saturday: { target_distance: '', target_time: '' },
        Sunday: { target_distance: '', target_time: '' },
      });
    } else {
      console.error('Failed to add weekly goal:', response.statusText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(weeklyGoals).map(day => (
        <div key={day}>
          <h3>{day}</h3>
          <label>Target Distance (km):</label>
          <input
            type="number"
            value={weeklyGoals[day].target_distance}
            onChange={(e) => handleChange(day, 'target_distance', e.target.value)}
            required
          />
          <label>Target Time:</label>
          <input
            type="text"
            value={weeklyGoals[day].target_time}
            onChange={(e) => handleChange(day, 'target_time', e.target.value)}
            required
          />
        </div>
      ))}
      <button type="submit">Add Weekly Goal</button>
    </form>
  );
}

export default AddWeeklyGoalForm;
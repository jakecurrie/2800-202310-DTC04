import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Dummy data
const fitnessPlan = [
  {
    exerciseName: "Squats",
    weeksCompleted: [
      { week: 1, personalBest: 80 },
      { week: 2, personalBest: 85 },
      { week: 3, personalBest: 90 },
      { week: 4, personalBest: 95 },
      { week: 5, personalBest: 100 },
    ]
  },
  {
    exerciseName: "Bench Press",
    weeksCompleted: [
      { week: 1, personalBest: 60 },
      { week: 2, personalBest: 65 },
      { week: 3, personalBest: 70 },
      { week: 4, personalBest: 75 },
      { week: 5, personalBest: 80 },
    ]
  }
];

// React component
const PersonalBestChart = () => {
  // Setting the initial state as the first exercise's data
  const [selectedExercise, setSelectedExercise] = useState(fitnessPlan[0].weeksCompleted);

  const handleExerciseChange = (event) => {
    const exerciseData = fitnessPlan.find(exercise => exercise.exerciseName === event.target.value).weeksCompleted;
    setSelectedExercise(exerciseData);
  };

  return (
    <div>
      <select onChange={handleExerciseChange}>
        {fitnessPlan.map((exercise, index) => (
          <option key={index} value={exercise.exerciseName}>{exercise.exerciseName}</option>
        ))}
      </select>
      <LineChart
        width={500}
        height={300}
        data={selectedExercise}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="personalBest" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default PersonalBestChart;
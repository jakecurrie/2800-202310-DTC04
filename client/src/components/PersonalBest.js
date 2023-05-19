import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PersonalBestChart = () => {
  const exercises = ["Bench Press", "Squat", "Deadlift", "Overhead Press", "Barbell Row"];
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);

  const data = {
    "Bench Press": [
      { date: new Date("2023-04-19").getTime(), personalBest: 100, currentWeight: 100 },
      { date: new Date("2023-04-21").getTime(), personalBest: 100, currentWeight: 90 },
      { date: new Date("2023-04-23").getTime(), personalBest: 100, currentWeight: 95 },
      { date: new Date("2023-04-25").getTime(), personalBest: 100, currentWeight: 98 },
      { date: new Date("2023-04-27").getTime(), personalBest: 105, currentWeight: 105 },
    ],
    "Squat": [
      { date: new Date("2023-04-19").getTime(), personalBest: 120, currentWeight: 120 },
      { date: new Date("2023-04-21").getTime(), personalBest: 120, currentWeight: 115 },
      { date: new Date("2023-04-23").getTime(), personalBest: 120, currentWeight: 115 },
      { date: new Date("2023-04-25").getTime(), personalBest: 120, currentWeight: 118 },
      { date: new Date("2023-04-27").getTime(), personalBest: 125, currentWeight: 125 },
    ],
    "Deadlift": [
      { date: new Date("2023-04-19").getTime(), personalBest: 150, currentWeight: 150 },
      { date: new Date("2023-04-21").getTime(), personalBest: 150, currentWeight: 140 },
      { date: new Date("2023-04-23").getTime(), personalBest: 150, currentWeight: 145 },
      { date: new Date("2023-04-25").getTime(), personalBest: 150, currentWeight: 148 },
      { date: new Date("2023-04-27").getTime(), personalBest: 155, currentWeight: 155 },
    ],
    "Overhead Press": [
      { date: new Date("2023-04-19").getTime(), personalBest: 70, currentWeight: 70 },
      { date: new Date("2023-04-21").getTime(), personalBest: 70, currentWeight: 65 },
      { date: new Date("2023-04-23").getTime(), personalBest: 70, currentWeight: 67 },
      { date: new Date("2023-04-25").getTime(), personalBest: 70, currentWeight: 68 },
      { date: new Date("2023-04-27").getTime(), personalBest: 75, currentWeight: 75 },
    ],
    "Barbell Row": [
      { date: new Date("2023-04-19").getTime(), personalBest: 85, currentWeight: 85 },
      { date: new Date("2023-04-21").getTime(), personalBest: 85, currentWeight: 80 },
      { date: new Date("2023-04-23").getTime(), personalBest: 85, currentWeight: 82 },
      { date: new Date("2023-04-25").getTime(), personalBest: 85, currentWeight: 84 },
      { date: new Date("2023-04-27").getTime(), personalBest: 90, currentWeight: 90 },
    ],
  };

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  return (
    <div className="chart-container">
      <h2>{selectedExercise} Personal Best vs Current Weight</h2>

      <select value={selectedExercise} onChange={handleExerciseChange}>
        {exercises.map(exercise => (
          <option key={exercise} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <div className="chart-wrapper">
        <LineChart
          width={500}
          height={300}
          data={data[selectedExercise]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" scale="time" type="number" domain={['auto', 'auto']} tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()} />
          <YAxis />
          <Tooltip labelFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()} />
          <Legend />
          <Line type="monotone" dataKey="personalBest" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="currentWeight" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default PersonalBestChart;





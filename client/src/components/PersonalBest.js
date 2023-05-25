import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const PersonalBestChart = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/fitness/view-plan')
      .then(response => {
        const fetchedExercises = response.data;
        const exerciseNames = fetchedExercises.map(exercise => exercise.exerciseName);
        setExercises(exerciseNames);
        setSelectedExercise(exerciseNames[0]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchPersonalBestData = async () => {
      try {
        const response = await axios.get(`/api/fitness/personalBest/${selectedExercise}`);
        const personalBestData = response.data;

        const updatedData = personalBestData.map(item => {
          const { week, currentWeight } = item;
          const personalBestValues = personalBestData
            .filter(dataItem => dataItem.week <= week && dataItem.personalBest !== null)
            .map(dataItem => dataItem.personalBest);

          const personalBest = personalBestValues.length > 0 ? Math.max(...personalBestValues) : undefined;
          const filteredCurrentWeight = currentWeight !== 0 ? currentWeight : undefined;

          return { week, personalBest, currentWeight: filteredCurrentWeight };
        });

        setData(updatedData);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedExercise) {
      fetchPersonalBestData();
    }
  }, [selectedExercise]);

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  return (
    <div className="chart-container">
      <h2 className="home-pb-h2">{selectedExercise} Personal Best vs Current Weight</h2>

      <select value={selectedExercise || ''} onChange={handleExerciseChange}>
        {exercises.map(exercise => (
          <option key={exercise} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <div className="chart-wrapper">
        {selectedExercise && data.length > 0 && (
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 'dataMax + 10']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="personalBest" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="currentWeight" stroke="#82ca9d" />
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default PersonalBestChart;


















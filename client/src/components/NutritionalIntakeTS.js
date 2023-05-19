import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function NutritionTimeSeries() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('calories');

  useEffect(() => {
    // Fetch data from API or use dummy data
    const dummyData = [
      {date: '05/01', calories: 2200, protein: 150, carbs: 200},
      {date: '05/02', calories: 2300, protein: 160, carbs: 220},
      {date: '05/03', calories: 2100, protein: 140, carbs: 180},
      {date: '05/04', calories: 2400, protein: 170, carbs: 240},
      {date: '05/05', calories: 2000, protein: 130, carbs: 160},
      {date: '05/06', calories: 2200, protein: 150, carbs: 200},
      {date: '05/07', calories: 2300, protein: 160, carbs: 220},
    ];
    setData(dummyData);
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="chart-container">
      <h2>{selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} Intake</h2>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="calories">Calories</option>
        <option value="protein">Protein</option>
        <option value="carbs">Carbs</option>
      </select>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey={selectedOption} stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default NutritionTimeSeries;


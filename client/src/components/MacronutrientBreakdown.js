import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function MacronutrientBreakdown() {
  const [data, setData] = useState({});
  const [selectedDay, setSelectedDay] = useState('Monday');

  useEffect(() => {
    axios.get('/api/nutrition/view-plan')
      .then(response => {
        const fetchedData = response.data;
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const formattedData = {};

        daysOfWeek.forEach(day => {
          formattedData[day] = fetchedData.filter(meal => meal.day === day)
            .reduce((acc, curr) => ({
              Protein: (acc.Protein || 0) + curr.protein,
              Carbs: (acc.Carbs || 0) + curr.carbs,
              Fat: (acc.Fat || 0) + curr.fat
            }), {});
        });

        setData(formattedData);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h2 className='home-macro-h2'>Macronutrient Breakdown for {selectedDay}</h2>
      <select value={selectedDay} onChange={handleDayChange}>
        {
          Object.keys(data).map(day => <option value={day} key={day}>{day}</option>)
        }
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            data={Object.entries(data[selectedDay] || []).map(([name, value]) => ({name, value}))}
            fill="#8884d8"
            label
          >
            {
              Object.values(data[selectedDay] || []).map((entry, index) => 
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MacronutrientBreakdown;



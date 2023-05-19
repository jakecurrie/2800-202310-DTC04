import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

function MacronutrientBreakdown() {
  const [data, setData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('05/01');

  useEffect(() => {
    // Fetch data from API or use dummy data
    const dummyData = {
      '05/01': [
        {name: 'Protein', value: 150},
        {name: 'Carbs', value: 200},
        {name: 'Fat', value: 80},
      ],
      '05/02': [
        {name: 'Protein', value: 160},
        {name: 'Carbs', value: 220},
        {name: 'Fat', value: 90},
      ],
      // Add more days as needed...
    };
    setData(dummyData);
  }, []);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h2>Macronutrient Breakdown for {selectedDay}</h2>
      <select value={selectedDay} onChange={handleDayChange}>
        <option value="05/01">05/01</option>
        <option value="05/02">05/02</option>
        {/* Add more options as needed... */}
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data[selectedDay] || []}
            fill="#8884d8"
            label
          >
            {
              data[selectedDay] && data[selectedDay].map((entry, index) => 
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


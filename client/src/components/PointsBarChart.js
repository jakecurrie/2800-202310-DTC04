import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function PointsBarChart() {
  const [data, setData] = useState([]);

  const levels = {
    'Rookie': { value: 0, color: '#ff0000' },
    'Athlete': { value: 3500, color: '#00ff00' },
    'All-Star': { value: 7000, color: '#0000ff' },
    'MVP': { value: 10000, color: '#ffff00' },
    'Hall of Fame': { value: 15000, color: '#00ffff' },
    'Champion': { value: 25000, color: '#ff00ff' },
    'Prodigy': { value: 45000, color: '#ff0080' },
    'Legend': { value: 60000, color: '#8000ff' },
    'Icon': { value: 80000, color: '#0080ff' },
    'GOAT': { value: 100000, color: '#ff8040' }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/nearbyUsers');
        const sortedData = response.data.sort((a, b) => b.points - a.points);
        setData(sortedData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const maxPoints = Math.max(...data.map(d => d.points));
  const minPoints = Math.min(...data.map(d => d.points));

  let startIndex;
  if (maxPoints === minPoints) {
    startIndex = 0;
  } else {
    const userIndex = data.findIndex(d => d.points === maxPoints);
    if (userIndex === 0 || userIndex === 1) {
      startIndex = 0;
    } else if (userIndex === data.length - 1 || userIndex === data.length - 2) {
      startIndex = Math.max(0, data.length - 5);
    } else {
      startIndex = Math.max(0, userIndex - 2);
    }
  }
  

  const chartData = data.slice(startIndex, startIndex + 5);

  const legendEntries = Object.entries(levels)
  .filter(([level, { value }]) => value >= minPoints && value <= maxPoints)
  .sort((a, b) => b[1].value - a[1].value); // sorting in descending order

return (
<Card>
  <CardContent>
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="points" fill="#8884d8" />

          {legendEntries.map(([level, { value, color }]) => (
            <ReferenceLine
              key={level}
              y={value}
              stroke={color}
              strokeDasharray="3 3"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div>
      <h3>Levels</h3>
      {legendEntries.map(([level, { color }]) => (
        <div key={level} style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: color,
              marginRight: '5px',
            }}
          ></div>
          <span>{level}</span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
);
}

export default PointsBarChart;
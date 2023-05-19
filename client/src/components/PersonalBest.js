import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const PersonalBestChart = ({ userId, exerciseName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/personalBest/${userId}/${exerciseName}`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId, exerciseName]);

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="personalBest" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default PersonalBestChart;

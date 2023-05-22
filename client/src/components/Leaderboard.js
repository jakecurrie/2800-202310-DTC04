import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/users/leaderboard');
        const sortedUsers = response.data.sort((a, b) => b.points - a.points);
        setUsers(sortedUsers.slice(0, 10)); // Get top 10 users
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
    fetchUsers();
  }, []);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>Leaderboard</Card.Header>
      <ListGroup variant="flush">
        {users.map((user, index) => (
          <ListGroup.Item key={index}>
            {index + 1}. {user.name} - {user.points} points
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default Leaderboard;

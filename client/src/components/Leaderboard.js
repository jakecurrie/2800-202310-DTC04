import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

function Leaderboard() {
  const [users, setUsers] = useState([]);

  const rankSystem = { 'Rookie': 0, 'Athlete': 3500, 'All-Star': 7000, 'MVP': 10000, 'Hall of Fame': 15000, 'Champion': 25000, 'Prodigy': 45000, 'Legend': 60000, 'Icon': 80000, 'GOAT': 100000 }

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
    // <Card id='leaderboard-container' style={{ width: '18rem' }}>
    //   <Card.Header id='leaderboard-header'>Leaderboard</Card.Header>
    //   <ListGroup id='leaderboard-list-container' variant="flush">
    //     {users.map((user, index) => (
    //       <ListGroup.Item id='leaderboard-list' key={index}>
    //         {index + 1}. {user.name} - {user.points} points
    //       </ListGroup.Item>
    //     ))}
    //   </ListGroup>
    // </Card>
    <div id='leaderboard-container'>
      <table id='leaderboard-table'>
        <thead>
          <tr>
            <th className='leaderboard-table-headers'>#</th>
            <th className='leaderboard-table-headers'>Username</th>
            <th className='leaderboard-table-headers'>Rank</th>
            <th className='leaderboard-table-headers'>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            for (const key in rankSystem) {
              if (user.points <= rankSystem[key]) {
                var userRank = key
                break
              }
            }
            return (
              <tr key={index + 1}>
                <td className='leaderboard-table-data'>{index + 1}</td>
                <td className='leaderboard-table-data'>{user.name}</td>
                <td className='leaderboard-table-data'>{userRank}</td>
                <td className='leaderboard-table-data'>{user.points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;

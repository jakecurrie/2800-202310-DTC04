import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://server-service-dot-artificialgains.uw.r.appspot.com/profile', {
          method: 'GET',
          credentials: 'include', // to ensure cookies are sent with the request
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h2>Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Created At: {new Date(user.created_at).toLocaleString()}</p>
          <p>Updated At: {new Date(user.updated_at).toLocaleString()}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;


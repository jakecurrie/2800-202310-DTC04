import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from "reactstrap";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h2 className="title">Profile</h2>
                <h5 className="description">Here's your profile information:</h5>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4><strong>Name:</strong> {user.name}</h4>
                <h4><strong>Email:</strong> {user.email}</h4>
                <h4><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</h4>
                <h4><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</h4>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Profile;




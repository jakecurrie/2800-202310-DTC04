import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from "reactstrap";

const defaultImageUrl = '/path/to/default/image.jpg'; // Replace with your default image path

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(defaultImageUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.profilePicture) {
          setProfilePic(data.profilePicture); // assuming user data has a field `profilePicture` with URL to user's image
        }
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
                <div>
                  <img src={profilePic} alt="Profile" style={{ height: '100px', width: '100px', borderRadius: '50%' }} />
                  <form>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="fileInput" />
                    <label htmlFor="fileInput">Upload new picture</label>
                  </form>
                </div>
                <h2 className="title">Profile</h2>
                <h5 className="description">Here's your profile information:</h5>
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




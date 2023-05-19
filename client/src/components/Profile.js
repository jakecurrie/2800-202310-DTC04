import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';
import AvatarEditor from 'react-avatar-editor';
import '../style/Profile.css';
import '../style/FitnessLand.css';

const defaultImageUrl =
  'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(defaultImageUrl);
  const [showUploadOption, setShowUploadOption] = useState(false);
  const editorRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const editorSize = 150; // Adjust this value as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.profilePicture) {
          setProfilePic(`${process.env.REACT_APP_API_BASE_URL}/${data.profilePicture}`);
        }
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setShowUploadOption(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const profilePicDataUrl = canvas.toDataURL();

      // Convert the Data URL to a Blob
      const response = await fetch(profilePicDataUrl);
      const blob = await response.blob();

      // Create a form and append the file
      const formData = new FormData();
      formData.append('profilePicture', blob);

      // Post the image to your endpoint
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/uploadProfilePicture`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setProfilePic(profilePicDataUrl);
        })
        .catch(console.error);

      setShowUploadOption(false);
    }
  };

  const handleCancelUpload = () => {
    setShowUploadOption(false);
    setUploadedImage(null);
  };

  return (
    <Container id="profile-body-container">
      <Row className="mt-4">
        <Col className="text-center" id="profile-picture-container">
          <div className="profile-picture">
            {showUploadOption && uploadedImage ? (
              <AvatarEditor
                ref={editorRef}
                image={uploadedImage}
                width={editorSize}
                height={editorSize}
                border={10}
                borderRadius={editorSize / 2}
                color={[255, 255, 255, 0.6]}
                scale={1}
              />
            ) : (
              <div className="default-profile-picture">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="resized-profile-picture"
                  style={{ width: `${editorSize}px`, height: `${editorSize}px` }}
                />
              </div>
            )}
          </div>
          <FormGroup className="mt-2">
            <Input
              type="file"
              id="profilePicture"
              accept=".jpg,.png,.jpeg"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            {showUploadOption ? (
              <>
                <Button onClick={handleSaveImage} color="primary">
                  Save
                </Button>
                <Button onClick={handleCancelUpload} color="secondary">
                  Cancel
                </Button>
              </>
            ) : (
              <label htmlFor="profilePicture" className="upload-button">
                Upload Photo
              </label>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row className="mt-4" id="profile-title-container">
        <Col>
          <Card className="card-profile fitness-cards">
            <CardBody>
              <CardTitle tag="h4" id="profile-title-h4">Profile Information</CardTitle>
              <CardText className="profile-info-text">
                <strong>Name:</strong> {user && user.name}
              </CardText>
              <CardText className="profile-info-text">
                <strong>Email:</strong> {user && user.email}
              </CardText>
              <CardText className="profile-info-text">
                <strong>Created At:</strong> {user && new Date(user.created_at).toLocaleString()}
              </CardText>
              <CardText className="profile-info-text">
                <strong>Updated At:</strong> {user && new Date(user.updated_at).toLocaleString()}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

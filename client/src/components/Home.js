import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MacronutrientBreakdown from './MacronutrientBreakdown.js';
import PersonalBestChart from './PersonalBest.js';
import NutritionalIntakeTS from './NutritionalIntakeTS.js';

const HomePage = () => {
  // Replace 'userId' and 'exerciseName' with actual values or state
  const userId = 'userId';
  const exerciseName = 'exerciseName';

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col xs={12} className="text-center mb-3">
          <h1>Home</h1>
          <Button variant="primary" className="mr-2">Diet</Button>
          <Button variant="primary">Fitness</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <MacronutrientBreakdown userId={userId} />
        </Col>
        <Col xs={12} md={4}>
          <PersonalBestChart userId={userId} exerciseName={exerciseName} />
        </Col>
        <Col xs={12} md={4}>
          <NutritionalIntakeTS userId={userId} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;


import React from 'react';
import { Link } from 'react-router-dom';
import MacronutrientBreakdown from './MacronutrientBreakdown.js';
import PersonalBestChart from './PersonalBest.js';
import NutritionalIntakeTS from './NutritionalIntakeTS.js';
import '../style/Home.css';

const HomePage = () => {
  // Replace 'userId' and 'exerciseName' with actual values or state
  const userId = 'userId';
  const exerciseName = 'exerciseName';

  return (
    <div id="fitness-body-container">
      <div id="fitness-title-container">
        <h1 id="fitness-title-h1">Home</h1>
        <p id="fitness-title-welcome">Track your nutrition and workout progress</p>
      </div>
      <div id="fitness-card-container">
        <Link to="/fitness" className="fitness-cards">
          <h2 className="fitness-card-h2">Fitness</h2>
          <span className="fitness-card-arrow">→</span>
        </Link>
        <Link to="/diet" className="fitness-cards">
          <h2 className="fitness-card-h2">Diet</h2>
          <span className="fitness-card-arrow">→</span>
        </Link>
        <div className="fitness-cards">
          <h2 className="fitness-card-h2">Macronutrient Breakdown</h2>
          <div className="fitness-card-chart">
            <MacronutrientBreakdown userId={userId} />
          </div>
        </div>
        <div className="fitness-cards">
          <h2 className="fitness-card-h2">Personal Best</h2>
          <div className="fitness-card-chart">
            <PersonalBestChart userId={userId} exerciseName={exerciseName} />
          </div>
        </div>
        <div className="fitness-cards">
          <h2 className="fitness-card-h2">Nutritional Intake Time Series</h2>
          <div className="fitness-card-chart">
            <NutritionalIntakeTS userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;







import React from 'react';
import { Link } from 'react-router-dom';
import MacronutrientBreakdown from './MacronutrientBreakdown.js';
import PersonalBestChart from './PersonalBest.js';
import NutritionalIntakeTS from './NutritionalIntakeTS.js';
import Leaderboard from './Leaderboard.js';
import '../style/Home.css';

const HomePage = () => {
  // Replace 'userId' and 'exerciseName' with actual values or state
  const userId = 'userId';
  const exerciseName = 'exerciseName';

  return (
    <div id="home-body-container">
      <div id="home-title-container">
        <h1 id="home-title-h1">Home</h1>
        <p id="home-title-welcome">Track your nutrition and workout progress</p>
      </div>
      <div id="home-card-container">
        <Link to="/app/fitness" className="home-cards">
          <h2 className="home-card-h2">Fitness</h2>
          <p className="home-card-arrow">&#62;</p>
        </Link>
        <Link to="/app/nutrition" className="fitness-cards">
          <h2 className="fitness-card-h2">Diet</h2>
          <span className="fitness-card-arrow">→</span>
        </Link>
        <div className="fitness-cards">
          <h2 className="fitness-card-h2">Macronutrient Breakdown</h2>
          <div className="fitness-card-chart">
            <MacronutrientBreakdown userId={userId} />
          </div>
        </div>
        <div className="home-cards">
          <h2 className="home-card-h2">Personal Best</h2>
          <div className="home-card-chart">
            <PersonalBestChart userId={userId} exerciseName={exerciseName} />
          </div>
        </div>
        <div className="home-cards">
          <h2 className="home-card-h2">Nutritional Intake Time Series</h2>
          <div className="home-card-chart">
            <NutritionalIntakeTS userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;







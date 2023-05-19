import React from 'react';
import MacronutrientBreakdown from './MacronutrientBreakdown.js';
import PersonalBestChart from './PersonalBest.js';
import NutritionalIntakeTS from './NutritionalIntakeTS.js';

const HomePage = () => {
  // Replace 'userId' and 'exerciseName' with actual values or state
  const userId = 'userId';
  const exerciseName = 'exerciseName';

  return (
    <div className="homepage">
      <h1>Welcome to Fitness Tracker</h1>
      <div className="chart-container">
        <MacronutrientBreakdown userId={userId} />
        <PersonalBestChart userId={userId} exerciseName={exerciseName} />
        <NutritionalIntakeTS userId={userId} />
      </div>
    </div>
  );
};

export default HomePage;

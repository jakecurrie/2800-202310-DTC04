import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MacronutrientBreakdown from './MacronutrientBreakdown.js';
import PersonalBestChart from './PersonalBest.js';
import NutritionalIntakeTS from './NutritionalIntakeTS.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import '../style/Home.css';
import Leaderboard from './Leaderboard.js';


const HomePage = () => {
  // Replace 'userId' and 'exerciseName' with actual values or state
  const userId = 'userId';
  const exerciseName = 'exerciseName';
  const [rankDiv, setRankDiv] = useState({opacity: '0'});

  const rankSystem = { 'Rookie': 0, 'Athlete': 3500, 'All-Star': 7000, 'MVP': 10000, 'Hall of Fame': 15000, 'Champion': 25000, 'Prodigy': 45000, 'Legend': 60000, 'Icon': 80000, 'GOAT': 100000 }
  let rankList = [];

  function showRankSystem() {
    setRankDiv({opacity: '1'});
  }

  function hideRankSystem() {
    setRankDiv({opacity: '0'});
  }

  let index = 0
  for (const key in rankSystem) {
    rankList.push(<p className='home-rank-ladder-info' key={index}>{key}: {rankSystem[key]} pts</p>);
    index++;
  }

  return (
    <div  id="home-body-container">
      <div id="home-title-container">
        <h1 id="home-title-h1">Home</h1>
        <p id="home-title-welcome">Track your nutrition and workout progress</p>
      </div>
      <div id="home-card-container">
        <Link to="/app/fitness" className="home-cards">
          <h2 className="home-card-h2">Fitness</h2>
          <p className="home-card-arrow">&#62;</p>
        </Link>
        <Link to="/app/nutrition" className="home-cards">
          <h2 className="home-card-h2">Diet</h2>
          <p className="home-card-arrow">&#62;</p>
        </Link>
        <div id='home-leaderboard-container' className="home-cards">
          <div id='home-leaderboard-header'>
            <h2 className="home-card-h2">Leaderboard</h2>
            <FontAwesomeIcon className='home-leaderboard-info-icon' icon={faCircleInfo} onMouseOver={showRankSystem} onMouseOut={hideRankSystem} />
          </div>
          <div id='home-leaderboard-info' style={rankDiv}>
            {rankList}
          </div>
          <div id='home-leaderboard-component-container' className="home-card-chart">
            <Leaderboard />
          </div>
        </div>
        <div className="home-cards">
          <h2 className="home-card-h2">Macronutrient Breakdown</h2>
          <div className="home-card-chart">
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













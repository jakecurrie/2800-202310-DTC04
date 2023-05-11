import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import MealClassifier from './components/MealClassifier';
import Navbar from './components/Navbar';
import FitnessPlan from './components/FitnessPlan';
import Login from './components/Login';
import Logout from './components/Logout';
import FitnessForm from './components/FitnessForm';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/fitness" element={<FitnessForm />} />
        <Route path="/fitnessplan" element={<FitnessPlan />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/mealclassifier" element={<MealClassifier />} />
      </Routes>
    </>
  );
}

export default App;
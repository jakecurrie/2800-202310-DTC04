import { React, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import MealClassifier from './components/MealClassifier';
import Navbar from './components/Navbar';
import FitnessPlan from './components/FitnessPlan';
import Login from './components/Login';
import Logout from './components/Logout';
import DietForm from './components/DietForm';
import DietPlan from './components/DietPlan';
import ResetPasswordRequest from './components/ResetPasswordRequest';
import ResetPassword from './components/ResetPassword';
import FitnessForm from './components/FitnessForm';
import NotFound from './components/NotFound';
import FitnessLand from './components/FitnessLand';
import ViewFitnessPlan from './components/ViewFitnessPlan';
import StartWorkout from './components/StartWorkout';
import Landing from './components/Landing'
import LoginOrRegister from './components/LoginOrRegister'
import NutritionLand from './components/NutritionLand';
import ViewDietPlan from './components/ViewDietPlan';
import NutritionByDesc from './components/NutritionByDesc';
import HomePage from './components/Home';
import axios from 'axios';

axios.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);
  
  const [points, setPoints] = useState(0);

  const updatePoints = async () => {
    try {
      const response = await axios.get('/api/users/currentPoint')
      setPoints(response.data);
    } catch (err) {
      console.error('Error', err);
    }
  };

  return (
    <>
      <Routes>
        {/* no need for auth */}
        <Route path="/" >
          <Route index element={<Landing />} />
          <Route path="login" element={isLoggedIn ? <Navigate to='/app/home' /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="register" element={isLoggedIn ? <Navigate to='/app/home' />  : <Register />} />
          <Route path="request-reset" element={isLoggedIn ? <Navigate to='/app/home' />  : <ResetPasswordRequest />} />
          <Route path="reset-password/:userID/:token" element={<ResetPassword />} />
        </Route>

        {/* need for auth */}
        <Route path="/app" element={<Navbar setIsLoggedIn={setIsLoggedIn} updatePoints={updatePoints} points={points}/>}>
          <Route path="profile" element={isLoggedIn ? <Profile /> : <Navigate to='/login' />} />
          <Route path="fitness" element={isLoggedIn ? <FitnessLand /> : <Navigate to='/login' />} />
          <Route path="nutrition" element={isLoggedIn ? <NutritionLand /> : <Navigate to='/login' />} />
          <Route path="fitnessgenerator" element={isLoggedIn ? <FitnessForm /> : <Navigate to='/login' />} />
          <Route path="startworkout" element={isLoggedIn ? <StartWorkout updatePoints={updatePoints} /> : <Navigate to='/login' />} />
          <Route path="fitnessplan" element={isLoggedIn ? <FitnessPlan /> : <Navigate to='/login' />} />
          <Route path="viewfitnessplan" element={isLoggedIn ? <ViewFitnessPlan /> : <Navigate to='/login' />} />
          <Route path="dietplangenerator" element={isLoggedIn ? <DietForm /> : <Navigate to='/login' />} />
          <Route path="dietplan" element={isLoggedIn ? <DietPlan /> : <Navigate to='/login' />} />
          <Route path="viewdietplan" element={isLoggedIn ? <ViewDietPlan /> : <Navigate to='/login' />} />
          <Route path="mealclassifier" element={isLoggedIn ? <MealClassifier /> : <Navigate to='/login' />} />
          <Route path="nutritionbydesc" element={isLoggedIn ? <NutritionByDesc /> : <LoginOrRegister/>} />
          <Route path="home" element={isLoggedIn ? <HomePage /> : <Navigate to='/login'/>} />

        </Route>

        {/* 404 not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

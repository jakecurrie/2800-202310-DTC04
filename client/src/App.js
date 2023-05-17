import { React, useState, useEffect} from 'react';
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
import NutritionByDesc from './components/NutritionByDesc';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]); 

  return (
    <>
      <Navbar />
      <Routes>
        {/* no need for auth */}
        <Route path="/" element={<Landing setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/login" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={isLoggedIn ? <Profile /> : <Register />} />
        <Route path="/request-reset" element={isLoggedIn ? <Profile /> : <ResetPasswordRequest />} />
        <Route path="/reset-password/:userID/:token" element={<ResetPassword />} />

        {/* need for auth */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <LoginOrRegister/>} />
        <Route path="/fitness" element={isLoggedIn ? <FitnessLand /> : <LoginOrRegister/>} />
        <Route path="/nutrition" element={isLoggedIn ? <NutritionLand /> : <Navigate to='/login'/>} />
        <Route path="/fitnessgenerator" element={isLoggedIn ? <FitnessForm /> : <LoginOrRegister/>} />
        <Route path="/startworkout" element={isLoggedIn ? <StartWorkout /> : <LoginOrRegister/>} />
        <Route path="/fitnessplan" element={isLoggedIn ? <FitnessPlan /> : <LoginOrRegister/>} />
        <Route path="/viewfitnessplan" element={isLoggedIn ? <ViewFitnessPlan /> : <LoginOrRegister/>} />
        <Route path="/dietplangenerator" element={isLoggedIn ? <DietForm /> : <LoginOrRegister/>} />
        <Route path="/dietplan" element={isLoggedIn ? <DietPlan /> : <Navigate to='/login'/>} />
        <Route path="/mealclassifier" element={isLoggedIn ? <MealClassifier /> : <LoginOrRegister/>} />
        <Route path="/nutritionbydesc" element={isLoggedIn ? <NutritionByDesc /> : <LoginOrRegister/>} />

        {/* 404 not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

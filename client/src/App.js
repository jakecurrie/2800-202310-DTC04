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
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/request-reset" element={<ResetPasswordRequest />} />
        <Route path="/reset-password/:userID/:token" element={<ResetPassword />} />

        {/* need for auth */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to='/login'/>} />
        <Route path="/fitness" element={isLoggedIn ? <FitnessLand /> : <Navigate to='/login'/>} />
        <Route path="/fitnessgenerator" element={isLoggedIn ? <FitnessForm /> : <Navigate to='/login'/>} />
        <Route path="/fitnessplan" element={isLoggedIn ? <FitnessPlan /> : <Navigate to='/login'/>} />
        <Route path="/viewfitnessplan" element={isLoggedIn ? <ViewFitnessPlan /> : <Navigate to='/login'/>} />
        <Route path="/nutrition" element={isLoggedIn ? <DietForm /> : <Navigate to='/login'/>} />
        <Route path="/dietPlan" element={isLoggedIn ? <DietPlan /> : <Navigate to='/login'/>} />
        <Route path="/mealclassifier" element={isLoggedIn ? <MealClassifier /> : <Navigate to='/login'/>} />

        {/* 404 not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

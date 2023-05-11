import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import Navbar from './components/Navbar';
import FitnessPlan from './components/FitnessPlan';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/fitness" element={<FitnessPlan />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
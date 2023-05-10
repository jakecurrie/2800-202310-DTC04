import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;





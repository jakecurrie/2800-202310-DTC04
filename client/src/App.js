import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;





import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';

function App() {
  return (
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={< Register/>} />
      </Routes>
  );
}

export default App;




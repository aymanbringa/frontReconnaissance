// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginComponent from './components/AuthComponement';
import Register from './components/RegisterComponement';
import Profile from './components/ProfileComponement';
import Face from './components/FaceRecognitionComponement';


function App() {
  return (
    
    <div className="App">
      <header className="App-header">

        <Routes>
          <Route exact path="/" element={<LoginComponent />} />
          <Route path="/register" element={<Register />} />

          <Route path="/face" element={<Face />} />
          <Route path="/profile/:id" element={<Profile />} />

        </Routes>
      </header>
    </div>
  );
}


export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import StartupPage from './components/StartupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/startup/:id" element={<StartupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



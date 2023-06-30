import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfileForm';
import StartupPage from './components/StartupCard';
// import { AuthContext } from './contexts/AuthContext'; // may ue to access the logged-in data 


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



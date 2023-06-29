import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/HomePage'; // need to add
import ProfilePage from './components/ProfileForm';
import StartupPage from './components/StartupCard';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/startup/:id">
            <StartupPage />
          </Route>
          {/* Add more <Route> tags as needed for additional pages */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

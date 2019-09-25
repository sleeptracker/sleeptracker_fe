import React, {useState } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import NavBar from './Components/Nav/NavBar';
import Tracker from './Components/Tracker/Tracker';
import HomePage from './Components/Home/HomePage';


function App() {
  const [user, setUser] = useState({
    userId: 120,
    token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJ1c2VybmFtZSI6ImV4YW1wbGUiLCJyb2xlIjoidXNlciIsImlhdCI6MTU2OTM3MDc0NiwiZXhwIjoxNTY5NDU3MTQ2fQ.ilE5k1iM5OTpzY-NXcpuctEBvod2Q72BUI2Cz8ZmOYY"
    });
  return (
    <div className="App">
      <div>
        <Route exact path='/' render={props => <Login {...props} setUser={setUser} /> } />
        <Route path="/SignUp" render={props => <SignUp {...props} setUser={setUser} /> } />
      </div>
      <Route path='/Home' render={props => <NavBar {...props} user={user} setUser={setUser} /> } />
      <Route path='/Home/Home' render={props => <HomePage {...props} user={user} /> } />
      <Route path='/Home/Tracker' render={props => <Tracker {...props} user={user} /> } />

    </div>
  );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import NavBar from './Components/Nav/NavBar';
import Tracker from './Components/Tracker';
import HomePage from './Components/Home/HomePage';

function App() {
  const [user, setUser] = useState();
  console.log(user);
  return (
    <div className="App">
      <div>
        <Route exact path='/' render={props => <Login {...props} setUser={setUser} /> } />
        <Route path="/SignUp" render={props => <SignUp {...props} setUser={setUser} /> } />
      </div>
      <Route path='/Home' render={props => <NavBar {...props} user={user} /> } />
      <Route path='/Home/Home' render={props => <HomePage {...props} /> } />
      <Route path='/Home/tracker' render={props => <Tracker {...props} /> } />
    </div>
  );
}

export default App;

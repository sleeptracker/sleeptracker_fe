import React, {useState} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login from './Components/Login';
import Tracker from './Components/Tracker';

function App() {
  const [user, setUser] = useState("");
  return (
    <div className="App">
      {/* <Route exact path='/' render={props => <Login {...props} user={user} /> } /> */}
      <Route path='/tracker' render={() => <Tracker />} />
    </div>
  );
}

export default App;

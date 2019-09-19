import React, {useState} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login from './Components/Login';

function App() {
  const [user, setUser] = useState("");
  return (
    <div className="App">
      <Route exact path='/' render={props => <Login {...props} user={user} /> } />
    </div>
  );
}

export default App;

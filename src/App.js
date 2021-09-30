import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

import { Switch, Route } from 'react-router-dom';


const HatsComponent = () => {
  return (
    <div>
      <h2>Hats Component..</h2>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/hats" component={HatsComponent} />
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// components
import HomePage from './containers/HomePage';
import Admin from './containers/Admin';
import Navigation from './components/Navigation';

function App() {

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Navigation />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" component={Admin} />
          <Redirect to="/" />
        </Switch>
      </div>

    </BrowserRouter>
  );
}

export default App;

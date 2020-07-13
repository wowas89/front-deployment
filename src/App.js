import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { getTemplates, getDeployments } from './actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// components
import HomePage from './containers/HomePage';
import Admin from './containers/Admin';
import Navigation from './components/Navigation';

function App() {

  const dispatch = useDispatch();

  // get templates and deployments
  useEffect(() => {
    dispatch(getTemplates());
    dispatch(getDeployments());
  }, [dispatch])

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

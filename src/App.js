import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Home from './components/app';
import Log from './components/log';

class Main extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/log" component={Log}/>
          <Redirect path='*' to='/'/>
        </Switch>
      </Router>
    )
  }
}

export default Main;
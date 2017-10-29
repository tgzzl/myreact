import React from 'react';
import {Route, Redirect} from 'react-router';
import {ConnectedRouter} from 'react-router-redux'
import history from './history'

import App from './components/app';
import Log from './components/log';

/* ConnectedRouter will use the store from Provider automatically */
const RouteConfig = (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={Log}/>
      <Route path="/log" component={Log}/>
      <Redirect path='*' to='/'/>
    </div>
  </ConnectedRouter>
);

export default RouteConfig;
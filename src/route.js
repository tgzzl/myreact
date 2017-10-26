import React from 'react';
import {Route, Redirect} from 'react-router';
import {ConnectedRouter} from 'react-router-redux'
import history from './history'

import App from './components/app';
import Log from './components/log';

const asynLog = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./components/log').default)
  }, 'log')
};

/* ConnectedRouter will use the store from Provider automatically */
const RouteConfig = (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/log" component={Log}/>
      <Redirect path='*' to='/'/>
    </div>
  </ConnectedRouter>
);

export default RouteConfig;
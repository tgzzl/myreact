import {createStore, combineReducers, applyMiddleware} from 'redux'
import middleware from 'redux-thunk'

import globalState from './reducers'

const store = createStore(
  combineReducers({globalState}),
  applyMiddleware(middleware)
);

export default store;

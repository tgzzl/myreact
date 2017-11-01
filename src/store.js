import {createStore, combineReducers, applyMiddleware} from 'redux'
import middleware from 'redux-thunk'

import reducers from './reducers'

const store = createStore(
  combineReducers({...reducers}),
  applyMiddleware(middleware)
);

export default store;

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {routerReducer, routerMiddleware, push} from 'react-router-redux'

import history from './history'
import reducers from './reducers' // Or wherever you keep your reducers

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

export default store;
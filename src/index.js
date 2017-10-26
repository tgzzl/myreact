import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import route from './route'
import registerServiceWorker from './registerServiceWorker';

import './assetes/styles/index.css';


ReactDOM.render(
  <Provider store={store}>{route}</Provider>,
  document.getElementById('root')
);

registerServiceWorker();

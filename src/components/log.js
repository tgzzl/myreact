import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assetes/images/logo.svg';
import '../assetes/styles/app.css';

class Log extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/log.js</code> and save to reload.
        </p>
        <Link to="/">go App</Link>
      </div>
    );
  }
}

export default Log;

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd-mobile';
import logo from '../assetes/images/logo.svg';
import '../assetes/styles/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/app.js</code> and save to reload.
        </p>
        <Button>Button</Button>
        <Link to="/log">go Log</Link>
      </div>
    );
  }
}

export default App;

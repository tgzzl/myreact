import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd-mobile';
import logo from '../assetes/logo.svg';
import '../style/app.css';
import store from '../store'

class App extends Component {
  componentDidMount() {
    console.log('======', store.getState().authReducer)
    // store.dispatch({type: 'TEST', data: 'test'})
  }

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
        <Button><Link to={{pathname: '/log', query: {id: 1}}}>go Log</Link></Button>
      </div>
    );
  }
}

// export default connect(state => ({location: state.location}))(App);
export default App;

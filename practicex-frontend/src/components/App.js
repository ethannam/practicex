import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import RegisterPage from '../containers/RegisterPage';
import Proctor from '../containers/Proctor';
import Progress from '../containers/Progress';
import ProfilePage from '../containers/ProfilePage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/progress" component={Progress} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/proctor" component={Proctor} />
        <Route path="/" component={HomePage} />
      </Switch>
    );
  }
}

export default App;

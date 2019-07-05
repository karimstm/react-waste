import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import * as actions from './actions'
import PublicLayout from './components/PublicLayout';
import ProtectedLayout from './components/ProtectedLayout';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState = () => {
    store.dispatch(actions.checkAuthState());
  }

  logout = () => {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <Router basename="/">
          <div className="App">
            <Switch>
              <Route path="/app" component={ProtectedLayout} />
              <Route path="/" render={() => <PublicLayout logout={this.logout} />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import Header from './components/shared/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import * as actions from './actions'

const store = require('./reducers').init();

function App() {

  function componentWillMount() {
    checkAuthState();
  }

  function checkAuthState() {
    debugger ;
      store.dispatch(actions.checkAuthState());
  }

  componentWillMount();
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="wrapper">
            <Header />
            <Route exect path="/"></Route>
            <Route exect path="/login" component={Login}></Route>
            <Route exect path="/register" component={Register}></Route>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

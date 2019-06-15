import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import Header from './components/shared/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import * as actions from './actions'
import ProtectedRoute from './components/shared/auth/ProtectedRoute'
import LogedInRoute from './components/shared/auth/LogedInRoute'
import PostOffer from './components/offres/PostOffer';

const store = require('./reducers').init();

function App() {

  function componentWillMount() {
    checkAuthState();
  }

  function checkAuthState() {
      store.dispatch(actions.checkAuthState());
  }

  function logout() {
    store.dispatch(actions.logout());
  }
  componentWillMount();
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="wrapper">
            <Header logout={logout} />
            <Route exact path="/"></Route>
            <ProtectedRoute exact path="/offre/new" component={ PostOffer } />
            <Route exact path="/login" component={Login}></Route>
            <LogedInRoute exact path="/register" component={Register}></LogedInRoute>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

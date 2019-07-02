import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import Header from './components/shared/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import * as actions from './actions'
import ProtectedRoute from './components/shared/auth/ProtectedRoute'
import LogedInRoute from './components/shared/auth/LogedInRoute'
import PostOffer from './components/offres/PostOffer';
import OfferList from './components/offres/offersListing/OfferList';
import offersDetails from './components/offres/offersDetails/offersDetails';
import HomeTabs from './components/shared/tabs/HomeTabs';
import Plans from './components/auth/Plans';
import Footer from './components/shared/Footer';
import AllOffers from './components/offres/AllOffers';
import Home from './components/shared/tabs/Home';

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
            <div className="wrapper">
              <Header logout={this.logout} />
              <Switch>
                <Route exact path="/" component={Home} ></Route>
                <Route exact path="/offers" component={AllOffers}></Route>
                <ProtectedRoute exact path="/offers/new" component={PostOffer} />
                <Route exact path="/offers/:id" component={offersDetails} />
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/plans" component={Plans}></Route>
                <LogedInRoute exact path="/register" component={Register}></LogedInRoute>
              </Switch>
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

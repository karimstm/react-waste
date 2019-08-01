import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import * as actions from './actions'
import PublicLayout from './components/PublicLayout';
import ProtectedLayout from './components/ProtectedLayout';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { LastLocationProvider } from "react-router-last-location";

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

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  }


  render() {
    return (
      <Provider store={store}>
        <Router basename="/">
          <LastLocationProvider>
            <div className="App">
              <Switch>
                <Route path="/app" render={() => <ProtectedLayout logout={this.logout} />} />
                <Route path="/" render={() => <PublicLayout logout={this.logout} />} />
              </Switch>
              <Widget
                subtitle=""
                handleNewUserMessage={this.handleNewUserMessage}
              />
            </div>
          </LastLocationProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;

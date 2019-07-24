import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './shared/auth/ProtectedRoute'
import LogedInRoute from './shared/auth/LogedInRoute'
import PostOffer from './offres/PostOffer';
import offersDetails from './offres/offersDetails/offersDetails';
import Plans from './auth/Plans';
import Footer from './shared/Footer';
import AllOffers from './offres/AllOffers';
import Home from './shared/tabs/Home';
import Header from './shared/Headers/Header';

function PublicLayout(props) {
    return (
        <div className="wrapper">
            <Header logout={props.logout} />
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
    );
}
export default PublicLayout;
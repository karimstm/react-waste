import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import authService from '../../../services/auth-service'

function LogedInRoute(props) {

    const { component: Component, ...rest } = props;

    return (
        <Route {...rest} render={(props) => authService.isAuthenticated()
            ? <Redirect to={{ pathname: '/' }} />
            : <Component {...props} {...rest} />} />
    );
}

export default LogedInRoute;
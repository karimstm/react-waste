import React from 'react';
import Dashboard from './Dashboard';
import { Route } from "react-router-dom";

function ProtectedLayout(props) {
    return (
        <div>
            <Route exact path='/app/dashboard' component={Dashboard} />
        </div>
    );
}

export default ProtectedLayout;
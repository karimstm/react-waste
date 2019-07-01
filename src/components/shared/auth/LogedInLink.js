import React from 'react';
import authService from '../../../services/auth-service';
import { Link } from 'react-router-dom';

function LogedInLink(props) {
    
    if (authService.isAuthenticated())
    {
        return <Link className="nav-link wast-link" to="/offers/new">{props.text}</Link>
    }
    return (<React.Fragment></React.Fragment>)
}
export default LogedInLink;
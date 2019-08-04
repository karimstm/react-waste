import React, { Component } from 'react';

class Error404 extends Component {
    render() {
        return (
            <div className="text-center align-middle">
                <h1 className="display-1 font-weight-bolder text-muted">404</h1>
                <p className="text-dark">Not Found</p>
            </div>
        );
    }
}

export default Error404;
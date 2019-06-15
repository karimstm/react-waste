import React, { Component } from 'react';

class Alert extends Component {

    render() {
        const { className, errors } = this.props;
        return (
            <div className={`alert alert-${className} font-weight-light alert-dismissible fade show`} role="alert">
                { 
                    errors.map((error, index) => <small key={index}>{error}</small>)     
                 }
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

export default Alert;
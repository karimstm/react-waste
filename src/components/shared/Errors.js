import React, { Component } from 'react';

class Errors extends Component {

    render() {
        const { className, errors } = this.props;
        return (
            <div className={`alert alert-${className} font-weight-light alert-dismissible fade show`} role="alert">
                { errors }
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

export default Errors;
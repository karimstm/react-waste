import React, { Component } from 'react';

class Errors extends Component {

    render() {
        const {errorClass, errors} = this.props;
        return (
            <div class={`alert alert-${errorClass} font-weight-light alert-dismissible fade show`} role="alert">
                {errors.message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

export default Errors;
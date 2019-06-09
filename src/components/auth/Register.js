import React, { Component } from 'react';
import RegisterForms from '../Forms/RegisterForms';
import * as actions from '../../actions'
import Errors from '../shared/Errors';

class Register extends Component {

    constructor() {
        super();
        
        this.state = {
            isError: false,
            errors: ''
        }
        this.registerUser = this.registerUser.bind(this);
    }
    
    registerUser(userData) {
        actions.register(userData).then(
            (registered) => {
                debugger;
            },
            (message) => {
                debugger ;
                this.setState({
                    isError: true,
                    errors: message
                })
            }
        )
    }
    render() {
        const { isError, errors } = this.state;
        alert(errors)
        return (
            <section className="login-container mx-auto p-5">
                { isError && <Errors errorClass="danger" errors={errors} /> }
                <RegisterForms submitCb={this.registerUser} />
            </section>
        );
    }
}

export default Register
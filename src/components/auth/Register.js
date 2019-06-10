import React, { Component } from 'react';
import RegisterForms from '../Forms/RegisterForms';
import * as actions from '../../actions'
import Errors from '../shared/Errors';
import { Redirect } from 'react-router-dom'

class Register extends Component {

    constructor() {
        super();

        this.state = {
            isError: false,
            errors: '',
            redirect: false
        }
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(userData) {
        actions.register(userData).then(
            (registered) => {this.setState({redirect : true})},
            (message) => { this.setState({ isError: true, errors: message })}
        )
    }
    render() {
        const { isError, errors, redirect } = this.state;
        if (redirect)
        {
            return <Redirect to={{ pathname: '/login', state: { className: true } }} />
        }
        return (
            <section className="login-container mx-auto p-5">
                {isError ? <Errors errorClass="danger" errors={errors} /> : ''}
                <RegisterForms submitCb={this.registerUser} />
            </section>
        );
    }
}

export default Register
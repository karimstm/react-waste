import React, { Component } from 'react';
import RegisterForms from '../Forms/RegisterForms';
import * as actions from '../../actions'
import { Redirect } from 'react-router-dom'
import Alert from '../shared/Alert';

class Register extends Component {

    constructor() {
        super();

        this.state = {
            isError: false,
            errors: [],
            redirect: false
        }
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(userData) {
        actions.register(userData).then(
            (registered) => {this.setState({redirect : true})},
            (errors) => this.setState({ isError: true, errors: errors})
        )
    }
    render() {
        const { isError, errors, redirect } = this.state;
        if (redirect)
        {
            return <Redirect to={{ pathname: '/login', state: { successRegister: true } }} />
        }
        return (
            <section className="login-container mx-auto p-5">
                {isError ? <Alert className="danger" errors={Object.values(errors)} /> : ''}
                <RegisterForms submitCb={this.registerUser} />
            </section>
        );
    }
}

export default Register
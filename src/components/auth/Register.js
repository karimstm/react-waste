import React, { Component } from 'react';
import RegisterForms from '../Forms/RegisterForms';
import * as actions from '../../actions'
import { Redirect } from 'react-router-dom'
import Alert from '../shared/Alert';
import { load as loadAccount } from '../../reducers/account';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errors: [],
            redirect: false,
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

        const { isError, errors, redirect, isClicked } = this.state;
        const data = {types: this.props.location.state.type};
        if (redirect)
        {
            return <Redirect to={{ pathname: '/login', state: { successRegister: true } }} />
        }
        return (
            <section className="login-container container-fluid mx-auto p-5 my-auto">
                {isError ? <Alert className="danger" errors={Object.values(errors)} /> : ''}
                <RegisterForms data={data} type={this.props.type} submitCb={this.registerUser} />
            </section>
        );
    }
}

export default Register
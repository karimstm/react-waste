import React, { Component } from 'react';
import Errors from '../shared/Errors';
import LoginForm from '../Forms/LoginForms';
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Login extends Component {

    constructor() {
        super();
        this.loginUser = this.loginUser.bind(this);
    }
    
    loginUser(userData) {
        this.props.dispatch(actions.login(userData));
    }

    render() {
        return (
            <section className="mx-auto p-5">
                <Errors />
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <LoginForm submitCb={this.loginUser} />
                    </div>
                    <div className="col-3"></div>
                </div>
            </section>

        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Login)
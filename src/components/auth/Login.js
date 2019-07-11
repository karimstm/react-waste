import React, { Component } from 'react';
import Alert from '../shared/Alert';
import LoginForm from '../Forms/LoginForms';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Redirect } from 'react-router-dom'
import Spinner from '../shared/Spinner';

class Login extends Component {

    constructor() {
        super();
        this.loginUser = this.loginUser.bind(this);
    }
    
    loginUser(userData) {
        this.props.dispatch(actions.login(userData));
    }

    render() {
        const { isAuth, errors } = this.props.auth;
        const { successRegister } = this.props.location.state || false;

        if (isAuth) {
            return <Redirect to={{ pathname: '/'}} />
        }
        return (
            <section className="p-5">
                { !isAuth && !(errors === 'undefined' || errors.length === 0) ? <Alert className="danger" errors={[errors]} /> : ''}
                { successRegister && <Alert className="success" errors={['Vous avez enregistré avec succès']}/>}
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <LoginForm submitCb={this.loginUser} />
                    </div>
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
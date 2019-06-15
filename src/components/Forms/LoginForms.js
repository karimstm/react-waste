import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../shared/Forms/input'
import { required, minLength6 } from './Validators'

const LoginForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid } = props

    return (
        <form className="login-form" onSubmit={handleSubmit(submitCb)}>
                <Field
                    type="email"
                    name="username"
                    className="form-control"
                    component={renderField}
                    id="email"
                    required
                    validate={[required]}
                    placeholder="Entez votre e-mail" />
                <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    component={renderField}
                    required
                    validate={[required, minLength6]}
                    placeholder="Mot de passe" />
            <div className="form-group form-check">
                <Field name="rememberMe" component="input" type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember">Se souvenir de moi</label>
            </div>
            <button type="submit" disabled={!valid || pristine || submitting} className="btn btn-warning text-white btn-block rounded-0 my-3">Connecter</button>
        </form>
    );
}

export default reduxForm({
    form: 'loginForm',
})(LoginForm)
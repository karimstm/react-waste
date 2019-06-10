import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../shared/Forms/input'

const RegisterForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid } = props

    return (
        <form className="login-form" onSubmit={handleSubmit(submitCb)} >
            <div className="row">
                <div className="col-6">
                    <Field
                        type="text"
                        name="lastName"
                        className="form-control"
                        component={renderField}
                        placeholder="Nom" />
                    <Field
                        type="text"
                        name="firstName"
                        className="form-control"
                        component={renderField}
                        placeholder="Prénom" />
                    <Field
                        type="email"
                        name="email"
                        className="form-control"
                        component={renderField}
                        id="email"
                        required
                        placeholder="Entez votre e-mail" />
                    <Field
                        type="text"
                        name="phone"
                        className="form-control"
                        component={renderField}
                        placeholder="Numéro de téléphone" />
                    <Field name="types" className="form-control" component="select">
                        <option value="collecteur">Collecteur</option>
                        <option value="acheteur">Acheteur</option>
                        <option value="revendeur">Revendeur</option>
                    </Field>
                </div>
                <div className="col-md-6">
                    <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        component={renderField}
                        placeholder="Mot de passe" required />
                    <Field
                        type="password"
                        id="newpassword"
                        name="passwordConfirmation"
                        className="form-control"
                        component={renderField}
                        placeholder="Confirmer Mot de passe" required />
                    <Field
                        type="text"
                        name="country"
                        className="form-control"
                        component={renderField}
                        placeholder="Pays" />

                    <Field
                        type="text"
                        name="city"
                        className="form-control"
                        component={renderField}
                        placeholder="Ville" />
                    <Field
                        className="form-control"
                        rows="3"
                        name="address"
                        component="textarea"
                        placeholder="Adresse" />
                </div>
                <button type="submit" disabled={!valid || pristine || submitting} className="btn btn-info btn-block rounded-0 my-3">Inscrire</button>
            </div>
        </form>
    )
}

const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = "S'il vous plaît entrer un email valide";
    }
    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = "S'il vous plait confirmer votre mote de pass";
    }
    if (values.password !== values.passwordConfirmation) {
        errors.password = "Le mot de passe ne correspond pas.";
    }
    if (!values.firstName)
        errors.firstName = "Entrez un nom";
    if (!values.lastName)
        errors.lastName = "Entrez un prenom";
    if (!values.phone || (values.phone && values.phone.length < 10))
        errors.phone = "Votre numéro de téléphone est invalide";
    if (!values.address)
        errors.address = "Entrez une address valid";
    if (!values.country)
        errors.country = "S'il vous plaît entrer un pays valide";
    if (!values.city)
        errors.city = "S'il vous plaît entrer une ville valide";
        
    return errors
}

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm)
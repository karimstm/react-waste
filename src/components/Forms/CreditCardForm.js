import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../shared/Forms/input';
import { InputGroup } from '../shared/Forms/inputGroup';

function CreditCardForm(props) {

    const { handleSubmit, pristine, reset, submitting, submitCb, valid } = props
    return (
        <form onSubmit={handleSubmit(submitCb)} >
            <Field
                type="text"
                label="Numéro de carte"
                icon={<i className="fas btext-primary fa-credit-card"></i>}
                name="cardNumber"
                className="form-control"
                component={InputGroup} />
            <div className="row my-3">
                <div className="col-6">
                    <Field
                        type="text"
                        label="Nom"
                        isIcon={false}
                        name="lastName"
                        className="form-control"
                        placeholder="Nom"
                        component={InputGroup} />
                </div>
                <div className="col-6">
                    <Field
                        type="text"
                        label="Prénom"
                        isIcon={false}
                        name="lastName"
                        className="form-control"
                        placeholder="Prénom"
                        component={InputGroup} />
                </div>
            </div>
            <div className="row my-3">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <Field
                                label="&nbsp;"
                                isIcon={false}
                                type="number"
                                name="expireYear"
                                className="form-control"
                                placeholder="YY"
                                component={InputGroup} />
                        </div>
                        <div className="col-6">
                            <Field
                                label="&nbsp;"
                                isIcon={false}
                                type="number"
                                name="expireMonth"
                                className="form-control"
                                placeholder="MM"
                                component={InputGroup} />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <Field
                        type="number"
                        label="Code de sécurité"
                        isIcon={false}
                        name="securityCode"
                        className="form-control"
                        placeholder="Code de sécurité"
                        component={InputGroup} />
                </div>
            </div>
            <Field
                type="number"
                label="Montant"
                isIcon={false}
                name="amount"
                className="form-control"
                placeholder="Montant"
                component={InputGroup} />
            <button type="submit" disabled={!valid || pristine || submitting} className="btn btn-warning btn-block text-white rounded-0 my-3">Continuer</button>
        </form>
    );
}

export default reduxForm({
    form: 'creditCardForm'
})(CreditCardForm)
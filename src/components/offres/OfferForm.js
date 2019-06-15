import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';


const createRenderer = render => ({ input, meta, label, placeholder, message, ...rest }) =>
    <div className="form-group">
        <label className="text-muted" htmlFor="title">{label}</label>
        {render(input, placeholder, rest)}
        <small className="form-text text-muted">{message}</small>
        {meta.touched && meta.error && <small className="form-text text-danger">{meta.error}</small>}
    </div>

const RenderInput = createRenderer((input, placeholder) =>
    <input className="form-control font-weight-light" {...input} placeholder={placeholder} />
)

const RenderSelect = createRenderer((input, label, { children }) =>
    <select className="form-control font-weight-light" {...input} >
        {children}
    </select>
)

const RenderTextArea = createRenderer((textarea, placeholder) =>
    <textarea rows="4" className="form-control font-weight-light"               {...textarea} placeholder={placeholder} >
    </textarea>
)


const OfferForm = props => {
    const {  handleSubmit, pristine, submitting, submitCb, valid, categories } = props
    return (
        <form onSubmit={handleSubmit(submitCb)}>
            <Field component={RenderInput} name="title" type="text" id="title" placeholder="Titre"
                label="Titre"
                message="Assurez-vous que le titre est descriptif" />
            <Field name="category" component={RenderSelect}
                label="Catégorie">
                {categories.map(category => <option value={category.id} key={category.id}>{category.label}</option>)}
            </Field>
            <Field name="description" label="Description" component={RenderTextArea} placeholder="Assurez-vous que la description est bien écrite" id="idDescription" className="form-control font-weight-light" rows="4"></Field>
            <div className="row">
                <div className="form-group col">
                    <Field name="price" label="Prix" component={RenderInput} type="number" className="form-control font-weight-light" placeholder="Prix" />
                </div>
                <div className="form-group col">
                    <Field name="weight" label="Poids en Kg" component={RenderInput} type="number" className="form-control font-weight-light" placeholder="Poids" />
                </div>
            </div>
            <div className="form-group form-check">
                <Field name="withTransport" component="input" className="text-muted font-weight-light" type="checkbox" className="form-check-input" id="withTransport" />
                <label className="form-check-label text-muted" htmlFor="withTransport">Avec transport</label>
            </div>
            <Field label="Emplacement" name="locations" component={RenderTextArea} placeholder="Emplacement séparés par une nouvelle ligne" id="idLocation" className="form-control font-weight-light" rows="2"></Field>
            <Field component={RenderInput} name="keywords" type="text" id="title" placeholder="Mot clé séparé par une virgule ,"
                label="Mot cle"
                message="Assurez-vous que le titre est descriptif" />
            
            <div className="form-group form-check">
                <Field name="isAccepted" component="input" className="text-muted font-weight-light" type="checkbox" className="form-check-input" id="idAcceptTerm" />
                <label className="form-check-label text-muted" htmlFor="idAcceptTerm">J'accepte les termes et conditions</label>
            </div>
            <button disabled={!valid || pristine || submitting} className="btn text-white btn-warning rounded-0">Submit</button>
        </form>
    );
}

const validate = values => {
    const errors = {}
    if (!values.title)
        errors.title = 'Ce champ ne doit pas être vide'

    return errors;
}
export default reduxForm({
    form: 'offerForm',
    validate
})(OfferForm)
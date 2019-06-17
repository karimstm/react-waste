import React, {useState} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import DropzoneField from '../dropzone/DropzoneField';


const createRenderer = render => ({ input, meta, label, placeholder, message, errors, ...rest }) => {
    console.log(input);
    var err;
    return (<div className="form-group">
        <label className="text-muted">{label}</label>
        {render(input, placeholder, rest)}
        <small className="form-text text-muted">{message}</small>
        {((meta.touched && (err = meta.error)) || (errors && (err = eval(`errors.${input.name}`)))) && <small className="form-text text-danger">{err}</small>}
    </div>)
}

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

    const { errors, handleSubmit, pristine, submitting, submitCb, valid, categories } = props
    const [imageFile, setImageFile] = useState([]);
    
    const handleOnDrop = newImageFile => setImageFile(newImageFile);

    return (
        <form onSubmit={handleSubmit(submitCb)}>
            <Field component={RenderInput} name="title" type="text" id="title" placeholder="Titre"
                label="Titre"
                errors={errors}
                message="Assurez-vous que le titre est descriptif" />
            <Field name="category" component={RenderSelect}
                label="Catégorie" errors={errors}>
                {categories.map(category => <option value={category.id} key={category.id}>{category.label}</option>)}
            </Field>
            <Field name="description" errors={errors} label="Description" component={RenderTextArea} placeholder="Assurez-vous que la description est bien écrite" id="idDescription" className="form-control font-weight-light" rows="4"></Field>
            <div className="row">
                <div className="form-group col">
                    <Field errors={errors} name="price" label="Prix" component={RenderInput} type="number" className="form-control font-weight-light" placeholder="Prix" />
                </div>
                <div className="form-group col">
                    <Field errors={errors} name="weight" label="Poids en Kg" component={RenderInput} type="number" className="form-control font-weight-light" placeholder="Poids" />
                </div>
            </div>
            <div className="form-group form-check">
                <Field errors={errors} name="withTransport" component="input" className="text-muted font-weight-light" type="checkbox" className="form-check-input" id="withTransport" />
                <label className="form-check-label text-muted" htmlFor="withTransport">Avec transport</label>
            </div>
            <Field errors={errors} label="Emplacement" name="locations" component={RenderTextArea} placeholder="Emplacement séparés par une nouvelle ligne" id="idLocation" className="form-control font-weight-light" rows="2"></Field>
            <Field errors={errors} component={RenderInput} name="keywords" type="text" id="title" placeholder="Mot clé séparé par une virgule ,"
                label="Mot cle"
                message="Assurez-vous que le titre est descriptif" />
            <div>
                <Field
                    name="imageToUpload"
                    component={DropzoneField}
                    imagefile={imageFile}
                    handleOnDrop={handleOnDrop}
                    type="file"
                />
            </div>
            <div className="form-group form-check">
                <Field name="isAccepted" component="input" className="text-muted font-weight-light" type="checkbox" className="form-check-input" id="idAcceptTerm" />
                <label className="form-check-label text-muted" htmlFor="idAcceptTerm">J'accepte les termes et conditions</label>
            </div>
            <button disabled={!valid || pristine || submitting} className="btn text-white btn-warning rounded-0">Submit</button>
        </form>
    );
}

const validate = values => {
    const errorMsg = 'Ce champ ne doit pas être vide';
    const errors = {}
    if (!values.title)
        errors.title = errorMsg;
    if (!values.category)
        errors.category = errorMsg;
    if (!values.description)
        errors.description = errorMsg;
    if (!values.price)
        errors.price = errorMsg;
    if (!values.weight)
        errors.weight = errorMsg;
    if (!values.locations)
        errors.locations = errorMsg;
    if (!values.keywords)
        errors.keywords = errorMsg;
    if (!values.isAccepted)
        errors.keywords = 'Vous devez accepter les termes et conditions avant de poster';

    return errors;
}
export default reduxForm({
    form: 'offerForm',
    validate
})(OfferForm)
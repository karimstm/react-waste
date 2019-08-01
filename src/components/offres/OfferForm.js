import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import DropzoneField from '../dropzone/DropzoneField';



const createRenderer = render => ({ input, meta, label, placeholder, message, readonly, errors, ...rest }) => {
    var err;
    return (<div className="form-group">
        <label className="text-muted">{label}</label>
        {render(input, placeholder,readonly, rest)}
        <small className="form-text text-muted">{message}</small>
        {((meta.touched && (err = meta.error)) || (errors && (err = errors[input.name]))) && <small className="form-text text-danger">{err}</small>}
    </div>)
}

const RenderInput = createRenderer((input, placeholder, readonly, rest) =>
{
    return <input className="form-control font-weight-light" {...input} placeholder={placeholder} disabled={readonly ? true : false} />
}
)

const RenderSelect = createRenderer((input, label, readonly, { children }) =>
    <select className="form-control font-weight-light" {...input} >
        {children}
    </select>
)

const RenderTextArea = createRenderer((textarea, placeholder, readonly) =>
    <textarea rows="4" className="form-control font-weight-light" {...textarea} placeholder={placeholder} >
    </textarea>
)

class OfferForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            imageFile: [],
        }
        this.optionRef = React.createRef();
    }

    handleOnDrop = newImageFile => {
        this.setState({
            imageFile: newImageFile
        });
    }

    periodsRender = () =>  {
        if(this.props.auction)
            return (
                <ul className="donate-now clearfix mb-2">
                    <li>
                        <Field id="a50" name="period" component="input" type="radio" value="0"/>
                        <label htmlFor="a50" >2 Jours</label>
                    </li>
                    <li>
                        <Field id="a51" name="period" component="input" type="radio" value="1"/>
                        <label htmlFor="a51">5 Jours</label>
                    </li>
                    <li>
                        <Field id="a52" name="period" component="input" type="radio" value="2"/>
                        <label htmlFor="a52">7 Jours </label>
                    </li>
                </ul>
            );
        return null;
    }
    
    componentDidMount() {
        this.props.initialize({isAuction: this.props.auction ? true : false});
    }
 
    render() {
        const { errors, handleSubmit, pristine, submitting, submitCb, valid , categories, auction } = this.props
        const { imageFile } = this.state;
        
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
                    <Field errors={errors} name="price" label="prix de départ par KG" component={RenderInput} type="number" className="form-control font-weight-light" placeholder="Prix" />
                </div>
                <div className="form-group col">
                    <Field errors={errors} name="weight" label="Poids en Kg" component={RenderInput} type="number" className="form-control font-weight-light" placeholder="Poids" />
                </div>
            </div>
            <Field label="Prix d'achat immédiat par KG (Prix final)" name="end_price" component={RenderInput} placeholder="Prix final " type="number" className="form-control font-weight-light" readonly={!auction} />
            <Field label="isAuction" name="isAuction" component="input" placeholder="is Auction" type="hidden" className="form-control font-weight-light" value={auction ? 'auction': 'not auction'}/>
            <div className="form-group form-check">
                <Field errors={errors} name="withTransport" component="input"  type="checkbox" className="text-muted font-weight-light form-check-input" id="withTransport" />
                <label className="form-check-label text-muted" htmlFor="withTransport">Avec transport</label>
            </div>
            <Field errors={errors} label="Emplacement" name="locations" component={RenderTextArea} placeholder="Emplacement séparés par une nouvelle ligne" id="idLocation" className="form-control font-weight-light" rows="2"></Field>
            <Field errors={errors} component={RenderInput} name="keywords" type="text" id="title" placeholder="Mot clé séparé par une virgule ,"
                label="Mot cle"
                message="Assurez-vous que le titre est descriptif" />
            { // show if this an auction
                this.periodsRender()
            }
            <div className="form-group">
                <Field
                        name="photos"
                        component={DropzoneField}
                        errors={errors}
                        imagefile={imageFile}
                        handleOnDrop={this.handleOnDrop}
                        type="file"
                />
            </div>
            <div className="form-group form-check">
                <Field name="isAccepted" component="input" className="text-muted font-weight-light form-check-input" type="checkbox" id="idAcceptTerm" />
                <label className="form-check-label text-muted" htmlFor="idAcceptTerm">J'accepte les termes et conditions</label>
            </div>
            <button 
            disabled={!valid || pristine || submitting}
            className="btn btn-submit text-white btn-warning rounded-0"
            >
            {
                submitting ? <React.Fragment><i className="fas fa-spin fa-spinner"></i> En progression</React.Fragment>  : "poster"
            }
            </button>
        </form>
    );
        }
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
        errors.isAccepted = 'Vous devez accepter les termes et conditions avant de poster';

    return errors;
}
export default reduxForm({
    form: 'offerForm',
    validate: validate,
    initialValues: { period: 0 }
})(OfferForm)

import React, { useState } from 'react';
import * as actions from '../../actions';


function ReviewForm(props) {
    const [feedbackValue, setFeedbackValue] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    function feedbackChange(e) {
        setFeedbackValue(e.target.value);
        console.log(e.target.value);
    }


    function submit(e) 
    {
        debugger ;
        e.preventDefault();
        actions.postFeedback(props.reciever, feedbackValue, 5)
        .then((message) => {
            setIsError(false);
            setMessage(message);
            setFeedbackValue('');
            alert('Vous avez posté avec succès vos commentaires');
        })
        .catch((err) => {
            setIsError(true);
            setMessage(err);
            alert('Probleme d\'effectuer cette opération')
        })
    }

    return (
        <React.Fragment>
            <p className="text-dark">Ajouter un avis</p>
            <form className="form-review">
                <div className="text-dark form-group">
                    <label className="text-muted font-weight-light" htmlFor="reviewField">Votre avis <small className="text-danger">*</small></label>
                    <textarea value={feedbackValue} onChange={feedbackChange} className="font-weight-light form-control" rows="8" id="reviewField" placeholder="Ajouter un avis">

                    </textarea>
                </div>
                <button onClick={submit} type="submit" className="btn btn-warning text-white">Envoyer</button>
            </form>
        </React.Fragment>
    );
}

export default ReviewForm;
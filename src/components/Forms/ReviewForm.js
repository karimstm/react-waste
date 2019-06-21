import React from 'react';

function ReviewForm(props) {
    return (
        <React.Fragment>
            <p className="text-dark">Ajouter un avis</p>
            <form className="form-review">
                <div className="text-dark form-group">
                    <label className="text-muted font-weight-light" htmlFor="reviewField">Votre avis <small className="text-danger">*</small></label>
                    <textarea className="font-weight-light form-control" rows="8" id="reviewField" placeholder="Ajouter un avis">

                    </textarea>
                </div>
                <button type="submit" class="btn btn-warning text-white">Envoyer</button>
            </form>
        </React.Fragment>
    );
}

export default ReviewForm;
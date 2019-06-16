import React from 'react';
import home from '../../../images/home.jpg'

String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1)  : this;
    };

function OfferCard(props) {

    const { id, title, description, price, pictures, owner: {lastName} } = props.offer;

    return (
        <a href={`offers/${id}`} className="card card-mine">
            <img className="card-img-top" src={home} />
            <div className="card-body card-body-mine">
                <div className="feedback">
                    <img src="https://i.imgur.com/VAs8kvi.png" />
                    <img src="https://i.imgur.com/VAs8kvi.png" />
                    <img src="https://i.imgur.com/VAs8kvi.png" />
                    <img src="https://i.imgur.com/VAs8kvi.png" />
                    <img src="https://i.imgur.com/VAs8kvi.png" />
                    <small className="text-info feedback-number">15</small>
                </div>
                <h6 className="card-title text-dark card-title-mine">{title}</h6>
                <div className="card-text text-muted font-weight-light">{ description.trunc(80) }...</div>
                <div className="card-text py-1">
                    <div className="row">
                        <small className="col-6 text-warning">{ price } MAD</small>
                        <small className="col-6 text-muted">Posted by { lastName }</small>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default OfferCard;
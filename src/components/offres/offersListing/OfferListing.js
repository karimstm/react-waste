import React, { Component } from 'react';
import OfferCard from './OfferCard';

class OfferListing extends Component {

    renderOffers = () => {
        return this.props.offers.map((offer, index) => {
            return (
                <div key={index} className="col-lg-3 col-md-6 col-sm-1 mb-4">
                    <OfferCard offer={offer} />
                </div>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.renderOffers()}
            </React.Fragment>
        );
    }
}

export default OfferListing;
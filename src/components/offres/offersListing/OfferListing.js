import React, { Component } from 'react';
import OfferCard from './OfferCard';

class OfferListing extends Component {

    
    renderOffers = () => {
        debugger ;
        return this.props.offers.map((offer, index) => {
            return (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                    <OfferCard offer={offer} />
                </div>
            )
        });
        debugger;
    }

    render() {
        return (
            <React.Component>
                {this.renderOffers()}
            </React.Component>
        );
    }
}

export default OfferListing;
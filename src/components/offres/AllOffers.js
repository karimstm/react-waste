import React, { Component } from 'react';
import OfferList from './offersListing/OfferList';
import { connect } from 'react-redux';
import HomeTabs from '../shared/tabs/HomeTabs';
import Filter from '../shared/Filter';

class AllOffers extends Component {
    render() {
        return (
            <div>
                <Filter />
                <HomeTabs/>
            </div>
        );
    }
}


export default AllOffers
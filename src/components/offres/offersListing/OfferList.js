import React, { Component } from 'react';
import OfferListing from './OfferListing';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class OfferList extends Component {

    componentWillMount() {
        this.props.dispatch(actions.fetchOffers());
    }

    render() {
        return (
            <section className="py-5 bg-white">
                <div className="container-fluid">
                    {/* Title */}
                        <h4 className="pb-3 big-title">Liste des offres Achat</h4>
                    {/* End Title */}
                    <div className="row">
                        <OfferListing offers={this.props.salesoffer} />
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        salesoffer: state.salesoffer.data
    }
}

export default connect(mapStateToProps)(OfferList);
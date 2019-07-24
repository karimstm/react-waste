import React, { Component } from 'react';

import OffersTable from './OffersTable';
import AuctionTable from './AuctionTable';
import { connect } from 'react-redux';
import { ROLE_RESELLER } from '../../actions/types';


class MyOffers extends Component {

    renderAuctionTable = () => {
        if (this.props.auth.role === ROLE_RESELLER)
        return (
            <div className="m-4">
                    <AuctionTable />
            </div>
        );
        return null;
    };

    render() {
        return(
            <div>
                { this.renderAuctionTable() }
                <div className="mx-4 my-5">   
                    <OffersTable />  
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(MyOffers);
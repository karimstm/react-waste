
import OfferList from '../../offres/offersListing/OfferList';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class HomeTabs extends Component {

    state = {
        isPurchase: true,
        isSale: false,
        isBulkPurchase: false,
        isAuction: false
    }

    showTab = (index) => {
        switch(index)
        {
            case 1:
                return this.setState({ isPurchase: true, isSale: false, isBulkPurchase: false, isAuction: false});
            case 2:
                return this.setState({ isPurchase: false, isSale: true, isBulkPurchase: false, isAuction: false})
            case 3:
                return this.setState({ isPurchase: false, isSale: false, isBulkPurchase: true, isAuction: false});
            default:
                return this.setState({ isPurchase: false, isSale: false, isBulkPurchase: false, isAuction: true})
        }
    }

    componentWillMount() {
        if (this.props.auth.isAuth)
        {
            switch(this.props.auth.role)
            {
                case 'ROLE_BUYER':
                    return this.showTab(4);
                case 'ROLE_RESELLER':
                    return this.showTab(4);
                default:
                    return null;
            }
        }
    }

    render() {

        const { isPurchase, isSale, isBulkPurchase, isAuction } = this.state;

        return (
            <React.Fragment>
                <section className="offers container-fluid py-4">
                    <nav>
                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <a onClick={() => this.showTab(1)} className={`nav-item text-black-50 nav-link ${isPurchase ? 'active' : ''}`} id="nav-achat-tab" data-toggle="tab" href="#nav-achat" role="tab" aria-controls="nav-achat" aria-selected={isPurchase}>Offre d'achat</a>
                            <a onClick={() => this.showTab(2)} className={`nav-item text-black-50 nav-link ${isSale ? 'active' : ''}`} id="nav-vent-tab" data-toggle="tab" href="#nav-vente" role="tab" aria-controls="nav-vente" aria-selected={isSale}>Offre de vente</a>
                            <a onClick={() => this.showTab(3)} className={`nav-item text-black-50 nav-link ${isBulkPurchase ? 'active' : ''}`} id="nav-gros-tab" data-toggle="tab" href="#nav-gros" role="tab" aria-controls="nav-gros" aria-selected={isBulkPurchase}>Offre d'achat Gros</a>
                            <a onClick={() => this.showTab(4)} className={`nav-item text-black-50 nav-link ${isAuction ? 'active' : ''}`} id="nav-auction-tab" data-toggle="tab" href="#nav-auction" role="tab" aria-controls="nav-auction" aria-selected={isAuction}>Enchère</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className={`tab-pane fade ${isPurchase ? 'show active' : ''}`} id="nav-achat" role="tabpanel" aria-labelledby="nav-achat-tab">
                            {isPurchase && <OfferList type="purchase" title="Liste des offres d'achat" />}
                        </div>
                        <div className={`tab-pane fade ${isSale ? 'show active' : ''}`} id="nav-vente" role="tabpanel" aria-labelledby="nav-vente-tab">
                            {isSale && <OfferList type="sale" title="Liste des offres Vente" />}
                        </div>
                        <div className={`tab-pane fade ${isBulkPurchase ? 'show active' : ''}`} id="nav-gros" role="tabpanel" aria-labelledby="nav-gros-tab">
                            {isBulkPurchase && <OfferList type="bulk_purchase" title="Liste des offres Achat Gros" />}
                        </div>
                        <div className={`tab-pane fade ${isAuction ? 'show active' : ''}`} id="nav-auction" role="tabpanel" aria-labelledby="nav-auction-tab">
                            {isAuction && <OfferList type="auction" title="Liste des Enchere" />}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}


const mapstateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapstateToProps)(HomeTabs);
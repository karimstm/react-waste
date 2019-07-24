import React, { useState } from 'react';
import OfferList from '../../offres/offersListing/OfferList';

function HomeTabs(props) {

    const [isPurchase, setIsPurchase] = useState(true);
    const [isSale, setIsSale] = useState(false);
    const [isBulkPurchase, setIsBulkPurchase] = useState(false);
    const [isAuction, setIsAuction] = useState(false);
    
    function showPurchases() {
        setIsPurchase(true);
        setIsSale(false);
        setIsBulkPurchase(false);
        setIsAuction(false);
    }

    function showSales() {
        setIsPurchase(false);
        setIsSale(true);
        setIsBulkPurchase(false);
        setIsAuction(false);
    }

    function showBulkPurchase() {
        setIsPurchase(false);
        setIsSale(false);
        setIsBulkPurchase(true);
        setIsAuction(false);
    }

    function showAuction() {
        setIsPurchase(false);
        setIsSale(false);
        setIsBulkPurchase(false);
        setIsAuction(true);
    }

    return (
        <React.Fragment>
            <section className="offers container-fluid py-4">
            <nav>
                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <a onClick={showPurchases} className="nav-item text-black-50 nav-link active" id="nav-achat-tab" data-toggle="tab" href="#nav-achat" role="tab" aria-controls="nav-achat" aria-selected="true">Offre d'achat</a>
                    <a onClick={showSales} className="nav-item text-black-50 nav-link" id="nav-vent-tab" data-toggle="tab" href="#nav-vente" role="tab" aria-controls="nav-vente" aria-selected="false">Offre de vente</a>
                    <a onClick={showBulkPurchase} className="nav-item text-black-50 nav-link" id="nav-gros-tab" data-toggle="tab" href="#nav-gros" role="tab" aria-controls="nav-gros" aria-selected="false">Offre d'achat Gros</a>
                    <a onClick={showAuction} className="nav-item text-black-50 nav-link" id="nav-auction-tab" data-toggle="tab" href="#nav-auction" role="tab" aria-controls="nav-auction" aria-selected="false">Enchère</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-achat" role="tabpanel" aria-labelledby="nav-achat-tab">
                    {isPurchase && <OfferList type="purchase" title="Liste des offres d'achat" />}
                </div>
                <div className="tab-pane fade" id="nav-vente" role="tabpanel" aria-labelledby="nav-vente-tab">
                    { isSale && <OfferList type="sale" title="Liste des offres Vente" />}
                </div>
                <div className="tab-pane fade" id="nav-gros" role="tabpanel" aria-labelledby="nav-gros-tab">
                    {isBulkPurchase && <OfferList type="bulk_purchase" title="Liste des offres Achat Gros" />}
                </div>
                <div className="tab-pane fade" id="nav-auction" role="tabpanel" aria-labelledby="nav-auction-tab">
                    {isAuction && <OfferList type="auction" title="Liste des Enchere" />}
                </div>
            </div>
        </section>
        </React.Fragment>
    );
}
export default HomeTabs;
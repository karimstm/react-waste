import React from 'react';

function HomeTabs(props) {
    return (
        <section className=" container-fluid py-4">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item text-black-50 nav-link active" id="nav-achat-tab" data-toggle="tab" href="#nav-achat" role="tab" aria-controls="nav-achat" aria-selected="true">Offer d'achat</a>
                    <a className="nav-item text-black-50 nav-link" id="nav-vent-tab" data-toggle="tab" href="#nav-vente" role="tab" aria-controls="nav-vente" aria-selected="false">Offer de vente</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-achat" role="tabpanel" aria-labelledby="nav-achat-tab">...</div>
                <div className="tab-pane fade" id="nav-vente" role="tabpanel" aria-labelledby="nav-vente-tab">...</div>
            </div>
        </section>
    );
}
export default HomeTabs;
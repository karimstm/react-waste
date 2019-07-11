import React from 'react';
import ReviewForm from '../../Forms/ReviewForm';
import ReviewCard from '../../shared/Reviews/ReviewCard';



function OfferDetailsTabs(props) {
    const { data } = props;
    return (
        <section className="info-section">
            <div className="container-fluid">
                <nav>
                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a className="nav-item text-muted nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Description</a>
                        <a className="nav-item text-muted nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Plus Info</a>
                        <a className="nav-item text-muted nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Avis</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="py-3 tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        {data.description}
                    </div>
                    <div className="py-3 tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                    </div>
                    <div className="py-3 tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <div className="row mx-2">
                            <div className="col col-12">
                                <ReviewCard email={data.owner.email} />
                            </div>
                            <div className="col col-12 py-4">
                                <ReviewForm reciever={data.owner.email} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OfferDetailsTabs;
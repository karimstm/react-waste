import React, { Component } from 'react';
import ReviewForm from '../../Forms/ReviewForm';
import ReviewCard from '../../shared/Reviews/ReviewCard';
import * as actions from '../../../actions/index';
import { connect } from 'react-redux';
import * as moment from 'moment';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";



moment.locale('fr');

class offersDetails extends Component {

    divRef;
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchOfferById(this.props.match.params.id));
    }

    render() {

        const { offerDetails } = this.props;

        if (offerDetails && offerDetails.id) {
            const locationLength = offerDetails.locations.length;
            return (
                <React.Fragment>
                    <section className="pt-5 bg-white">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-10">
                                    <ImageGallery showPlayButton={false} showFullscreenButton={false} items={offerDetails.photos} />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-10">
                                    <h3 className="text-dark">{offerDetails.title}</h3>
                                    <h5 className="py-3 text-warning">MAD {offerDetails.price}</h5>
                                    <ul className="list-group">
                                        <li className="list-group-item font-weight-lighter text-muted rounded-0 d-flex justify-content-between dashed-border align-items-center">
                                            Poids
                                <small className="text-info">{offerDetails.weight} KG</small>
                                        </li>
                                        <li className="list-group-item rounded-0 d-flex font-weight-lighter text-muted justify-content-between dashed-border align-items-center">
                                            Avec trasporct ?
                                    <small className=" text-info">{offerDetails.isTransport ? 'OUI' : 'NON'}</small>
                                        </li>
                                        <li className="list-group-item rounded-0 dashed-border font-weight-lighter text-muted align-items-center">
                                            <div className="row">
                                                <div className="col col-6 d-flex">Owner</div>
                                                <div className="col col-6 d-flex justify-content-end">
                                                    <small className="text-info">{offerDetails.owner.lastName.toUpperCase()}</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item rounded-0 dashed-border font-weight-lighter text-muted align-items-center">
                                            <div className="row">
                                                <div className="col col-6 d-flex">Emplacement</div>
                                                <div className="col col-6 d-flex justify-content-end">
                                                    <small className="text-info">{
                                                        offerDetails.locations.map((value, index) => {
                                                            return `${value} ${locationLength != index + 1 ? ', ' : ''}`
                                                        })
                                                    }</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item rounded-0 dashed-border font-weight-lighter text-muted align-items-center">
                                            <div className="row">
                                                <div className="col col-6 d-flex">Date Fin</div>
                                                <div className="col col-6 d-flex justify-content-end">
                                                    <small className="text-info">{moment(offerDetails.end_date).format('LL')}</small>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="row mt-5">
                                        <div className="col col-6">
                                            <button type="button" className="btn btn-block btn-warning text-light rounded-0">Accepter l'offer</button>
                                        </div>
                                        <div className="col col-6">
                                            <button type="button" className="btn btn-block btn-outline-danger rounded-0">Ajouter au Wishlist</button>
                                        </div>
                                    </div>
                                    <div className="mt-3 font-weight-light">Categories:
                                    <a className="p-2 text-muted" href="/">{offerDetails.category.label}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
                                    Bacon ipsum dolor amet pork chop short ribs beef pancetta bresaola bacon. Pork corned beef rump jowl, ball tip landjaeger pancetta spare ribs sausage ground round chicken tail. Cupim shoulder meatloaf pastrami pancetta t-bone frankfurter flank. Capicola ham hock jowl, rump strip steak shankle landjaeger.
                        </div>
                                <div className="py-3 tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    Bacon ipsum dolor amet pork chop short ribs beef pancetta bresaola bacon. Pork corned beef rump jowl, ball tip landjaeger pancetta spare ribs sausage ground round chicken tail. Cupim shoulder meatloaf pastrami pancetta t-bone frankfurter flank. Capicola ham hock jowl, rump strip steak shankle landjaeger.
                        </div>
                                <div className="py-3 tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <div className="row mx-2">
                                        <div className="col col-12 col-lg-6 col-md-10 col-sm-10">
                                            <ReviewCard />
                                        </div>
                                        <div className="col col-12 col-lg-6 col-md-10 col-sm-10 py-4">
                                            <ReviewForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <script>

                    </script>
                </React.Fragment>
            );
        } else {
            return <h1>Loading... </h1>
        }
    }
}


function mapStateToProps(state) {
    return {
        offerDetails: state.offerDetails.data
    }
}

export default connect(mapStateToProps)(offersDetails);
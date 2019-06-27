import React, { Component } from 'react';
import ReviewForm from '../../Forms/ReviewForm';
import ReviewCard from '../../shared/Reviews/ReviewCard';
import * as actions from '../../../actions/index';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Spinner from '../../shared/Spinner';
import 'moment/locale/fr';
import Model from '../../shared/Model/Model';
import Alert from '../../shared/Alert';
import { Redirect } from 'react-router-dom';
import SimpleOfferDetails from './SimpleOfferDetails';
import BidingOfferDetails from './BidingOfferDetails';
import { type } from 'os';


class offersDetails extends Component {

    state = {
        isAccepted: false,
        isError: false,
        errMessage: ''
    }
    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(actions.fetchOfferById(id));
    }



    handleAccept = () => {
        const { id } = this.props.match.params;
        actions.acceptAnOffer(id)
            .then(() => this.setState({ isAccepted: true }))
            .catch(err => this.setState({ isError: true, errMessage: err }))
    }

    render() {

        const { offerDetails } = this.props;
        const { errMessage, isError, isAccepted } = this.state;
        const { success } = this.props.location.state || false;

        if ( isAccepted )
        {
            const { id } = this.props.match.params;
            this.setState({isAccepted: false});
            return <Redirect to={{ pathname: `/offers/${id}`, state: { success: true } }} />
        }
        if (offerDetails && offerDetails.id) {
            return (
                <React.Fragment>
                    <section className="pt-5 bg-white">
                        <div className="container-fluid">
                            {
                                (isError || success) && <Alert
                                    className={isError ? "danger" : "success"}
                                    errors={ isError ? [errMessage] : ['Vous avez acheté cette offre avec succès']}
                                />
                            }
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-10">
                                    <ImageGallery showPlayButton={false} showFullscreenButton={false} items={offerDetails.photos} />
                                </div>
                                {
                                    offerDetails.type === 'auction' ? <BidingOfferDetails offerDetails={offerDetails} /> : <SimpleOfferDetails offerDetails={offerDetails} /> 
                                }  
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
                        <Model
                            title="Alert"
                            text="Voulez-vous vraiment continuer ce processus, il est irréversible."
                            handleAccept={this.handleAccept}
                        />
                    </section>
                </React.Fragment>
            );
        } else {
            return (
                <Spinner />
            );
        }
    }
}


function mapStateToProps(state) {
    return {
        offerDetails: state.offerDetails.data
    }
}

export default connect(mapStateToProps)(offersDetails);
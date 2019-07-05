import React, { Component } from 'react';
import * as actions from '../../../actions/index';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Spinner from '../../shared/Spinner';
import 'moment/locale/fr';
import Alert from '../../shared/Alert';
import { Redirect } from 'react-router-dom';
import SimpleOfferDetails from './SimpleOfferDetails';
import BidingOfferDetails from './BidingOfferDetails';
import OfferDetailsTabs from './OfferDetailsTabs';


class offersDetails extends Component {

    state = {
        isAccepted: false,
        isError: false,
        errMessage: '',
        offerDetails: []
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(actions.fetchOfferById(id));
    }

    handleAccept = (offerWeight) => {
        return new Promise((resolve) => {
            const { id } = this.props.match.params;
            actions.acceptAnOffer(id, offerWeight)
            .then(() => this.setState({ isAccepted: true }))
            .catch(err => this.setState({ isError: true, errMessage: err }))
            resolve(false);
        })
    }

    //This will be invoked if a child state changed
    shouldChangeState = (flag, id) =>
    {
        if (flag)
            this.props.dispatch(actions.fetchOfferById(id));
    }

    render() {

        const tmpImage = [{"original": 'https://i.imgur.com/lBTPbQ9.png', "thumbnail": 'https://i.imgur.com/lBTPbQ9.png?1'}]
        const { offerDetails } = this.props;
        const { errMessage, isError, isAccepted } = this.state;
        const { success } = this.props.location.state || false;
        if (isAccepted) {
            debugger ;
            const { id } = this.props.match.params;
            this.setState({ isAccepted: false });
            return <Redirect to={{ pathname: `/offers/${id}`, state: { success: true } }} />
        }
        if (offerDetails && offerDetails.id) {
            const photos = offerDetails.photos.length > 0 ? offerDetails.photos : tmpImage;
            return (
                <React.Fragment>
                    <section className="pt-5 bg-white">
                        <div className="container-fluid">
                            {
                                (isError || success) && <Alert
                                    className={isError ? "danger" : "success"}
                                    errors={isError ? [errMessage] : ['Vous avez acheté cette offre avec succès']}
                                />
                            }
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-6 col-sm-10">
                                    <ImageGallery showPlayButton={false} showFullscreenButton={false} items={photos} />
                                    <OfferDetailsTabs data={offerDetails} />
                                </div>
                                {
                                    offerDetails.type === 'auction' ? <BidingOfferDetails shouldChangeState={this.shouldChangeState} offerDetails={offerDetails} /> : <SimpleOfferDetails handleAccept={this.handleAccept} offerDetails={offerDetails} />
                                }
                            </div>
                        </div>
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
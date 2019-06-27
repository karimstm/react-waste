import React, { Component } from 'react';
import Timer from '../../shared/timer/Timer';
import Countdown from 'react-countdown-now';

class BidingOfferDetails extends Component {
    render() {

        const { offerDetails } = this.props;
        const locationLength = offerDetails.locations.length;
        return (
            <div className="col-lg-6 col-md-6 col-sm-10">
                <div>
                    <div className="row text-black-50">
                        <div className="col-lg-8 col-md-6">
                            <h5 className="font-weight-light">{offerDetails.title}</h5>
                            <small>25 bids</small>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <Countdown
                                date={offerDetails.end_date}
                                renderer={(props) => <Timer {...props} />}
                            />
                        </div>
                    </div>
                    <div className="row text-black-50 my-2">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <span className="d-block py-1 font-weight-light">Prix final</span>
                            <span className="biding-numbers text-dark">245,98.00 DH</span>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                            <span className="d-block py-1 font-weight-light">Offre actuelle</span>
                            <span className="biding-numbers text-dark">2,498.00 DH</span>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-6">
                            <input type="number" class="form-control rounded-0 text-dark-50 font-weight-light" placeholder="Votre enchère" />
                        </div>
                        <div className="col-6">
                            <button className="btn-block btn btn-warning text-white rounded-0"> J'enchéris !</button>
                        </div>
                    </div>
                    <div>
                        <table class="table table-sm table-borderless biding-table">
                            <tbody>
                                <tr>
                                    <td>Poids</td>
                                    <td className="text-right text-muted">{offerDetails.weight}</td>
                                </tr>
                                <tr>
                                    <td>Avec trasporct ?</td>
                                    <td className="text-right text-muted">{offerDetails.isTransport ? 'OUI' : 'NON'}</td>
                                </tr>
                                <tr>
                                    <td>Propriétaire</td>
                                    <td className="text-right text-muted">{offerDetails.owner.lastName.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td>Emplacement</td>
                                    <td className="text-right text-muted">{
                                        offerDetails.locations.map((value, index) => {
                                            return `${value} ${locationLength !== index + 1 ? ', ' : ''}`
                                        })
                                    }</td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td className="text-right text-muted">{offerDetails.category.label}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Bidder's names */}
                <div className="my-2">
                    
                </div>
            </div>
        );
    }
}

export default BidingOfferDetails;
import React, { Component } from 'react';
import Timer from '../../shared/timer/Timer';
import Alert from '../../shared/Alert';
import Countdown from 'react-countdown-now';
import HistoryCard from '../../shared/HistoryCard/HistoryCard';
import * as actions from '../../../actions';
import Modelv2 from '../../shared/Model/Modelv2';
import $ from 'jquery';
class BidingOfferDetails extends Component {

    state = {
        bid_price: '',
        isAccepted: false,
        isError: false,
        isFatal: false,
        msgError: '',
        show: false,
        biders: this.props.offerDetails.bids
    }

    // get the current bid
    getTheCurrentBid = () => {
        const { bids } = this.props.offerDetails;
        return bids.length > 0 ? bids[bids.length - 1].price : 0
    }

    // Chnage the value of the input on every change and set the state
    changeBidding = (event) => {
        const {
            bids, price, weight
        } = this.props.offerDetails;
        this.setState({
                bid_price: event.target.value
            },
            () => {
                const lastBidPrice = bids.length > 0 ? bids[bids.length - 1].price : price * weight;
                if (this.state.bid_price <= lastBidPrice)
                    this.setState({
                        isError: true,
                        msgError: `Votre mise minimum doit-être supérieure à ${lastBidPrice}`
                    })
                else
                    this.setState({
                        isError : false,
                        msgError: ''
                    });
            });
    }

    // Send data to the server once we click on Place Bid button
    placeBid = () => {
        actions.acceptBid(this.props.offerDetails.id, this.state.bid_price)
            .then((res) => {
                this.setState({
                    isAccepted: true,
                    show: false,
                    biders: this.state.biders.concat([{"price": this.state.bid_price, bidder: {lastName : "You"}}])
                })
            })
            .catch((err) => {
                this.setState({
                    isFatal: true,
                    msgError: err,
                    show: false
                })
            });
    }


    render() {

        const { offerDetails } = this.props;
        const {isFatal, msgError, biders } = this.state
        const locationLength = offerDetails.locations.length;
        return (   
            <div className="col-lg-6 col-md-6 col-sm-10">
            {isFatal ? <Alert className="danger" errors={[msgError]} /> : ''}
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
                            <span className="biding-numbers text-dark">{offerDetails.end_price ? offerDetails.end_price : '*'}.00 DH</span>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                            <span className="d-block py-1 font-weight-light">Offre actuelle</span>
                            <span className="biding-numbers text-dark">{this.getTheCurrentBid()}.00 DH</span>
                        </div>
                    </div>
                    
                    <div className="row my-3">
                        <div className="col-6">
                            <input onChange={this.changeBidding} value={this.state.bid_price} name="bid_price" type="number" className={`form-control rounded-0 text-dark-50 font-weight-light ${this.state.isError ? 'is-invalid' : ''}`} placeholder="Votre enchère" />             
                            <div className="invalid-feedback">
                                { this.state.msgError }
                            </div>
                        </div>
                        <div className="col-6">
                        {/* data-toggle="modal" data-target="#bid_model" */}
                            <button onClick={() => {
                                this.setState({show: true})
                            }} className="btn-block btn btn-warning text-white rounded-0"> J'enchéris !</button>
                        </div>
                    </div>
                    <div>
                        <table className="table table-sm table-borderless biding-table">
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
                <HistoryCard data={biders} />
                <Modelv2 
                show={this.state.show}
                onConfirm={this.placeBid}
                handleClose={() => this.setState({show: false})}
                title="Bienvenue, à vous de jouer !"
                text="Voulez-vous vraiment continuer ce processus, il est irréversible."
                confirmText="JE CONFIRME MON ENCHÈRE"
                  />
            </div>
        );
    }
}

export default BidingOfferDetails;
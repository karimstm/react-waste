import React, { Component } from 'react';
import Timer from '../../shared/timer/Timer';
import Alert from '../../shared/Alert';
import Countdown from 'react-countdown-now';
import HistoryCard from '../../shared/HistoryCard/HistoryCard';
import * as actions from '../../../actions';
import { fetchCurrentUserInfo } from '../../../actions';
import Modelv2 from '../../shared/Model/Modelv2';
import { connect } from 'react-redux';
import Position from '../../shared/Position';
import { DEFALUT_URL_HUB } from '../../../actions/types';
import { withRouter } from 'react-router-dom';


class BidingOfferDetails extends Component {

    state = {
        bid_price: this.props.offerDetails.next_bid,
        top_price: this.props.offerDetails.top_price,
        isAccepted: false,
        isError: false,
        isFatal: false,
        msgError: '',
        msg: '',
        show: false,
        bidders: this.props.offerDetails.bids
    }


    // Chnage the value of the input on every change and set the state
    changeBidding = (event) => {
        const {
            top_price
        } = this.props.offerDetails;
        this.setState({
            bid_price: event.target.value
        },
            () => {
                const lastBidPrice = top_price;
                if (this.state.bid_price <= lastBidPrice)
                    this.setState({
                        isError: true,
                        isFatal: false,
                        msgError: `Votre mise minimum doit-être supérieure à ${lastBidPrice}`
                    })
                else
                    this.setState({
                        isFatal: false,
                        isError: false,
                        msgError: ''
                    });
            });
    }

    //Show the modal if the user is authenticated

    showModal = () => {
        if (this.props.auth.isAuth)
            return this.setState({ show: true });
        return this.props.history.push('/login');
    }

    // Send data to the server once we click on Place Bid button
    placeBid = () => {
        actions.acceptBid(this.props.offerDetails.id, this.state.bid_price)
            .then((res) => {
                this.setState({
                    isAccepted: true,
                    show: false,
                    msg: 'Vous avez placé une enchère avec succès'
                })
                // this.props.shouldChangeState(true, this.props.offerDetails.id)
            })
            .catch((err) => {
                this.setState({
                    isFatal: true,
                    msgError: err,
                    show: false
                })
            });
    }

    // Leaving the auction
    leaveAuction = () => 
    {
        const { id } = this.props.offerDetails;
        return new Promise((resolve, reject) => {
            actions.leaveAuction(id)
            .then((data) => {
                this.setState({
                    isAccepted: true,
                    isError: false,
                    msg: 'Vous avez quitté cette offre avec succès'});
                resolve(data);
                // this.props.shouldChangeState(true, id);
            })
            .catch((err) => {
                this.setState({
                    isAccepted: false,
                    isFatal: true,
                    isError: false,
                    errMsg: err});
                reject(err);
            })
        })
        
    }

    setUpMercure = () => {
        const { offerDetails } = this.props;
        const url = new URL(`${DEFALUT_URL_HUB}/hub`)
        url.searchParams.append('topic', `waste_to_resources/offers/${offerDetails.id}`)
        const eventSource = new EventSource(url);

        eventSource.onmessage = e => {
            var result = JSON.parse(e.data);

            this.setState({
                bid_price: result.next_bid,
                top_price: result.price,
                bidders: [{ "price": result.price, bidder: { lastName: result.last_name, email: result.email }}].concat(this.state.bidders)
            });
        };

        eventSource.onerror = () => {
            console.log('EventSource Failed');
        };
    };

    componentDidMount()
    {
        if (this.props.auth.isAuth)
        {
            this.props.fetchCurrentUserInfo();
            this.setUpMercure();
            this.setState({
                isAccepted: false,
                isError: false,
                isFatal: false        
            })
        }
    }

    render() {

        const { offerDetails, userInfo } = this.props;
        const { isFatal, msgError, bidders, isAccepted, msg } = this.state
        const locationLength = offerDetails.locations.length;
        return (
            <div className="col-lg-6 col-md-6 col-sm-10">
                {isFatal ? <Alert className="danger" errors={[msgError]} /> : ''}
                {isAccepted ? <Alert className="success" errors={[msg]} /> : ''}                
                <div>
                    <div className="row text-black-50">
                        <div className="col-lg-8 col-md-6">
                            <h5 className="font-weight-light">{offerDetails.title}</h5>
                            <small>{offerDetails.bids.length} bids</small>
                            <small className="text-danger d-block"> +{offerDetails.fees} DH de frais </small>
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
                            <span className="d-block py-1 font-weight-light">Offre actuelle</span>
                            <span className="biding-numbers text-dark">{this.state.top_price}.00 DH</span>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                            <span className="d-block py-1 font-weight-light">Prix final</span>
                            <span className="biding-numbers text-dark">{offerDetails.end_price ? offerDetails.end_price * offerDetails.weight : '*'}.00 DH</span>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-6">
                            <input onChange={this.changeBidding} value={this.state.bid_price} name="bid_price" type="number" className={`form-control rounded-0 text-dark-50 font-weight-light ${this.state.isError ? 'is-invalid' : ''}`} placeholder="Votre enchère" />
                            <div className="invalid-feedback">
                                {this.state.msgError}
                            </div>
                        </div>
                        <div className="col-6">
                            {/* data-toggle="modal" data-target="#bid_model" */}
                            <button onClick={this.showModal}
                            className="btn-block btn btn-warning text-white rounded-0"> J'enchéris !</button>
                        </div>
                    </div>
                    <div>
                        <table className="table table-sm table-borderless biding-table">
                            <tbody>
                                {
                                    userInfo && <Position
                                    id = {offerDetails.id}
                                    leaveAuction = {this.leaveAuction}
                                    userInfo={userInfo}
                                    bidders={this.state.bidders}
                                />
                                }
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
                <HistoryCard data={bidders} />
                <Modelv2
                    show={this.state.show}
                    onConfirm={this.placeBid}
                    handleClose={() => this.setState({ show: false })}
                    title="Bienvenue, à vous de jouer !"
                    text="Voulez-vous vraiment continuer ce processus, il est irréversible."
                    confirmText="JE CONFIRME MON ENCHÈRE"
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        userInfo: state.userInfo.data
    }
}

export default withRouter(connect(mapStateToProps, { fetchCurrentUserInfo })(BidingOfferDetails));
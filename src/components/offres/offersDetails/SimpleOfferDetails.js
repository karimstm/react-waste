import React, { Component } from 'react';
import * as moment from 'moment';
import offerService from '../../../services/offer-service';
import Modelv2 from '../../shared/Model/Modelv2';


class SimpleOfferDetails extends Component {

    state = {
        show: false
    }
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getLocalDate = (date) => {
        moment.locale('fr');
        return moment(date).format('LL');
    }

    getRealType = (type) => {
        switch (type) {
            case 'sale':
                return 'Vente';
            case 'purchase':
                return 'Achat';
            case 'bulk_purchase':
                return 'Achat Gros';
            case 'auction':
                return 'Enchère';
            default:
                return;
        }
    }

    render() {

        const { offerDetails } = this.props;
        const locationLength = offerDetails.locations.length;

        if (offerDetails && offerDetails.id) {
            const locationLength = offerDetails.locations.length;
            return (
                <div className="col-lg-6 col-md-6 col-sm-10">
                    <h3 className="text-dark">{offerDetails.title}</h3>
                    <h5 className="py-3 text-danger">MAD {this.numberWithCommas(offerDetails.price * offerDetails.weight)}.00</h5>
                    <ul className="list-group">
                        <li className="py-1 list-group-item font-weight-lighter text-dark rounded-0 d-flex justify-content-between dashed-border align-items-center">
                            Poids
        <small className="text-black-50">{offerDetails.weight} KG</small>
                        </li>
                        <li className="py-1 list-group-item rounded-0 d-flex font-weight-lighter text-dark justify-content-between dashed-border align-items-center">
                            Avec trasporct ?
            <small className="text-black-50">{offerDetails.isTransport ? 'OUI' : 'NON'}</small>
                        </li>
                        <li className="py-1 list-group-item rounded-0 d-flex font-weight-lighter text-dark justify-content-between dashed-border align-items-center">
                            Prix (KG)
                    <small className=" text-black-50">{offerDetails.price}</small>
                        </li>
                        <li className="py-1 list-group-item rounded-0 dashed-border font-weight-lighter text-dark align-items-center">
                            <div className="row">
                                <div className="col col-6 d-flex">Owner</div>
                                <div className="col col-6 d-flex justify-content-end">
                                    <small className="text-black-50">{offerDetails.owner.lastName.toUpperCase()}</small>
                                </div>
                            </div>
                        </li>
                        <li className="py-1 list-group-item rounded-0 dashed-border font-weight-lighter text-dark align-items-center">
                            <div className="row">
                                <div className="col col-6 d-flex">Type d'offer</div>
                                <div className="col col-6 d-flex justify-content-end">
                                    <small className="text-black-50">{this.getRealType(offerDetails.type)}</small>
                                </div>
                            </div>
                        </li>
                        <li className="py-1 list-group-item rounded-0 dashed-border font-weight-lighter text-dark align-items-center">
                            <div className="row">
                                <div className="col col-6 d-flex">Emplacement</div>
                                <div className="col col-6 d-flex justify-content-end">
                                    <small className="text-black-50">{
                                        offerDetails.locations.map((value, index) => {
                                            return `${value} ${locationLength !== index + 1 ? ', ' : ''}`
                                        })
                                    }</small>
                                </div>
                            </div>
                        </li>
                        <li className="py-1 list-group-item rounded-0 dashed-border font-weight-lighter text-dark align-items-center">
                            <div className="row">
                                <div className="col col-6 d-flex">Date Fin</div>
                                <div className="col col-6 d-flex justify-content-end">
                                    <small className="text-black-50">{this.getLocalDate(offerDetails.end_date)}</small>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="row mt-5">
                        <div className="col col-6">
                            <button onClick={() => this.setState({show: true})} type="button" className="btn btn-block btn-warning text-light rounded-0" disabled={(!offerService.isAllowedToAccept(offerDetails.type) || !offerDetails.is_active) && 'disabled'}>Accepter l'offer</button>
                        </div>
                        <div className="col col-6">
                            <button type="button" className="btn btn-block btn-outline-danger rounded-0">Ajouter au Wishlist</button>
                        </div>
                    </div>
                    <div className="mt-3 font-weight-light">Categories:
            <a className="p-2 text-muted" href="/">{offerDetails.category.label}</a>
                    </div>
                    <Modelv2
                        show={this.state.show}
                        onConfirm={() => {
                            this.props.handleAccept().then((value) => {
                                this.setState({show: value})
                            })
                        }}
                        handleClose={() => this.setState({ show: false })}
                        title="Bienvenue, à vous de jouer !"
                        text="Voulez-vous vraiment continuer ce processus, il est irréversible."
                        confirmText="Confirmer l'achat"
                    />
                </div>
            );
        }
    }
}
export default SimpleOfferDetails;
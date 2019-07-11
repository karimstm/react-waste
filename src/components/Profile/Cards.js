import React, { Component } from 'react';

class Cards extends Component {
    render() {
        return (
            <section>
                <div className="container-fluid">
                    <div className="row mt-5">
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-1">
                            <div className="card green-card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="font-weight-light card-title">15.400 MAD</h5>
                                            <span>tous les revenus</span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="far fa-3x fa-money-bill-alt"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    2 days ago
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-1">
                            <div className="card red-card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="font-weight-light card-title">145</h5>
                                            <span>tous les Achat</span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="fas fa-3x fa-shopping-basket"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    2 days ago
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-1">
                            <div className="card info-card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="font-weight-light card-title">500 MAD</h5>
                                            <span>En attente </span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="fas fa-3x fa-shopping-basket"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    2 days ago
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-1">
                            <div className="card orange-card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="font-weight-light card-title">50,000 MAD</h5>
                                            <span>Mon solde </span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="fas fa-3x fa-shopping-basket"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    2 days ago
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        );
    }
}

export default Cards;
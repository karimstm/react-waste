import React, { Component } from 'react';

class offersDetails extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="pt-5 bg-white">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-10">
                                <div className="flexslider">
                                    <ul className="slides">
                                        <li data-thumb="http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg">
                                            <img alt='' src="http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg" />
                                        </li>
                                        <li data-thumb="http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg">
                                            <img alt='' src="http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg" />
                                        </li>
                                        <li data-thumb="http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg">
                                            <img alt='' src="http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg" />
                                        </li>
                                        <li data-thumb="http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg">
                                            <img alt='' src="http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-10">
                                <h3 className="text-dark">Panton tunior chair</h3>
                                <h5 className="py-3 text-warning">MAD 125</h5>
                                <ul className="list-group">
                                    <li className="list-group-item font-weight-lighter text-muted rounded-0 d-flex justify-content-between dashed-border align-items-center">
                                        Poids
                                <small className="text-info">145 KG</small>
                                    </li>
                                    <li className="list-group-item rounded-0 d-flex font-weight-lighter text-muted justify-content-between dashed-border align-items-center">
                                        Avec trasporct ?
                                    <small className=" text-info">OUI</small>
                                    </li>
                                    <li className="list-group-item rounded-0 dashed-border font-weight-lighter text-muted align-items-center">
                                        <div className="row">
                                            <div className="col col-6 d-flex">Owner</div>
                                            <div className="col col-6 d-flex justify-content-end">
                                                <small className="text-info">MOUTIK</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item rounded-0 dashed-border font-weight-lighter text-muted align-items-center">
                                        <div className="row">
                                            <div className="col col-6 d-flex">Emplacement</div>
                                            <div className="col col-6 d-flex justify-content-end">
                                                <small className="text-info">KHOURIBGA, CASA</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item rounded-0 dashed-border font-weight-lighter text-muted align-items-center">
                                        <div className="row">
                                            <div className="col col-6 d-flex">Date Fin</div>
                                            <div className="col col-6 d-flex justify-content-end">
                                                <small className="text-info">27 - Oct - 2019</small>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="row mt-5">
                                    <div className="col col-6">
                                        <button type="button" className="btn btn-block btn-warning text-light rounded-0">Ajouter au panier</button>
                                    </div>
                                    <div className="col col-6">
                                        <button type="button" className="btn btn-block btn-outline-danger rounded-0">Ajouter au Wishlist</button>
                                    </div>
                                </div>
                                <div className="mt-3 font-weight-light">Categories:
                                <a className="p-2 text-muted" href="/">Plastic</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="info-section">
                    <div className="container-fluid">
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className="nav-item text-muted nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Description</a>
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
                                <div className="row">
                                    <div className="col col-lg-6 col-md-6 col-sm-10">

                                    </div>
                                    <div className="bg-light col col-lg-6 col-md-6 col-sm-10 py-4">
                                        <p className="text-muted">Ajouter un avis</p>
                                        <form>
                                            <div className="text-dark form-group">
                                                <label htmlFor="reviewField">Votre avis</label>
                                                <textarea className="form-control rounded-0" rows="5" id="reviewField" placeholder="Ajouter un avis">

                                                </textarea>
                                            </div>
                                            <button type="submit" class="btn btn-warning rounded-0 text-white">Envoyer</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default offersDetails;
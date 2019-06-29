import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="bg-dark">
                <div className="container-fluid p-0">
                    <div className="row text-left">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <h1 className="text-light">About us</h1>
                            <p className="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, ipsam.</p>
                            <p className="pt-4 text-muted">
                                Copyright &copy; 2019 All rights reserved | this template is made by <span>Sorasenpai</span>
                            </p>
                        </div>
                        <div className="col-lg-5 col-md-5">
                            <h4 className="text-light">Newsletter</h4>
                            <p className="text-muted">Stay Updated</p>
                            <form className="form-inline">
                                <div className="col pl-0">
                                    <div className="input-group pr-5">
                                        <input type="text" className="form-control bg-dark text-white" placeholder="Email" />
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-12">
                            <h4 className="text-light">Follow Us</h4>
                            <p className="text-muted">Let us be social</p>
                            <div className="column text-light">
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-youtube"></i>
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-twitter"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {


    handleLogout = () => {
        this.props.logout();
        this.props.history.push('/');
    }

    renderAuthLinks() {
        const { isAuth } = this.props.auth;

        if (isAuth) {
            return (<a href="/login" className="dropdown-item clickable" onClick={this.handleLogout}>Se déconnecter</a>);
        }
        return (
            <React.Fragment>
                <Link className="dropdown-item" to="/login">Connexion</Link>
                <Link className="dropdown-item" to="/register">Inscription</Link>
            </React.Fragment>
        );
    }

    render() {
        return (
            <header>
                <nav className="top navbar navbar-expand-lg bg-dark">
                    <ul className="navbar-nav wast-link mr-auto">
                        <li className="nav-item mr-sm-3">
                            <i className="fas fa-flag mr-2"></i>Bienvenue dans Waste to Resource
                    </li>
                        <li className="nav-item mr-sm-3">
                            <i className="fas fa-phone-square mr-2"></i>Telephone: +212658468568
                    </li>
                        <li className="nav-item mr-sm-3">
                            <i className="fas fa-envelope mr-2"></i>e-mail@mail.com
                    </li>
                    </ul>
                    <ul className="navbar-nav  wast-link ml-auto">
                        <li className="nav-item dropdown mx-2">
                            <a className="nav-link dropdown-toggle p-0 top" href="/" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user mr-2"></i>Accounte
                        </a>
                            <div className="dropdown-menu dropdwn" aria-labelledby="navbarDropdown">
                                { this.renderAuthLinks() }

                            </div>
                        </li>
                        <li className="nav-item dropdown mx-2">
                            <a className="nav-link dropdown-toggle p-0 top" href="/" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-globe mr-2"></i>Francais
                        </a>
                            <div className="dropdown-menu dropdwn" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/">Arabe</a>
                                <a className="dropdown-item" href="/">Anglais</a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <nav className="navbar navbar-expand-lg navbar-light bg-white text-uppercase">
                    <Link className="navbar-brand" to="/">WASTETOR</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link wast-link" href="/">Accueil</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link wast-link" to="/offers">Tout voir</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link wast-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Catégories
                      </a>
                                <div className="dropdown-menu dropdwn" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/">Category one</a>
                                    <a className="dropdown-item" href="/">Category two</a>
                                    <a className="dropdown-item" href="/">Category three</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link wast-link" href="/">Blog</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control search-bar" type="search" placeholder="Rechereche" aria-label="Search" />
                            <button className="btn btn-warning text-white my-2 button-search" type="submit"><i className="fas fa-search"></i></button>
                        </form>
                    </div>
                </nav>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Header));
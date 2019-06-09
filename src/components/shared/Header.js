import React from 'react';

function Header(props) {
    return (
        <header>
            <nav className="top navbar navbar-expand-lg bg-dark">
                <ul className="navbar-nav mr-auto">
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
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown mx-2">
                        <a className="nav-link dropdown-toggle p-0 top" href="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-user mr-2"></i>Accounte
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/login">Connexion</a>
                            <a className="dropdown-item" href="/register">Inscription</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown mx-2">
                        <a className="nav-link dropdown-toggle p-0 top" href="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-globe mr-2"></i>Francais
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Arabe</a>
                            <a className="dropdown-item" href="#">Anglais</a>
                        </div>
                    </li>
                </ul>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light bg-white text-uppercase">
                <a className="navbar-brand" href="#">WASTETOR</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Accueil</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tout voir</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Catégories
                      </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Category one</a>
                                <a className="dropdown-item" href="#">Category two</a>
                                <a className="dropdown-item" href="#">Category three</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Blog</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Rechereche" aria-label="Search" />
                        <button className="btn btn-outline-info my-2 my-sm-0" type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default Header
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogedInLink from '../auth/LogedInLink';
import LogedInInfo from '../auth/LogedInInfo';
import {
    mercureNotificationUpdate,
    get_categories,
    fetchCurrentUserInfo,
    mercureMessageUpdate
} from '../../../actions';

import offerService from '../../../services/offer-service';
import Notification from '../Notification';
import Messages from '../Messages';
import mercureService from '../../../services/mercure_service';

class Header extends Component {

    state = {
        isMercureSet: false,
        isDataFetched: false
    }

    handleLogout = () => {
        this.props.logout();
        this.props.history.push('/');
    }

    getLastNotification = () => {

        if (this.state.isReady)
            this.state.notifications.length && !this.state.notifications[0].seen ? this.setState({ isNew: true }) : this.setState({ isNew: false });
    }

    getLastMessages = () => {

        if (this.state.isMsgReady)
            this.state.messages.length && !this.state.messages[0].seen ? this.setState({ isNewMsg: true }) : this.setState({ isNewMsg: false });
    }

    renderAuthLinks() {
        const { isAuth } = this.props.auth;
        if (isAuth) {
            return (
                <React.Fragment>
                    <Link className="dropdown-item" to={{ pathname: '/app/dashboard'}} >Tableau de bord</Link>
                    {offerService.isAReseller() && <Link className="dropdown-item" to={{ pathname: '/offers/new', state: { auction: true } }}>Publier une enchère</Link>}
                    <button className="dropdown-item clickable" onClick={this.handleLogout}>Se déconnecter</button>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Link className="dropdown-item" to="/login">Connexion</Link>
                <Link className="dropdown-item" to="/plans">Inscription</Link>
            </React.Fragment>
        );
    }

    fetchInfo = () => {
        const { isAuth } = this.props.auth;
        if (isAuth) {
            this.props.fetchCurrentUserInfo().then(() => {
                if (!this.state.isMercureSet)
                    mercureService.launchMercure('waste_to_resources/notifications', (data) => {
                        return this.props.mercureNotificationUpdate({...data, seen: false});
                    })
                    .then(() => this.setState({isMercureSet: true}));
                    mercureService.launchMercure('waste_to_resources/messages', (data) => {
                        this.props.mercureMessageUpdate({last_message: data.message, sender: data.sender});
                    });
            });
        }
    }

    fetchCategories = () => {
        this.props.get_categories();
    }

    renderName() {
        if (this.props.auth.isAuth && this.props.userInfo)
            return <span>Bonjour : { this.props.userInfo.firstName ? this.props.userInfo.firstName.toUpperCase() : ''} </span>
        return null;
    }

    componentDidMount() {
        this.fetchInfo();
        this.fetchCategories();
    }

    render() {
        const { userInfo, categories, auth: { isAuth } } = this.props;
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
                    <ul className="navbar-nav dropdown wast-link ml-auto">
                        { <Messages />}
                        { <Notification /> }
                        <li className="nav-item">
                        { this.renderName() }
                        </li>
                        <li className="nav-item dropdown mx-2">
                            <a className="nav-link dropdown-toggle p-0 top" href="/" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user mr-2"></i>Mon compte
                        </a>
                            <div className="dropdown-menu dropdwn" aria-labelledby="navbarDropdown">
                                {this.renderAuthLinks()}
                            </div>
                        </li>
                        <li className="nav-item dropdown mx-2">
                            <a className="nav-link dropdown-toggle p-0 top" href="/" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-globe mr-2"></i>Francais
                        </a>
                            <div className="dropdown-menu dropdown-menu-right dropdwn" aria-labelledby="navbarDropdown">
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
                                <div className="dropdown-menu dropdown-menu-right dropdwn" aria-labelledby="navbarDropdown">
                                    {categories.map((category) => {
                                        return <a key={category.id} className="dropdown-item" href="/">{category.label}</a>
                                    })}
                                </div>
                            </li>
                            <li className="nav-item">
                                <LogedInLink text="POSTER" />
                            </li>
                        </ul>
                        { isAuth && <LogedInInfo userInfo={userInfo} />}
                        <form className="form-inline">
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
        notifications: state.notifications.data,
        categories: state.categories.data,
        auth: state.auth,
        userInfo: state.userInfo.data
    }
}

export default withRouter(connect(mapStateToProps, 
    {
        fetchCurrentUserInfo,
        get_categories,
        mercureNotificationUpdate,
        mercureMessageUpdate
})(Header));
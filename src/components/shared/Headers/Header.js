import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogedInLink from '../auth/LogedInLink';
import LogedInInfo from '../auth/LogedInInfo';
import * as actions from '../../../actions';
import offerService from '../../../services/offer-service';
import Notification from '../Notification';
import Message from '../Message';
import mercureService from '../../../services/mercure_service';

class Header extends Component {


    state = {
        shouldRender: false,
        userInfo: [],
        notifications: [],
        messages: [],
        isReady: false,
        isNew: false,
        isNewMsg: false,
        isMsgReady: false
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
                    <a href="/login" className="dropdown-item clickable" onClick={this.handleLogout}>Se déconnecter</a>
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


    fetchUserMessages = () => {
        const { isAuth } = this.props.auth;
        if (isAuth)
            this.props.dispatch(actions.fetchUserMessages())
                .then((data) => {
                    this.setState({isMsgReady: true, messages: data.messages })
                }, () => this.getLastMessages());
    }

    fetchInfo = () => {
        const { isAuth } = this.props.auth;
        if (isAuth && !this.state.isReady) {
            this.props.dispatch(actions.fetchCurrentUserInfo()).then((userData) => {
                mercureService.launchMercure('waste_to_resources/notifications')
                .then((notification) => {
                    return this.setState({
                        notifications: [notification].concat(this.state.notifications),
                        isReady: true,
                        isNew: true
                    }, () => {
                        return this.fetchInfo()
                    })
                })
                return this.setState({ shouldRender: true, userInfo: userData.userInfo })
            });
        }
    }

    fetchCategories = () => {
        this.props.dispatch(actions.get_categories());
    }

    fetchNotifications = () => {
        const { isAuth } = this.props.auth;
        if (isAuth) {
            this.props.dispatch(actions.getNotifications()).then((nots) => {
                this.setState({
                    isReady: true,
                    notifications: nots.notifications,
                }, () => this.getLastNotification());
            })
        }
    }

    componentDidMount() {
        this.fetchInfo();
        this.fetchNotifications();
        this.fetchCategories();
        this.fetchUserMessages();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.auth.isAuth && (!this.state.shouldRender || !this.state.isReady
             || nextState.isNew !== this.state.isNew
             || nextState.notifications.length !== this.state.notifications.length
             || nextState.isNewMsg !== this.state.isNewMsg
             || (this.state.isReady && (nextState.userInfo.balance !== this.state.userInfo.balance))))
            return true;
        return false;
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.userInfo.length != this.state.userInfo.length)
            this.setState({
                userInfo: nextProps.userInfo,
                shouldRender: true,
                isReady: true
            })
    }

    // componentDidUpdate() {
    //     const { isAuth } = this.props.auth;
    //     if ((!this.state.shouldRender && !this.state.isReady) && isAuth) {
    //         this.fetchInfo();
    //         this.fetchNotifications();
    //     }

    // }

    onNotificationClick = () => {
        actions.notificationsSeen().then(() => {
            this.setState({ isNew: false })
        })
    }


    // On Message click: set message as seen
    onMessageClick = () => {
        actions.messagesSeen().then((res) => {
            console.log(res);
            this.setState({isNewMsg: false});
        })
    }

    render() {
        const { isMsgReady, userInfo, shouldRender, isReady, messages } = this.state;
        const { categories } = this.props;
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
                        {
                            isMsgReady && <li onClick={this.onMessageClick} className="nav-item dropdown" id="messageDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <a href="/" className="dropdown-toggle text-light">
                                    <i className="far fa-comments"></i>
                                    <span className={`badge ${this.state.isNewMsg ? 'notification' : ''}`}></span>
                                </a>
                                <Message messages={messages} />
                            </li>
                        }
                        {
                            isReady && <li onClick={this.onNotificationClick} className="nav-item dropdown px-3">
                                <a href="/" className="dropdown-toggle text-light" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="far fa-bell"></i>
                                    <span className={`badge ${this.state.isNew ? 'notification' : ''}`}></span>
                                </a>
                                <Notification notifications={this.state.notifications} />
                            </li>
                        }
                        <li className="nav-item">
                            {
                                shouldRender && <span>Bonjour : {userInfo.firstName.toUpperCase()} </span>
                            }
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
                        {shouldRender && <LogedInInfo userInfo={userInfo} />}
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
        messages: state.messages.data,
        categories: state.categories.data,
        auth: state.auth,
        userInfo: state.userInfo.data
    }
}

export default withRouter(connect(mapStateToProps)(Header));
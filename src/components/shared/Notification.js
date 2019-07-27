import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fechNotifications, setNotificationsAndFetchMessages } from '../../actions';
const OFFERS = 0;
const TRANSACTION = 1

class Notification extends Component {

    whereToRedirect = (type, id) => {
        if (type === OFFERS)
            return `/offers/${id}`
        if (type === TRANSACTION)
            return `/app/dashboard/transactions/${id}`
    }

    renderNotificationBullet = () => {
        if (this.props.notifications.length && !this.props.notifications[0].seen)
            return <span className='badge notification'></span>
        return null;
    }

    //When notification component clicked on 
    onNotificationClick = () => {
        this.props.setNotificationsAndFetchMessages();
    }

    renderNotificationList = () => {
        return this.props.notifications.map((value, index) => {
            return <li key={index} className="media py-2">
                <div className="media-body media-text">
                    <Link className="text-dark" to={this.whereToRedirect(value.type, value.reference)}>{value.message}</Link>
                </div>
            </li>
        })
    }

    componentDidMount() {
        if (this.props.auth.isAuth)
            this.props.fechNotifications();
    }

    componentDidUpdate() {
        if (this.props.auth.isAuth && !this.props.notifications)
            this.props.fechNotifications();
    }

    render() {
        const { notifications, auth } = this.props;
        if (!notifications || !auth.isAuth)
            return null;
        return (
            <li onClick={this.onNotificationClick} className="nav-item dropdown px-3">
                <Link to="/" className="dropdown-toggle text-light" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="far fa-bell"></i>
                    { this.renderNotificationBullet() }
                </Link>
                <div className="dropdown-menu shadow-sm dropdown-menu-right dropdown-block border-0 rounded-0 shadow-sm" aria-labelledby="dropdownMenuButton">
                    <div className="drop-top p-5 bg-info text-center align-center" href="#">
                        <h6 className="text-white font-weight-light d-inline-block pr-3">Notification d'utilisateur</h6>
                        <span className="btn btn-success btn-bold btn-sm btn">{notifications.length}</span>
                    </div>
                    <div className="dropdown-item" href="#">
                        <ul className="list-unstyled">
                            { this.renderNotificationList() }
                        </ul>
                    </div>
                    <div className="align-center text-center my-2">
                        <Link to="/" className="py-2 w-50 btn btn-focus rounded-pill btn-sm">Load more</Link>
                    </div>
                </div>
            </li>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications.data,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { fechNotifications, setNotificationsAndFetchMessages })(Notification);
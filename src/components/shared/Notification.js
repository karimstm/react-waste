import React, { Component } from 'react';

class Notification extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            notifications: this.props.notifications
        }
    }
    
    whereToRedirect = (type, id) =>
    {
        if (type == 0)
            return `/offers/${id}`
        if (type == 1)
            return `app/dashboard/offers/${id}`
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.notifications.length != this.state.notifications.length)
            this.setState({notifications: nextProps.notifications})
    }

    render() {
        return (
            <div className="dropdown-menu shadow-sm dropdown-menu-right dropdown-block border-0 rounded-0 shadow-sm" aria-labelledby="dropdownMenuButton">
                <div className="drop-top p-5 bg-info text-center align-center" href="#">
                    <h6 className="text-white font-weight-light d-inline-block pr-3">Notification d'utilisateur</h6>
                    <span className="btn btn-success btn-bold btn-sm btn">{this.state.notifications.length}</span>
                </div>
                <div className="dropdown-item" href="#">
                    <ul className="list-unstyled">
                        {
                            this.state.notifications.map((value) => {
                                return <li key={value.id} className="media py-2">
                                    <div className="media-body media-text">
                                        <a className="text-dark" href={this.whereToRedirect(value.type, value.reference)}>{value.message}</a>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="align-center text-center my-2">
                    <a href="#" className="py-2 w-50 btn btn-focus rounded-pill btn-sm">Load more</a>
                </div>
            </div>
        );
    }
}

export default Notification;
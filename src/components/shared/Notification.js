import React, { Component } from 'react';

class Notification extends Component {
    render() {
        const { notification } = this.props;
        return (
            <div className="dropdown-menu shadow-sm dropdown-menu-right dropdown-block border-0 rounded-0 shadow-sm" aria-labelledby="dropdownMenuButton">
                <div className="drop-top p-5 bg-info text-center align-center" href="#">
                    <h6 className="text-white font-weight-light d-inline-block pr-3">Notification d'utilisateur</h6>
                    <span className="btn btn-success btn-bold btn-sm btn">{notification.length}</span>
                </div>
                <div className="dropdown-item" href="#">
                    <ul className="list-unstyled">
                        {
                            notification.map((value) => {
                                return <li key={value.id} className="media py-2">
                                    <div className="media-body media-text">
                                        <a className="text-dark" href="#">{value.message}</a>
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
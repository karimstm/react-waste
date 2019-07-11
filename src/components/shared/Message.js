import React, { Component } from 'react';

class Message extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: this.props.messages
        }
    }

    render() {
        const { messages } = this.state;
        return (
            <div className="dropdown-menu shadow-sm dropdown-menu-right dropdown-block border-0 rounded-0 shadow-sm" aria-labelledby="messageDropDown">
                <div className="drop-top p-5 bg-info text-center align-center" href="#">
                    <h6 className="text-white font-weight-light d-inline-block pr-3">Nombre des message</h6>
                    <span className="btn btn-success btn-bold btn-sm btn">{messages.length}</span>
                </div>
                <div className="dropdown-item" href="#">
                    <ul className="list-unstyled">
                        {
                            messages.map((message, index) => {
                                return <li key={index} className="media py-2">
                                    <div className="media-body media-text">
                                        <a className="text-dark" data-sender={message.sender.email} href="">{message.text}</a>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="align-center text-center my-2">
                    <a href="#" className="py-2 w-50 btn btn-focus rounded-pill btn-sm">Charger plus</a>
                </div>
            </div>
        );
    }
}

export default Message;
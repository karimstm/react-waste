import React, { Component } from 'react';

class SendMessageInput extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="chat-box-tray">
                        <i className="far fa-smile"></i>
                        <input className="" type="text" placeholder="type your message here..." />
                        <button type="button" className="btn btn-sm"><i className="far fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SendMessageInput;
import React, { Component } from 'react';

class SendMessageInput extends Component {

    state = {
        textMessage: ''
    }

    sendMessage = () => {
        this.props.onSubmit(this.state.textMessage);
        this.setState({ textMessage: ''});
    }

    onMessageSubmit = (e) => {
        e.preventDefault();
        this.sendMessage();
    }

    onInputChange = (e) => {
        this.setState({textMessage: e.target.value});
    }

    render() {
        return (
            <form onSubmit={this.onMessageSubmit}>
                <div className="row">
                    <div className="col-12">
                        <div className="chat-box-tray">
                            <i className="far fa-smile"></i>
                            <input value={this.state.textMessage} onChange={this.onInputChange} className="" type="text" placeholder="type your message here..." />
                            <button onClick={this.sendMessage} type="button" className="btn btn-sm"><i className="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default SendMessageInput;
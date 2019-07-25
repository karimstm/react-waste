import React, { Component } from 'react';

class SentMessage extends Component {
    render() {
        return (
            <div className="row no-gutters">
                <div className="col-md-6">
                    <div className="chat-bubble chat-bubble--left">
                        {this.props.text}
                </div>
                </div>
            </div>
        );
    }
}

export default SentMessage;
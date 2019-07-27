import React, { Component } from 'react';

class ReplayMessage extends Component {
    render() {
        return (
            <div className="row no-gutters">
                <div className="col-md-6 offset-md-6">
                    <div className="chat-bubble chat-bubble--right chat-bubble--blue">
                        {this.props.text}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReplayMessage;
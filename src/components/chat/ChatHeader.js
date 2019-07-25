import React, { Component } from 'react';

class ChatHeader extends Component {
    render() {
        return (
            <div className="friend-drawer no-gutters friend-drawer--grey">
                <img className="profile-image" src="https://i.imgur.com/4DUylFx.jpg" alt="friend" />
                <div className="text">
                    <h6>Rbot Cop</h6>
                    <p>Layin' down the law since like before...</p>
                </div>
            </div>
        );
    }
}

export default ChatHeader;
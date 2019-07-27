import React, { Component } from 'react';

class ChatHeader extends Component {

    renderInfo = () => {
        const { user } = this.props;
        if (!user)
            return null;
        return (
            <React.Fragment>
                <span className="profile-image text-center" > {user.firstName.charAt(0)} </span>
                <div className="text">
                    <h6>{`${user.firstName} ${user.lastName}`}</h6>
                    <p></p>
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="friend-drawer no-gutters friend-drawer--grey">
                { this.renderInfo() }
            </div>
        );
    }
}

export default ChatHeader;
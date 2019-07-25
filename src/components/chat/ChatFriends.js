import React, { Component } from 'react';

class ChatFriends extends Component {

    renderList = () => {
        return this.props.contacts.map((value, index) => {
            return (
                <React.Fragment key={index}>
                    <div onClick={() => this.props.onClick(value.email)} className="friend-drawer friend-drawer--onhover">
                        <span className="profile-image text-center">{value.firstName.charAt(0)}</span>
                        <div className="text">
                            <h6 className="text-capitalize" >{`${value.firstName} ${value.lastName}`}</h6>
                            {/* <p>Yu're arrested</p> */}
                        </div>
                        {/* <span className="time text-muted small">13:21</span> */}
                    </div>
                    <hr />
                </React.Fragment>
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                { this.renderList() }
            </React.Fragment>
        );
    }
}

export default ChatFriends;
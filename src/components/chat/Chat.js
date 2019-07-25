import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, fetchMessages, sendMessage } from '../../actions';
import './Chat.css';
import ChatFriends from './ChatFriends';
import ChatSearchBox from './ChatSearchBox';
import SettingsTray from './SettingsTray';
import ChatHeader from './ChatHeader';
import SendMessageInput from './SendMessageInput';
import MessagesList from './MessagesList';

class Chat extends Component {

    state = {
        contactList: [],
        selectedUser: '',
        currentPage: 1
    }

    onUserClick = (email) => {
        this.props.fetchMessages(email, this.state.currentPage);
    }

    onSearch = (email) => {
        this.props.fetchUserInfo(email);
    }

    render() {
        return (
            <div className="my-container mt-5 m-4">
                <div className="row no-gutters">
                    <div className="col-md-4 border-right">
                        <SettingsTray />
                        <ChatSearchBox onSearch={this.onSearch} />
                        <ChatFriends contacts={this.props.user ? [this.props.user] : []} onClick={this.onUserClick} />
                    </div>
                    <div className="col-md-8">
                        <ChatHeader />
                        <MessagesList email={this.props.auth.email} messages={this.props.messages} />
                        <SendMessageInput />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.xuser.data,
        messages: state.conversation.data,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { fetchUserInfo, fetchMessages, sendMessage })(Chat);
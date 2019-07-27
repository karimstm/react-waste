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
        messages: [],
        selectedUser: '',
        currentPage: 1,
        hasMoreMessages: true
    }

    onUserClick = (email) => {
        this.setState({ selectedUser: email, hasMoreMessages: true, messages: [] }, () => {
            this.props.fetchMessages(email, this.state.currentPage)
            .then(() => this.setState({messages: this.props.messages}));
        });
        
    }

    onSearch = (email) => {
        this.props.fetchUserInfo(email);
    }

    onSubmit = (message) => {
        if (message && this.state.selectedUser) {
            this.props.sendMessage(this.state.selectedUser, { message })
            .then(() => this.setState({ currentPage: 1, messages: [], hasMoreMessages: true}))
            .then(() => this.props.fetchMessages(this.state.selectedUser, this.state.currentPage))
            .then(() => this.setState({ messages: this.props.messages }));
        }
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state && state.email) {
            this.onSearch(state.email)
            this.onUserClick(state.email);
        }

    }

    handleScroll = () => {
        if (this.state.hasMoreMessages) {
            this.props.fetchMessages(this.state.selectedUser, this.state.currentPage)
                .then(() => this.setState({ currentPage: this.state.currentPage + 1, messages: [...this.props.messages, ...this.state.messages] }))
                .catch(() => this.setState({ hasMoreMessages: false, currentPage: 1 }));
        }
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
                        <ChatHeader user={this.props.user} />
                        <MessagesList handleScroll={this.handleScroll} email={this.props.auth.email} messages={this.state.messages} />
                        <SendMessageInput onSubmit={this.onSubmit} />
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, fetchMessages, sendMessage } from '../../actions';
import ChatBox from './ChatBox';

class ChatPage extends Component {

    state = {
        message: '',
        email: '',
        currentEmail: null
    }

    handleOnChnage = (e) => {
        this.setState({ email: e.target.value });
    }

    onTextChange = (e) => {
        this.setState({message: e.target.value})
    }

    //sendMessageHnadler
    sendMessageHnadler = () => {
        if (this.state.currentEmail)
        {
            this.props.sendMessage(this.state.currentEmail, { message: this.state.message })
            .then(() => this.setState({ message: '' }));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.fetchUserInfo(this.state.email);
    }

    //This will fetch all messages related to the current user
    onUserClick = (email) => {
        // we get the email of the target user
        this.setState({currentEmail : email});
    }

    renderUser() {
        const { user } = this.props;
        if (!user)
            return null;
        return <li className="list-group-item text-capitalize"><button onClick={() => this.onUserClick(user.email)} className="btn text-primary rounded-0 btn-block btn-white" >{ `${user.firstName} ${user.lastName}` }</button></li>
    }

    render() {
        return (
            <div className="messageBox row m-4">
                <div className="col-md-4 pl-0 col-sm-12">
                    <div className="list-names">
                        <ul className="list-group">
                            <li className="list-group-item border-0 p-0">
                                <form onSubmit={this.handleSubmit}>
                                    <input
                                        onChange={this.handleOnChnage}
                                        type="email"
                                        value={this.state.email}
                                        placeholder="E-mail"
                                        className="form-control" />
                                </form>
                            </li>
                            { this.renderUser() }
                        </ul>
                    </div>
                </div>
                <div className="chat-box col-md-8 col-sm-12">
                    <ChatBox email={this.state.currentEmail} />
                    <div className="message-input clearfix">
                        <div className="row">
                            <div className="col-10">
                                <textarea 
                                onChange={this.onTextChange}
                                 type="text" 
                                 placeholder="Votre Message" 
                                 className="border form-control"
                                 value={this.state.message}
                                  ></textarea>
                            </div>
                            <div className="col-2 text-right">
                                <button onClick={this.sendMessageHnadler} className="btn btn-warning mb-2" ><i className="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.xuser.data,
        messages: state.conversation.data
    }
}

export default connect(mapStateToProps, { fetchUserInfo, fetchMessages, sendMessage })(ChatPage);
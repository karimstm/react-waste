import React, { Component } from 'react';
import { fetchUserMessages, setMessageAndFetchMessages } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Message extends Component {


    // On Message click: set message as seen
    onMessageClick = () => {
        this.props.setMessageAndFetchMessages();
    }

    //Render list of messages
    renderList = () => {
        const { messages } = this.props.messages;
        return messages.map((message, index) => {
            return <li key={index} className="media py-2">
                <div className="media-body media-text">
                    <Link className="text-dark" data-sender={message.sender} to="/">{message.last_message}</Link>
                </div>
            </li>
        })
    }

    renderMessageNotification = () => {
        console.log(this.props.messages.total_not_seen);
        if (this.props.messages.total_not_seen === true)
            return <span className='badge notification'></span>           
        return null;
    }

    componentDidMount() {
        if (this.props.auth.isAuth)
            this.props.fetchUserMessages();     
    }

    componentDidUpdate() {
        if (this.props.auth.isAuth && !this.props.messages)
            this.props.fetchUserMessages();
    }


    render() {
        const { messages, auth: { isAuth } } = this.props;
        if (!messages || !isAuth)
            return null;
        return (
            <li onClick={this.onMessageClick} className="nav-item dropdown" id="messageDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Link to="/" className="dropdown-toggle text-light">
                    <i className="far fa-comments"></i>
                    {this.renderMessageNotification()}
                </Link>
                <div className="dropdown-menu shadow-sm dropdown-menu-right dropdown-block border-0 rounded-0 shadow-sm" aria-labelledby="messageDropDown">
                    <div className="drop-top p-5 bg-info text-center align-center" href="#">
                        <h6 className="text-white font-weight-light d-inline-block pr-3">Nombre des message</h6>
                        <span className="btn btn-success btn-bold btn-sm btn">{messages.messages.length}</span>
                    </div>
                    <div className="dropdown-item" href="#">
                        <ul className="list-unstyled">
                            {this.renderList()}
                        </ul>
                    </div>
                    <div className="align-center text-center my-2">
                        <Link to="#" className="py-2 w-50 btn btn-focus rounded-pill btn-sm">Charger plus</Link>
                    </div>
                </div>
            </li>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        messages: state.messages.data
    }
}

export default connect(mapStateToProps, { fetchUserMessages, setMessageAndFetchMessages })(Message);
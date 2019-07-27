import React, { Component } from 'react';
import { fetchUserMessages, setMessageAndFetchMessages } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Messages extends Component {


    // On Message click: set message as seen
    onMessageClick = () => {
        console.log('karim')
        this.props.setMessageAndFetchMessages();
    }

    //Render list of messages
    renderList = () => {
        const { messages } = this.props.messages;
        return messages.map((message, index) => {
            return <li key={index} className="media py-2">
                <div className="media-body media-text">
                    <Link className="text-dark"
                     to={{
                            pathname: '/app/dashboard/messages',
                            state: { email: message.sender }
                        }}
                     >{message.last_message}</Link>
                </div>
            </li>
        })
    }

    renderMessageNotification = () => {
        if (parseInt(this.props.messages.total_not_seen))
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
            <li onClick={this.onMessageClick} className="nav-item dropdown">
                <Link to="/" className="dropdown-toggle text-light" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="far fa-comment"></i>
                    { this.renderMessageNotification() }
                </Link>
                <div className="dropdown-menu shadow-sm dropdown-menu-right dropdown-block border-0 rounded-0 shadow-sm" aria-labelledby="dropdownMenuButton">
                    <div className="drop-top p-5 bg-info text-center align-center" href="#">
                        <h6 className="text-white font-weight-light d-inline-block pr-3">Notification d'utilisateur</h6>
                        <span className="btn btn-success btn-bold btn-sm btn">{messages.messages.length}</span>
                    </div>
                    <div className="dropdown-item" href="#">
                        <ul className="list-unstyled">
                            { this.renderList() }
                        </ul>
                    </div>
                    <div className="align-center text-center my-2">
                        <Link to="/" className="py-2 w-50 btn btn-focus rounded-pill btn-sm">Load more</Link>
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

export default connect(mapStateToProps, { fetchUserMessages, setMessageAndFetchMessages })(Messages);
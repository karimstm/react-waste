import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReplayMessage from './ReplayMessage';
import SentMessage from './SentMessage';

class MessagesList extends Component {

    componentDidMount() {
        this.scrollToButtom();
    }

    scrollToButtom = () => {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight;
    }

    componentDidUpdate() {
        this.scrollToButtom();
    }

    renderList = () => {
        return this.props.messages.map((value, index) => {
            if (value.sender.email !== this.props.email) {
                return <SentMessage text={value.text} key={index} />
            }
            return <ReplayMessage text={value.text} key={index} />
        });
    }

    render() {
        return (
            <div className="chat-panel">
                <div className="text-center my-2">
                    <span className="text-muted">loading...</span>
                </div>
                { this.renderList() }
            </div>
        );
    }
}

export default MessagesList;
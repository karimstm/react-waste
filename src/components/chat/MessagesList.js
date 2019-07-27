import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReplayMessage from './ReplayMessage';
import SentMessage from './SentMessage';

class MessagesList extends Component {

    state = {
        hasMoreItem: true
    }

    componentDidMount() {
        this.scrollToButtom();
    }

    scrollToButtom = () => {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight;
    }

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.schouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    componentWillReceiveProps({ messages }) {

        if (
            this.scroller && 
            this.scroller.scrollTop < 100 && 
            this.props.messages &&
            messages && 
            this.props.messages.length !== messages.length)
        {
            const heightBeforeRender = this.scroller.scrollHeight;
            // wait for more items to render
            setTimeout(() => {
                this.scroller.scrollTop = this.scroller.scrollHeight - heightBeforeRender;
            }, 120);
        }  
    }

    componentDidUpdate() {
        if (this.schouldScrollToBottom)
        {
            this.scrollToButtom();
        }   
    }

    renderList = () => {
        return this.props.messages.map((value, index) => {
            if (value.sender.email !== this.props.email) {
                return <SentMessage text={value.text} key={index} />
            }
            return <ReplayMessage text={value.text} key={index} />
        });
    }

    handleScroll = () => {
        if (this.scroller && this.scroller.scrollTop  < 100)
        {
            this.props.handleScroll();
        }
    }

    render() {
        return (
            <div
            onScroll={this.handleScroll}
            ref={(scroller) => {
                this.scroller = scroller;
            }}
            className="chat-panel">
                <div className="text-center my-2">
                    <span className="text-muted">loading...</span>
                </div>
                { this.renderList() }
            </div>
        );
    }
}

export default MessagesList;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../../actions'
import $ from 'jquery';

class ChatBox extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.email && nextProps.email !== this.props.email) {
            this.props.fetchMessages(nextProps.email)
            .then(() => {
                let msgs = document.querySelector(".messages");
                let lastMegs = document.querySelector('.messages .messages:last-of-type');
                //  console.log(msgs, lastMegs);
                if (lastMegs)
                    scrollToTopPosition(getTopPostion(lastMegs), msgs, 292);
            });
        }
    }

    renderListOfMessages = () => {
        const { email } = this.props.auth;
        return this.props.messages.map((value, index) => {
            if (value.sender.email !== email) {
                return (
                    <li className="msg sent" key={index}>
                        <span className="text-uppercase"></span>
                        <p>{value.text}</p>
                    </li>
                );
            }
            return (
                <li className="msg replies" key={index}>
                    <span className="text-uppercase" >Me</span>
                    <p>{value.text}</p>
                </li>
            );
        });
        
    }
    handleScroll = () => {
        if (this.scroller) {
            console.log(this.scroller.scrollTop);
        }
    }

    componentDidUpdate(){
        if (!this.lastMegs)
        {
            let msgs = document.querySelector(".messages");
                let lastMegs = document.querySelector('.messages .messages:last-of-type');
                //  console.log(msgs, lastMegs);
                if (lastMegs)
                    scrollToTopPosition(getTopPostion(lastMegs), msgs, 292);
        }
    }

    render() {
        return (
            <div
                className="messages clearfix"
                onScroll={this.handleScroll}
                ref={(scroller) => {
                    this.scroller = scroller;
                }}
            >
                <ul>
                    {this.renderListOfMessages()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.conversation.data,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { fetchMessages })(ChatBox);


function scrollToTopPosition(topPosition, parent, delay) {
    $(parent).animate({ scrollTop: topPosition }, delay)
}

function getTopPostion(el) {
    return $(el).offset().top
}
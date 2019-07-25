import React, { Component } from 'react';

class ChatSearchBox extends Component {

    state = {
        email: ''
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSearch(this.state.email);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="search-box">
                    <div className="input-wrapper">
                        <i className="fas fa-search"></i>
                        <input value={this.state.email} onChange={this.onEmailChange} type="email" placeholder="Email" />
                    </div>
                </div>
            </form>
        );
    }
}

export default ChatSearchBox;
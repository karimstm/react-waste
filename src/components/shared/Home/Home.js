import React, { Component } from 'react';
import HomeTabs from '../tabs/HomeTabs';
import Header from '../Header';

class Home extends Component {
    render() {
        return (
            <div>
                <Header logout={this.props.logout} />
                <HomeTabs />
            </div>
        );
    }
}

export default Home;
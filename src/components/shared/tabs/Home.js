import React, { Component } from 'react';
import HomeTabs from './HomeTabs';
import ControlledCarousel from '../carousel/ControlledCarousel';

class Home extends Component {
    render() {
        return (
            <div>
                <ControlledCarousel />
                <HomeTabs />
            </div>
        );
    }
}

export default Home;
import React, { Component } from 'react';
import PrivateHeader from './shared/Headers/PrivateHeader';
import Sidebar from './Profile/Sidebar';
import Cards from './Profile/Cards'
import UserProfile from './Profile/UserProfile';

class Dashboard extends Component {
    render() {
        return (
            <div className="clearfix">
                <PrivateHeader />
                <div className="dashboard">
                    <div className="left-sidebar">
                        <Sidebar />
                    </div>
                    <div className="right-sidebar">
                        {/* <Cards /> */}
                        <UserProfile />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
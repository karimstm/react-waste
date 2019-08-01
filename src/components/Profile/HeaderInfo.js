import React, { Component } from 'react';

class HeaderInfo extends Component {
    render() {
        const { userInfo } = this.props;
        if (!userInfo)
            return null;
        return (
            <div className="profile-bg-img">
                <img className="shadow-sm img-fluid" alt="" src="https://i.imgur.com/hEjohDr.jpg" />
                <div className="card-block user-info">
                    <div className="media">
                        <img src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-4.jpg" className="user-img mr-3" alt="..." />
                        <div className="media-body">
                            <div className="row">
                                <div className="col-6">
                                    <h5 className="mt-0 text-uppercase">{`${userInfo.firstName} ${userInfo.lastName}`}</h5>
                                    {userInfo.roles[0].replace('ROLE_', '')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderInfo;
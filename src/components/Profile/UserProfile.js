import React, { Component } from 'react';
import ProfileTabs from './ProfileTabs';
import { connect } from 'react-redux';
import {  fetchCurrentUserInfo } from '../../actions';
import HeaderInfo from './HeaderInfo';

class UserProfile extends Component {

    componentDidMount() {
        this.props.fetchCurrentUserInfo();
    }

    render() {

        const { userInfo } = this.props;
        return (
            <div className="m-4">
                <div className="top-profile">
                    <div className="row align-items-end">
                        <div className="col-lg-8">
                            <div className="page-header-title">
                                <div className="d-inline">
                                    <h4 className="text-body">Profil de l'utilisateur</h4>
                                    <span className="text-black-50">Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item" aria-current="page"><i className="fas fa-home"></i></li>
                                <li className="breadcrumb-item" aria-current="page">Profil de l'utilisateur</li>
                                <li className="breadcrumb-item active" aria-current="page">Profil de l'utilisateur</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="page-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <HeaderInfo userInfo={userInfo}/>
                        </div>
                        <div className="col-lg-12">
                            <ProfileTabs userInfo={userInfo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        userInfo: state.userInfo.data
    }
}

export default connect(mapStateToProps, { fetchCurrentUserInfo })(UserProfile);
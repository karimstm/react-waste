import React, { Component } from 'react';
import ProfileTabs from './ProfileTabs';

class UserProfile extends Component {
    render() {
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
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" aria-current="page"><i class="fas fa-home"></i></li>
                                <li class="breadcrumb-item" aria-current="page">Profil de l'utilisateur</li>
                                <li class="breadcrumb-item active" aria-current="page">Profil de l'utilisateur</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="page-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="profile-bg-img">
                                <img className="shadow-sm img-fluid" alt="" src="https://i.imgur.com/hEjohDr.jpg" />
                                <div className="card-block user-info">
                                    <div class="media">
                                        <img src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-4.jpg" class="user-img mr-3" alt="..." />
                                        <div class="media-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <h5 class="mt-0">John Doe</h5>
                                                    REVENDEUR
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <ProfileTabs />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;
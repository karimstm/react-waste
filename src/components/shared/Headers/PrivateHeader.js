import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUserInfo } from '../../../actions';

class PrivateHeader extends Component {

    componentDidMount(){
        this.props.fetchCurrentUserInfo();
    }

    renderName() {
        if (this.props.currentUser)
        {
            const { firstName, lastName } = this.props.currentUser;
            return <span className="text-uppercase">{ `${firstName} ${lastName}` }</span>
        }
        return null;
    }

    render() {
        return (
            <div className="private-header container-fluid clearfix">
                <nav className="navbar navbar-expand-lg pcoded-header">
                    <div className="row w-100">
                        <div className="col-xl-2 col-lg-3 col-md-4">
                            <Link to="/" className="navbar-brand text-black-50" >WASTE TO RESOURCE</Link>
                        </div>
                        <div className="col-xl-10 col-lg-9 col-md-8">
                            <ul className="navbar-wrapper navbar-nav">
                                <li className="nav-item dropdown ml-auto">
                                    <div className="dropdown">
                                        <button className="btn rounded-0 btn-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img className="profile mr-2" src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-4.jpg" alt="" />
                                            { this.renderName() }
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <Link className="dropdown-item" to="#"><i className="fas fa-cog mr-3"></i> Paramètres</Link>
                                            <Link className="dropdown-item" to={{ pathname: '/app/dashboard/profile' }}><i className="fas fa-user mr-3"></i> Profil</Link>
                                            <Link onClick={() => this.props.logout()} className="dropdown-item" to="/login"><i className="fas fa-sign-out-alt mr-3"></i> Se déconnecter</Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userInfo.data
    }
}

export default connect(mapStateToProps, { fetchCurrentUserInfo })(PrivateHeader);
import React from 'react';
import { Link } from 'react-router-dom';

function PrivateHeader(props) {
    return (
        <div className="private-header container-fluid clearfix">
            <nav className="navbar navbar-expand-lg pcoded-header">
            <div className="row w-100">
                <div className="col-xl-2 col-lg-3 col-md-4">
                    <a className="navbar-brand text-black-50" href="#">WASTE TO RESOURCE</a>
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8">
                    <ul className="navbar-wrapper navbar-nav">
                        <li className="nav-item dropdown ml-auto">
                            <div className="dropdown">
                                <button className="btn rounded-0 btn-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className="profile mr-2" src="https://colorlib.com/polygon/adminty/files/assets/images/avatar-4.jpg" alt="" />
                                    <span className="">John Doe</span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#"><i className="fas fa-cog mr-3"></i> Paramètres</a>
                                    <Link className="dropdown-item" to={{pathname: '/app/dashboard/profile'}}><i className="fas fa-user mr-3"></i> Profil</Link>
                                    <a onClick={() => props.logout()} className="dropdown-item" href="/login"><i className="fas fa-sign-out-alt mr-3"></i> Se déconnecter</a>
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
export default PrivateHeader;
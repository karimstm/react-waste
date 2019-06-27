import React, { Component } from 'react';

class LogedInInfo extends Component {

    render() {
        const { userInfo } = this.props;
        if (userInfo && this.props.userInfo.email) {
            return (
                <div className="navbar-text text-lowercase">
                    <span className="text-black-50 pr-4">Solde : <span className="text-danger">{userInfo.balance}</span></span>
                    <span className="text-black-50 pr-4">points de fidélité : <span className="text-danger">{userInfo.loyalty_points}</span></span>
                    <span className="text-black-50 pr-4">en suspens : <span className="text-danger">{userInfo.onhold}</span></span>
                </div>
            );
        } else 
        {
            return <React.Fragment></React.Fragment>
        }
    }
}


export default (LogedInInfo);
import React, { Component } from 'react';

class LogedInInfo extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userInfo: this.props.userInfo
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.userInfo !== this.state.userInfo)
            this.setState({ userInfo: nextProps.userInfo });
    }

    render() {
        const { userInfo } = this.state;
        if (!userInfo)
            return null;
        if (userInfo && this.state.userInfo.email) {
            return (
                <div className="navbar-text text-lowercase">
                    <span className="text-black-50 pr-4">Solde : <span className="text-danger">{userInfo.balance} DH</span></span>
                    {/* <span className="text-black-50 pr-4">points de fidélité : <span className="text-danger">{userInfo.loyalty_points}</span></span> */}
                    <span className="text-black-50 pr-4">en suspens : <span className="text-danger">{userInfo.onhold} DH</span></span>
                </div>
            );
        } else 
        {
            return <React.Fragment></React.Fragment>
        }
    }
}


export default LogedInInfo;
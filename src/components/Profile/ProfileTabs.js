import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonalInfo from './PersonalInfo';

class ProfileTabs extends Component {

    render() {
        const { userInfo } = this.props;

        return (
            <React.Fragment>
                <nav>
                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a className="nav-item text-black-50 nav-link active" id="nav-info-tab" data-toggle="tab" href="#nav-info" role="tab" aria-controls="nav-info" aria-selected="true">Informations personnelles</a>
                        <a className="nav-item text-black-50 nav-link" id="nav-review-tab" data-toggle="tab" href="#nav-review" role="tab" aria-controls="nav-review" aria-selected="false">Avis</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane text-black-50 fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">
                        <PersonalInfo infos={userInfo} />
                    </div>
                    <div className="tab-pane text-black-50 fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state)
{
    return {
        userInfo: state.userInfo.data
    }
}

export default connect(mapStateToProps)(ProfileTabs);
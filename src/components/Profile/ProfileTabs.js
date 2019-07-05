import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';

class ProfileTabs extends Component {
    render() {
        return (
            <React.Fragment>
                <nav>
                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a class="nav-item text-black-50 nav-link active" id="nav-info-tab" data-toggle="tab" href="#nav-info" role="tab" aria-controls="nav-info" aria-selected="true">Informations personnelles</a>
                        <a class="nav-item text-black-50 nav-link" id="nav-review-tab" data-toggle="tab" href="#nav-review" role="tab" aria-controls="nav-review" aria-selected="false">Avis</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane text-black-50 fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">
                        <PersonalInfo />
                    </div>
                    <div class="tab-pane text-black-50 fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProfileTabs;
import React from 'react';

function SettingsTray(props) {
    return (
        <div className="settings-tray">
            <img className="profile-image" src="https://i.imgur.com/4DUylFx.jpg" alt="Profile" />
            <span className="settings-tray--right float-right">
                <i className="fas fa-sync-alt"></i>
                <i className="fas fa-comments"></i>
                <i className="fas fa-bars"></i>
            </span>
        </div>
    );
}

export default SettingsTray;
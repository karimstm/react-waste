import React, { Component } from 'react';

class Timer extends Component {
    render() {
        const { days, hours, minutes, seconds } = this.props;
        return (
            <ul className="time-counter">
                <li>
                    <span>{days}d</span>
                </li>
                <li>
                    <span>{hours}h</span>
                </li>
                <li>
                    <span>{minutes}m</span>
                </li>
                <li>
                    <span>{seconds}s</span>
                </li>
            </ul>
        );
    }
}

export default Timer;
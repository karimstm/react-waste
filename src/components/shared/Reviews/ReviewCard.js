import React, { Component } from 'react';
import * as actions from '../../../actions';
import Spinner from '../../shared/Spinner';
import dateService from '../../../services/date-service';

class ReviewCard extends Component {

    state = {
        feedbacks: [],
        isFeched: false,
        isError: false,
    }

    componentDidMount() {
        const { email } = this.props;
        actions.fetchFeedbacks(email)
            .then((data) => {
                this.setState({
                    feedbacks: data,
                    isFeched: true,
                    isError: false
                })

            })
            .catch(() => {
                this.setState({
                    isError: true,
                    isFeched: false,
                });
            })


    }

    renderer = (feedback, index) => {
        return <React.Fragment key={index}>
            <div className="col col-12 col-md-2">
                <img src="https://i.imgur.com/y1rAeze.png" alt="" />
            </div>
            <div className="bg-light px-4 col col-12 col-md-10 mt-2">
                <div className="comment-content">
                    <span className="font-weight-bold text-muted d-block my-2 text-capitalize">{feedback.sender.firstName} {feedback.sender.lastName} <small className="text-black-50 mx-1"> -> {dateService.getLocalDate(feedback.date)}</small></span>
                    <p className="text-muted">{feedback.text}</p>
                </div>
            </div>
        </React.Fragment>
    }

    render() {

        const { feedbacks } = this.state;
        if (!this.state.isFeched)
            return <Spinner />
        return (
            <ol className="commentList">
                <li className="comment-item">
                    <div className="row">
                        {feedbacks.map((feedback, index) => this.renderer(feedback, index))}
                    </div>
                </li>
            </ol>
        );
    }
}

export default ReviewCard;

import React from 'react';

function ReviewCard(props) {
    return (
        <ol className="commentList">
            <li className="comment-item">
                <div className="row">
                    <div className="col col-12 col-md-2 ">
                        <img  src="https://i.imgur.com/rGBnHoD.jpg" alt=""/>
                    </div>
                    <div className="bg-light px-4 col col-12 col-md-10">
                        <div className="comment-content">
                            <span className="font-weight-bold text-muted d-block my-2">John Doe <small className="text-black-50 mx-1"> -> 12 Fridary 2019</small></span>
                            <p className="text-muted">Bacon ipsum dolor amet kielbasa shank capicola jowl</p>
                        </div>
                    </div>
                </div>
            </li>
        </ol>
    );
}

export default ReviewCard;
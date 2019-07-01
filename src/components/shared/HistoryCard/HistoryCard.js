import React, { Component } from 'react';

class HistoryCard extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="my-2 py-2 bidders-name">
                <ul className="px-2 my-0">
                    {
                        data.reverse().map((value, index) => {
                            return <li key={index} className="row my-0 text-body bidders">
                                <span className="col-xs-4 col-md-4 col-sm-5 ">{value.price} DH <small className="d-block text-secondary">le 25 juit a 15:h</small></span>
                                <span className="text-right col-xs-8 col-md-8 col-sm-7">
                                    {value.bidder.lastName.toUpperCase()}
                                    </span>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default HistoryCard;
import React, { Component } from 'react';

class HistoryCard extends Component {

    constructor(props) {
        super(props);  
        this.state = { data: this.props.data }
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props.data.length != nextProps.data.length)
            this.setState({ data : nextProps.data});
    }
    
    render() {
        const { data } = this.state;
        return (
            <div className="my-2 py-2 bidders-name auction-history">
                <ul className="px-2 my-0">
                    {
                        data.map((value, index) => {
                            if (value.bidder !== undefined)
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
import React, { Component } from 'react';
import OfferListing from './OfferListing';
import * as actions from '../../../actions';
import Spinner from '../../shared/Spinner';

class OfferList extends Component {

    state = {
        errors: '',
        salesoffer: [],
        isFetched: false,
        isError: false
    }

    componentWillMount() {
        let { type } = this.props;
        if (!type)
            type = 'sale'
        actions.fetchOffers(type)
        .then(response => this.setState({ salesoffer: response, isFetched: true}))
        .catch(errors => {
            this.setState({errors: errors, isError: true});
            debugger;
        })
    }

    render() {
        
        const { salesoffer, isFetched, isError, errors } = this.state;

        if (!isFetched && !isError)
            return <Spinner />
        return (
            <section className="py-5 bg-white">
                <div className="container-fluid">
                    {/* Title */}
                        <h4 className="pb-3 big-title">{this.props.title}</h4>
                    {/* End Title */}
                    <div className="row">
                    {
                        isError && typeof(errors) === 'string' ? <small className="text-danger">{errors}</small> : <OfferListing offers={salesoffer} />
                    }        
                    </div>
                    
                </div>
            </section>
        );
    }
}

export default OfferList;
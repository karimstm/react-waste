import React, { Component } from 'react';
import * as actions from '../../../actions';
import Spinner from '../../shared/Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import OfferCard from './OfferCard';

class OfferList extends Component {

    state = {
        errors: '',
        salesoffer: [],
        isFetched: false,
        isError: false,
        limit: 10,
        page: 1,
        hasMore: true
    }

    componentWillMount() {
        let { type } = this.props;
        const { page } = this.state;
        if (!type)
            type = ''
        actions.fetchOffers(type, page)
            .then(response => this.setState({ salesoffer: response, isFetched: true }))
            .catch(errors => {
                this.setState({ errors: errors, isError: true });
            })
    }

    fetchOffers = () => {
        let { type } = this.props;
        if (!type)
            type = ''
        this.setState({
            page: this.state.page + 1
        }, () => {
            const { page } = this.state;
            actions.fetchOffers(type, page)
            .then(response => {
                this.setState({ salesoffer: this.state.salesoffer.concat(response), isFetched: true, hasMore: response.length ? true : false })
            })
            .catch(errors => {
                this.setState({ hasMore: false });
            });
        });
        

    }

    render() {

        const { salesoffer, isFetched, isError, errors, hasMore } = this.state;

        if (!isFetched && !isError)
            return <Spinner />
        return (
            <section className="py-3 bg-white">
            {/* <div className="container-fluid mb-5">
                    <SearchFilter />
                </div> */}
                <div className="container-fluid">
                    {/* Title */}
                    <h4 className="pb-3 big-title">{this.props.title}</h4>
                    {/* End Title */}
                    <InfiniteScroll
                        dataLength={salesoffer.length}
                        next={this.fetchOffers}
                        hasMore={hasMore}
                        scrollThreshold={0.7}
                        loader={<h5 className="text-center text-muted"><i className="fas fa-spin fa-spinner"></i>                        </h5>}
                        >
                        <div className="row">
                            {
                                isError && typeof (errors) === 'string' ? <small className="text-danger">{errors}</small> :
                                salesoffer.map((offer, index) => {
                                    return (
                                        <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                            <OfferCard offer={offer} />
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </InfiniteScroll>

                </div>
            </section >
        );
    }
}

export default OfferList;
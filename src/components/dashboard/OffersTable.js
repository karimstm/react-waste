import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { fetchCurrentUserOffers, fetchOffersCount } from '../../actions';
import {
    ROLE_PICKER,
    ROLE_RESELLER,
    ROLE_BUYER
} from '../../actions/types';

class OffersTable extends Component {

    
    state = {
        loading: true,
        currentPage: 1,
        limit: 10,
        totalItemsCount: 0
    }

    // Call fetch offers on everyChange of the Pagination Component
    handlePageChange = (pageNumber) => {
        if (pageNumber === this.state.currentPage)
            return;
        this.setState({ currentPage: pageNumber}, () => {
            this.props.fetchCurrentUserOffers(this.state.currentPage, this.state.limit, this.type);
        })
    }

    // Get the type of the offer to fetch and that can be either 'sale', 'purchase', 'auction', purchase_bulk
    getOfferType = () => {
        switch (this.props.auth.role) {
            case ROLE_PICKER:
                return 'sale';
            case ROLE_BUYER:
                return 'bulk_purchase';
            case ROLE_RESELLER:
                return 'purchase'
            default:
                return null;
        }
    }

    renderListOfOffers = () => {
        const { offers } = this.props;
        if (offers.length) {
            return offers.map((data) => {
                return (
                    <tr key={data.id}>
                        <th scope="row">{data.id}</th>
                        <td><a className="link-item" href={`/offers/${data.id}`}>{data.title}</a></td>
                        <td>{data.weight} MAD</td>
                        <td>{data.price}</td>
                        <td>{data.with_transport ? <span className="badge badge-pill badge-primary">OUI</span> : <span className="badge badge-pill badge-secondary">NON</span>}</td>
                        <td>{data.is_active ? <span className="badge badge-pill badge-success">OUI</span> : <span className="badge badge-pill badge-danger">NON</span>}</td>
                        <td>{data.type}</td>
                    </tr>
                );
            })
        }
        return null;
    }

    componentDidMount() {
       this.type = this.getOfferType();
        fetchOffersCount(this.type).then((count) => {
            this.setState({totalItemsCount: count}, () => {
                this.props.fetchCurrentUserOffers(this.state.currentPage, this.state.limit, this.type);
            })
        })
    }

    render() {
        return (
            <div className="panel p-4">
                <header className="panel-heading pb-4">
                    Mes offres
                </header>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Poids</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Avec transport</th>
                            <th scope="col">Actif</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListOfOffers()}
                    </tbody>
                </table>
                <Pagination
                    activePage={this.state.currentPage}
                    itemsCountPerPage={this.state.limit}
                    pageRangeDisplayed={5}
                    totalItemsCount={this.state.totalItemsCount}
                    activeLinkClass="active"
                    itemClass="page-item"
                    linkClass="page-link"
                    innerClass="pagination justify-content-end"
                    onChange={this.handlePageChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        offers: Object.values(state.myOffers).filter(value => value.type !== 'auction'),
        auth: state.auth
    }
}

export default connect(mapStateToProps, { fetchCurrentUserOffers })(OffersTable);
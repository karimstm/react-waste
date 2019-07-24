import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { fetchCurrentUserOffers, fetchOffersCount } from '../../actions';


class AuctionTable extends Component {

    state = {
        loading: true,
        currentPage: 1,
        limit: 10,
        totalItemsCount: 0
    }

    renderListOfAuctions = () => {
        const { auctions } = this.props;
        if (auctions.length) {
            return auctions.map((data) => {
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

    // Call fetch transaction on everyChange of the Pagination Component
    handlePageChange = (pageNumber) => {
        if (pageNumber === this.state.currentPage)
            return;
        this.setState({ currentPage: pageNumber}, () => {
            return this.props.fetchCurrentUserOffers(this.state.currentPage, this.state.limit, 'auction');
        });
    }
    

    componentDidMount() {
        fetchOffersCount('auction').then((count) => {
            this.setState({totalItemsCount: count}, () => {
                this.props.fetchCurrentUserOffers(this.state.currentPage, this.state.limit, 'auction');
            });
        });
    }

    render() {
        return (
            <div className="panel p-4">
                <header className="panel-heading pb-4">
                    Mes enchères
                </header>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Poids</th>
                            <th scope="col">Offre actuelle</th>
                            <th scope="col">Avec transport</th>
                            <th scope="col">Actif</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderListOfAuctions() }
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
        auctions: Object.values(state.myAuctions)
    }
}

export default connect(mapStateToProps, { fetchCurrentUserOffers })(AuctionTable);
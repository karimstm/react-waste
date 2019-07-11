import React, { Component } from 'react';
import dateService from '../../services/date-service';
import Pagination from 'react-js-pagination';
import * as actions from '../../actions';
import CentredSpinner from '../shared/spinners/CentredSpinner';

class TransactionTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            currentPage: 1,
            transPerPage: 12,
            totalItemsCount: 0,
            transactions: []
            ,
        }
    }

    // Get the state of the transaction

    getStatusOfTransaction = (status) => {
        let className = '';
        let statusName = '';
        switch (status) {
            case 0:
                className = 'label-warning';
                statusName = 'Ouvert';
                break;
            case 1:
                className = 'label-info';
                statusName = 'Payé';
                break;
            case 2:
                className = 'label-primary';
                statusName = 'Terminé';
                break;
            case -1:
                className = 'label-danger';
                statusName = 'Annulé';
                break;
            case -2:
                className = 'label-danger';
                statusName = 'Erreur';
                break;
            default:
                className = 'label-danger';
                statusName = 'Error?';
                break;
        }
        return <span className={`label ${className} w-75 py-2`}>{statusName}</span>
    }

    // Fetch transaction of all offers
    fetchTransactions = async () => {
        this.setState({ loading: true });
        const res = await actions.fetchTransactions(this.state.currentPage, this.state.transPerPage)
            .catch((err) => console.log(err));
        if (res !== undefined)
            this.setState({ transactions: res });
        this.setState({ loading: false });
    }

    // Fetch transaction count
    fetchTransactionCount = async () => {
        const count = await actions.fetchTransactionsCount()
            .catch((err) => console.log(err));
        if (count !== undefined)
            this.setState({ totalItemsCount: count })
    }

    // Call fetch transaction on everyChange of the Pagination Component
    handlePageChange = (pageNumber) => {
        if (pageNumber === this.state.currentPage)
            return;
        this.setState({ currentPage: pageNumber, loading: true }, () => {
            debugger;
            return this.fetchTransactions();
        })
    }

    // Render the data in the table
    renderData = (data) => {
        return (
            <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.total} MAD</td>
                <td><a className="link-item" href={`/app/dashboard/transactions/${data.id}`}>{data.offer.title}</a></td>
                <td>{data.role.toUpperCase()}</td>
                <td>{dateService.getLocalDate(data.start_date)}</td>
                <td>{this.getStatusOfTransaction(data.etat)}</td>
            </tr>
        )
    }


    // Triggered once the component Mount
    componentDidMount() {
        console.log('something');
        this.fetchTransactionCount().then(() => this.fetchTransactions())

    }

    render() {
        if (this.state.loading)
            return <CentredSpinner />
        const { transactions } = this.state;
        return (
            <div className="panel p-4">
                <header className="panel-heading pb-4">
                    Table du transactions
                </header>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Total</th>
                            <th scope="col">Offre</th>
                            <th scope="col">Role</th>
                            <th scope="col">Date</th>
                            <th scope="col">Etat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((data) => this.renderData(data))
                        }
                    </tbody>
                </table>
                <Pagination
                    activePage={this.state.currentPage}
                    itemsCountPerPage={this.state.transPerPage}
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

export default TransactionTable;
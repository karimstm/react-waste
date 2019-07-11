import React, { Component } from 'react';
import TransactionTable from './TransactionTable';
import TransactionInfo from './TransactionInfo';

class TransactionBoard extends Component {
    render() {
        const { id } = this.props.match.params || false;
        return (
            <div className="m-4">
                <TransactionTable />
                <div className="my-5">
                    { id && <TransactionInfo {...this.props} /> }
                </div>
            </div>
        );
    }
}

export default TransactionBoard;
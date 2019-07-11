import React, { Component } from 'react';
import PaymentModal from '../shared/Model/PaymentModal'


class BillingBoard extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            modalShow: false,
        }
    }

    modalShow = () => {
        this.setState({ modalShow: true });
    }

    modalClose = () => {
        this.setState({ modalShow: false });
    }

    render() {
        return (
            <div className="payment m-4">
                <div className="my-5 text-dark">
                    <h3>Facturation et paiements</h3>
                </div>
                <div className="panel p-4">
                    <header className="panel-heading pb-4">
                        <span>Table du dépôts</span>
                        <button onClick={this.modalShow} className="float-right btn btn-sm text-white label-success">Faire un dépôt</button>
                    </header>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Méthode de dépôt</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>            
                </div>
                <PaymentModal
                        show={this.state.modalShow}
                        onHide={this.modalClose}
                 />
            </div>
        );
    }
}

export default BillingBoard;
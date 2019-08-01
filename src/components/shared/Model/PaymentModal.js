import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CreditCardForm from '../../Forms/CreditCardForm';

class PaymentModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            onHide: this.props.onHide
        }
    }

    // THis function to handle submit when chosing credit card

    payWithCreditCard = () => {
        return true;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show !== this.state.show)
            this.setState({ show: nextProps.show, onHide: nextProps.onHide });
    }

    render() {
        return (
            <Modal
                {...this.state}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="paymentModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Choisissez une méthode de dépôt
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="accordion" id="accordion">
                        <div className="card border-0">
                            <div className="card-header border-0" id="headingOne">
                                <h1>
                                    <label
                                        className="mx-3 text-left btn btn-block"
                                        icon={<i className='fas fa-credit-card'></i>}
                                        data-toggle="collapse"
                                        data-target="#card-one"
                                        aria-expanded="true"
                                        aria-controls="card-one"
                                    ><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked={true} />Carte de crédit</label>
                                </h1>
                            </div>
                            <div id="card-one" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body">
                                    <CreditCardForm submitCb={this.payWithCreditCard} />
                                </div>
                            </div>
                        </div>
                        <div className="card border-0">
                            <div className="card-header border-0" id="headingTwo">
                                <h1>
                                    <label
                                        className="mx-3 text-left btn btn-block"
                                        icon={<i className='fas fa-credit-card'></i>}
                                        data-toggle="collapse"
                                        data-target="#card-two"
                                        aria-expanded="true"
                                        aria-controls="card-two"
                                        htmlFor="exampleRadios2"
                                    ><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />Paypal</label>
                                </h1>
                            </div>
                            <div id="card-two" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div class="card-body" id="paypal-button-container">
                                    <input type="number" className="form-control" placeholder="Montant" />
                                    <button type="button" className="btn btn-primary text-white px-5 mt-3"><i class="fab fa-paypal"></i> PayPal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default PaymentModal;
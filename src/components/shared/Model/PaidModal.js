import React, { Component } from 'react';
import PaymentMethod from '../../Billing/PaymentMethod';
import { Modal } from 'react-bootstrap';

class PaidModal extends Component {
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
                dialogClassName="paidModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Choisissez une méthode de dépôt
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PaymentMethod />
                </Modal.Body>
            </Modal>
        );
    }
}

export default PaidModal;
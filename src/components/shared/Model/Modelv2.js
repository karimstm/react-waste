import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Modelv2 extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success shadow-sm rounded-0" onClick={this.props.onConfirm}>
                        {this.props.confirmText}
            </Button>
                    <Button variant="danger shadow-sm rounded-0" onClick={this.props.handleClose}>
                    Annuler
            </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Modelv2;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import CentredSpinner from '../shared/spinners/CentredSpinner';
import QRCode from 'qrcode.react';
import * as jsPDF from 'jspdf';


class TransactionInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            details: null,
            disabled: false,
            error: '',
            isError: null
        };
    }

    // Get the state of the transaction
    // This code is repeated in TransactionTable Component

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
        return (<span className={`label ${className} w-75 py-2`}>{statusName}</span>);
    };

    // Once the 'payment button' Clicked this function will be invoked

    ProcessTrans = async () => {
        this.setState({ disabled: true });
        const { id } = this.props.match.params;
        const res = await actions.payOffer(id)
            .catch((err) => console.log(err));
        if (res !== undefined)
            this.fetchTransactionDetails();
        this.setState({ disabled: false });
    };

    //Payment and Terminate button
    payAndTerminateButton = (role, status) => {
        const { id } = this.props.match.params;
        if (role === 'buyer' && status === 0)
            return <button onClick={this.ProcessTrans} type="button" className={`btn btn-sm btn-success text-white rounded-0 px-5 ${this.state.disabled && 'disabled'}`}>Payez</button>
        if (role === 'seller' && status === 1)
            return <Link to={`/app/dashboard/validate_transaction/${id}`} className={`btn btn-sm btn-danger text-white rounded-0 px-5 ${this.state.disabled && 'disabled'}`}>Terminate</Link>
        return '';
    };

    // Fetch deails of a specific transaction
    fetchTransactionDetails = async () => {
        const { id } = this.props.match.params;
        this.setState({ loading: true })
        const res = await actions.fetchTransactionDetails(id)
            .catch((err) => this.setState({ isError: true, error: err}))
        if (res !== undefined)
            this.setState({ details: res });
        this.setState({ loading: false });
    };


    download = () => {
        const canvas = document.getElementById("123456");
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
            // let downloadLink = document.createElement("a");
            const pdf = new jsPDF();
            pdf.addImage(pngUrl, 'PNG', 70, 100);
            pdf.save('Download.pdf');
            // downloadLink.href = pngUrl;
            // downloadLink.download = "123456.png";
            // document.body.appendChild(downloadLink);
            // downloadLink.click();
            // document.body.removeChild(downloadLink);
        }
    }

    renderError = () => {
        return (
            <div className="panel p-4">
                <header className="panel-heading pb-4">
                    { this.state.error }
                </header>
            </div>
        )
    }

    componentDidMount() {
        this.fetchTransactionDetails();
    }


    render() {
        if (this.state.isError)
            return this.renderError();
        if (!this.state.details || this.state.loading)
            return <CentredSpinner />
        const { details } = this.state;
        return (
            <div className="panel p-4">
                <header className="panel-heading pb-4">
                    Informations sur la transaction: <span className="mx-2">{details.offer.title}</span>
                </header>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="col">Identifiant</th>
                                    <td>{details.id}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Total</th>
                                    <td> {details.total} MAD</td>
                                </tr>
                                <tr>
                                    <th scope="col">Etat</th>
                                    <td>{this.getStatusOfTransaction(details.etat)}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Nom du client </th>
                                    <td className="text-uppercase"> {
                                        details.with && `${details.with.firstName} ${details.with.lastName}`
                                    } </td>
                                </tr>
                                <tr>
                                    <th scope="col">Role</th>
                                    <td className="text-uppercase"> {details.role} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        {
                            details.etat === 1 && <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th scope="col">Transaction QRCode</th>
                                        <td><QRCode id="123456" value={JSON.stringify({ transaction_id: details.id, start_date: details.start_date, offer_id: details.offer.id, key: details.key })} /></td>
                                    </tr>
                                    <tr>
                                        <th scope="col">PDF</th>
                                        <td><button className="btn btn-sm rounded-0 text-white label-danger" onClick={this.download}> Download QR Code </button></td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>
                    <div className="progressbar-container mt-3">
                        <ul className="progressbar">
                            <li className={details.etat >= 0 ? 'active' : ''} >Ouvert</li>
                            <li className={details.etat >= 1 ? 'active' : ''} >Payé</li>
                            <li className={details.etat === 2 ? 'active' : ''} >Terminé</li>
                        </ul>
                    </div>
                    <div className="w-100 text-right">
                        {this.payAndTerminateButton(details.role, details.etat)}
                    </div>
                </div>
            </div>
        );
    }
}


export default TransactionInfo;
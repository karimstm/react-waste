import React, { Component } from 'react';
import PaidModal from '../shared/Model/PaidModal';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CentredSpinner from '../shared/spinners/CentredSpinner';

class GetPaidBoard extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            modalShow: false,
            infos: this.props.userInfo
        }
    }

    modalShow = () => {
        this.setState({ modalShow: true });
    }

    modalClose = () => {
        this.setState({ modalShow: false });
    }

    fetchUserInfo = () => {
       this.props.dispatch(actions.fetchCurrentUserInfo())
       .then(() => {
           return this.setState({ infos: this.props.userInfo,  loading: false });
       })
    }

    componentDidMount () {
        this.fetchUserInfo();
    }
    
    render() {
        const { infos, loading } = this.state;
         if (loading)
             return <CentredSpinner />
        return (
            <div className="m-4">
                <div className="my-5 text-dark">
                    <h3>Être payé</h3>
                </div>
                <div className="panel p-4">
                    <header className="panel-heading pb-4">
                        <span>Balance</span>
                    </header>
                    <div className="row">
                        <div className="col-8 pl-0">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td scope="col"><h6>Votre solde est de</h6></td>
                                        <td><h6>{infos.balance} MAD</h6></td>
                                    </tr>
                                    <tr>
                                        <td scope="col"><h6>Votre solde en suspend</h6></td>
                                        <td><h6>{infos.onhold} MAD</h6></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4 text-right">
                            <button disabled type="button" className="btn text-white btn-sm mt-2 label-success rounded-0">Faites-vous payer maintenant</button>
                        </div>
                    </div>
                </div>
                <div className="my-5">
                    <div className="panel p-4">
                    <header className="panel-heading pb-4">
                        <span>Détails de paiement</span>
                        <button onClick={this.modalShow} className="float-right btn btn-sm text-white label-success rounded-0">Ajouter une méthode</button>
                    </header>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="bg-white"><h4 className="text-dark">Vous n'avez pas encore configuré de méthode de paiement.</h4></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <PaidModal
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                />
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        userInfo: state.userInfo.data
    }
}

export default connect(mapStateToProps)(GetPaidBoard);
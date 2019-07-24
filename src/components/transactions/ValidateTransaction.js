import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import { connect } from 'react-redux';
import { terminateTransaction } from '../../actions';
// import jsQR from 'jsqr';

class ValidateTransaction extends Component {


    constructor(props) {
        super(props);
        this.state = {
            result: null
        }
        this.fileRef = React.createRef();
    }

    onfileChnage = (e) => {
        console.log(e);
    };


    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            })
        }
    }

    handleError = err => {
        console.error(err)
    }

    validateTransaction = () => {
        if (this.state.result && typeof(JSON.parse(this.state.result)) === 'object') {
            this.props.terminateTransaction(this.props.match.params.id, this.state.result)
                .then(() => alert('success'))
                .catch(error => console.log(error));
        }
    }

    render() {
        return (
            <div className="m-4">
                <div className="panel p-4">
                    <div>
                        <QrReader
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: '100%' }}
                        />
                        <p className="border p-4 mt-2 bg-light">{this.state.result}</p>
                        <button type="btn" className="btn btn-block text-white rounded-0 label-danger" onClick={this.validateTransaction}>Valider</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trans: state.terminate
    }
}

export default connect(mapStateToProps, { terminateTransaction })(ValidateTransaction);
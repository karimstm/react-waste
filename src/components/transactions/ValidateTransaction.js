import React, { Component } from 'react';
import QrReader from 'react-qr-reader'

class ValidateTransaction extends Component {


    constructor(props) {
        super(props);
        this.state = {
            result: 'No Result'
        }

    }


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
                        <p>{this.state.result}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ValidateTransaction;
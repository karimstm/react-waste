import React, { Component } from 'react';

class Model extends Component {
    render() {
        return (
            <div className="modal fade" id="wasteModel" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{this.props.text}</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.props.handleAccept} type="button" className="btn btn-success">Procéder</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Model;
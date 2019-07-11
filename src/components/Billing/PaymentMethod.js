import React, { Component } from 'react';

class PaymentMethod extends Component {
    render() {
        return (
            <div>
                <h4 className="mt-0 mb-4">Recommended</h4>
                <ul className="payment-list list-unstyled">
                    <li className="media pb-4">
                        <img src="https://i.imgur.com/9lGJgYy.png" className="img-thumbnail mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0 mb-1">Payoneer <small className="text-muted">( Carte prépayée )</small> </h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                        <button type="button" className="text-right btn btn-sm rounded-0 label-success text-white" >Configuration</button>
                    </li>
                    <li className="media pb-4 my-4">
                        <img src="https://i.imgur.com/JpeWlPt.png" className="img-thumbnail mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0 mb-1">Directe vers la banque locale (MAD)</h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                        <button type="button" className="text-right btn btn-sm rounded-0 label-default text-white" >Configuration</button>

                    </li>
                    <li className="media pb-4 ">
                        <img src="https://i.imgur.com/2ixnAiN.png" className="img-thumbnail mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0 mb-1">PayPal</h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                        <button type="button" className="text-right btn btn-sm rounded-0 label-default text-white" >Configuration</button>                        
                    </li>
                </ul>
            </div>
        );
    }
}

export default PaymentMethod;
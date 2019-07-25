import React from 'react';
import PrivateHeader from './shared/Headers/PrivateHeader';
import Sidebar from './Profile/Sidebar';
import Cards from './Profile/Cards'
import UserProfile from './Profile/UserProfile';
import { Switch } from 'react-router-dom';
import ProtectedRoute from './shared/auth/ProtectedRoute';
import TransactionBoard from './transactions/TransactionBoard';
import BillingBoard from './Billing/BillingBoard';
import GetPaidBoard from './Billing/GetPaidBoard';
import ValidateTransaction from './transactions/ValidateTransaction';
import MyOffers from './dashboard/MyOffers';
import Chat from './chat/Chat';

function ProtectedLayout(props) {

    return (
        <div>
            <PrivateHeader logout={props.logout} />
                <div className="dashboard">
                    <div className="left-sidebar">
                        <Sidebar />
                    </div>
                    <div className="right-sidebar">
                        <Switch>
                            <ProtectedRoute exact path='/app/dashboard' component={Cards} />    
                            <ProtectedRoute exact path='/app/dashboard/messages' component={Chat} />
                            <ProtectedRoute exact path='/app/dashboard/profile' component={UserProfile} />
                            <ProtectedRoute exact path='/app/dashboard/my-offers' component={MyOffers} />
                            <ProtectedRoute exact path='/app/dashboard/transactions' component={TransactionBoard} />
                            <ProtectedRoute exact path='/app/dashboard/transactions/:id' component={TransactionBoard} />
                            <ProtectedRoute exact path='/app/dashboard/payments/deposit-methods' component={BillingBoard} />
                            <ProtectedRoute exact path='/app/dashboard/payments/disbursement-methods' component={GetPaidBoard} />
                            <ProtectedRoute exact path='/app/dashboard/validate_transaction/:id' component={ValidateTransaction} />
                        </Switch>
                    </div>
                </div>
        </div>
    );
}

export default ProtectedLayout;
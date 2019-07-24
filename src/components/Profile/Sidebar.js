import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div>
            <ul className="navbar-nav flex-column mt-2">
                <li className="nav-item"><Link to={{ pathname: '/app/dashboard' }} className="nav-link p-3 mb-2 current"><i className="fas fa-home text-light fa-lg mr-3"></i>Tableau de bord</Link></li>
                <li className="nav-item"><Link to={{ pathname: '/app/dashboard/profile'}} className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-user text-light fa-lg mr-3"></i>Profil</Link></li>
                <li className="nav-item"><Link to={{ pathname: '/app/dashboard/messages'}} className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-envelope text-light fa-lg mr-3"></i>Boîte de réception</Link></li>
                <li className="nav-item"><Link to="/app/dashboard/my-offers" className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-shopping-cart text-light fa-lg mr-3"></i>Mes offres</Link></li>
                <li className="nav-item"><Link to={{ pathname: '/app/dashboard/transactions' }} className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-file-alt text-light fa-lg mr-3"></i>Mes transactions</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-chart-line text-light fa-lg mr-3"></i>Analytique</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-chart-bar text-light fa-lg mr-3"></i>Charts</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-wrench text-light fa-lg mr-3"></i>Paramètres</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-book text-light fa-lg mr-3"></i>Documentation</Link></li>
                <li className="nav-item"><Link to={{ pathname: '/app/dashboard/payments/deposit-methods'}} className="nav-link p-3 mb-2 sidebar-link"><i className="fas fa-money-check text-light fa-lg mr-3"></i>Retrait</Link></li>
                <li className="nav-item"><Link to={{ pathname: '/app/dashboard/payments/disbursement-methods'}} className="nav-link p-3 mb-2 sidebar-link"><i className="far fa-credit-card text-light fa-lg mr-3"></i>Dépôt</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
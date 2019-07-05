import React from 'react';

function Sidebar(props) {
    return (
        <div>
            <ul class="navbar-nav flex-column mt-2">
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 current"><i class="fas fa-home text-light fa-lg mr-3"></i>Tableau de bord</a></li>
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 sidebar-link"><i class="fas fa-user text-light fa-lg mr-3"></i>Profil</a></li>
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 sidebar-link"><i class="fas fa-envelope text-light fa-lg mr-3"></i>Boîte de réception</a></li>
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 sidebar-link"><i class="fas fa-shopping-cart text-light fa-lg mr-3"></i>Mes offres</a></li>
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 sidebar-link"><i class="fas fa-money-check text-light fa-lg mr-3"></i>Mes transactions</a></li>
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 sidebar-link"><i class="fas fa-chart-line text-light fa-lg mr-3"></i>Analytique</a></li>
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 sidebar-link"><i class="fas fa-chart-bar text-light fa-lg mr-3"></i>Charts</a></li>
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 sidebar-link"><i class="fas fa-wrench text-light fa-lg mr-3"></i>Paramètres</a></li>
                <li class="nav-item"><a href="#" class="nav-link p-3 mb-2 sidebar-link"><i class="fas fa-file-alt text-light fa-lg mr-3"></i>Documentation</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
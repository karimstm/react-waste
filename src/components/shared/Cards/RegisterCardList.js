import React from 'react';
import RegisterCard from './RegisterCard';

function RegisterCardList(props) {
    return (
        <div>
            <h2 className="mb-5 text-center text-dark font-weight-light">Choisissez un plan approprié parmi ceux-ci</h2>
            <div className="row">
                <div className="col-lg-4">
                    <RegisterCard title="Collecteur" color="bg-danger" icon="truck-pickup" />
                </div>
                <div className="col-lg-4">
                    <RegisterCard title="Revendeur" color="bg-success" isActive={true} icon="people-carry" />
                </div>
                <div className="col-lg-4" >
                    <RegisterCard title="Acheteur" color="bg-warning" icon="cart-arrow-down"/>
                </div>
            </div>
        </div>
    );
}
export default RegisterCardList;
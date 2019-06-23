import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

function RegisterCard(props) {
    const {color, isActive, title, icon, value } = props;
    const [isRedirect, setIsRedirect] = useState(false);

    function handleClick() {
        setIsRedirect(true);
    }

    if (isRedirect)
        return (<Redirect to={{ pathname: '/register', state: { type : value } }} />);
    return (
        <div className={`card card-mine border-0 ${isActive && 'active'}`}>
            <div className={`card-header border-top border-light ${color}`}>
                <span><i className={`fas fa-${icon} text-white`}></i></span>
                <h5 className="card-title text-white font-weight-light my-2 text-center">{title}</h5>
            </div>
            <div className="card-body">
                <div className="card-subtitle font-weight-light text-black-50 border-bottom border-light pb-4">
                    <span>Si vous choisissez ce pack, vous pourrez effectuer les opérations suivantes:</span>
                </div>
                <ul className="list-group font-weight-light text-black-50 py-4 border-bottom border-light list-group-flush">
                        <li className="list-group-item borderless px-0 pb-0"><i className="fas fa-check text-success px-2"></i> lorem ipsume to so do with</li>
                        <li className="list-group-item borderless px-0 pb-0"><i className="fas fa-check text-success px-2"></i> lorem ipsume to so do with the</li>
                        <li className="list-group-item borderless px-0 pb-0"><i className="fas fa-check text-success px-2"></i> lorem ipsume to so do with the</li>
                        <li className="list-group-item borderless px-0 pb-0"><i className="fas fa-times text-danger px-2"></i> lorem ipsume to so do with the</li>
                </ul>
                <div className="text-center py-5">
                    <button onClick={handleClick} type="button" className="btn rounded-pill btn-block py-2 btn-outline-danger">FAISONS CELA</button>
                </div>
            </div>
        </div>
    );
}
export default RegisterCard;

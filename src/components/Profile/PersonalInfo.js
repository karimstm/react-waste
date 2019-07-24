import React, { Component } from 'react';

class PersonalInfo extends Component {
    render() {
        const { infos } = this.props;
        return (
            <div className="profile-tables card rounded-0 border-0 mt-2">
                <div className="card-header bg-white">
                    <h5 className="d-inline">À propos de moi</h5>
                    <button className="btn btn-success btn-sm float-right"><i className="far fa-edit"></i></button>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <table className="table mt-0">
                                <tbody>
                                    <tr>
                                        <th scope="row">Prénom</th>
                                        <td>{ infos.firstName.toUpperCase() }</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Nom</th>
                                        <td>{ infos.lastName.toUpperCase() }</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Emplacement</th>
                                        <td>{ `${infos.city.toUpperCase()}, ${infos.country.toUpperCase()}` }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-6">
                            <table className="table mt-0">
                                <tbody>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td>{ infos.email }</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Numéro de portable</th>
                                        <td>{ infos.phone }</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Type</th>
                                        <td> { infos.roles[0] } </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonalInfo;
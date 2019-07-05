import React, { Component } from 'react';

class PersonalInfo extends Component {
    render() {
        return (
            <div className="profile-tables card rounded-0 border-0 mt-2">
                <div className="card-header bg-white">
                    <h5 className="d-inline">À propos de moi</h5>
                    <button className="btn btn-success btn-sm float-right"><i class="far fa-edit"></i></button>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <table className="table mt-0">
                                <tbody>
                                    <tr>
                                        <th scope="row">Prénom</th>
                                        <td>ABDELKARIM</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Nom</th>
                                        <td>MOUTIK</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Date de naissance</th>
                                        <td>27 - 10 - 1994</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Emplacement</th>
                                        <td>KHOURIBGA, MA</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-6">
                            <table className="table mt-0">
                                <tbody>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td>amoutik@student.1337.ma</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Numéro de portable</th>
                                        <td>(0123) - 4567891</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Type</th>
                                        <td>REVENDEUR</td>
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
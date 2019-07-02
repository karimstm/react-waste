import React, { useState } from 'react';
import Modelv2 from './Model/Modelv2';

function getPosition(bidders, username)
{
    return new Promise((resolve) => {
        let result = -1;
        bidders.find((bidder, index) => {
        if(bidder.email == username)
            result = index;
    });
     resolve(result);
    })
}

function Position(props) {

    const [show, setShow] = useState(false);
    const { bidders } = props;

    return (
        <tr>
            <td>Votre Position</td>
            <td className="text-right text-muted">
                <div className="row">
                    <div className="col-6 text-info font-weight-bold">
                        17
                    </div>
                    <div className="col-6">
                        <button onClick={() => setShow(true)} className="btn-centred btn btn-sm btn-danger rounded-0">Quitter cette enchère</button>
                    </div>
                </div>
            </td>
            <Modelv2
                    show={show}
                    // onConfirm={placeBid}
                    handleClose={() => setShow(false)}
                    title="Bienvenue, à vous de jouer !"
                    text="Gardez à l'esprit que si votre position est la première de cette enchères,
                     vous perdrez ces frais si vous continuez."
                    confirmText="OUI JE SAIS"
                />
        </tr>
    );
};

export default Position
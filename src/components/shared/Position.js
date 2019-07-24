import React from 'react';
import Modelv2 from './Model/Modelv2';
import libService from '../../services/lib-service';


class Position extends React.Component {

    state = {
        isAccepted: false,
        isError: false,
        errMsg: '',
        show: false,
        index: 0
    }

    getPosition = (bidders, username) =>
    {
        let counter = 0;
        let flag = 0;
        bidders.find((bidder) => {
            if (!libService.isEmpty(bidder))
                counter++;
            if (!libService.isEmpty(bidder) && bidder.bidder.email === username)
                return flag = 1;
            return 0;
        });
        if (flag)
            this.setState({index : counter});
    }

    // Map leaveAuction methode in BindingOfferDetails.js
    leaveAuction = () => {
        this.props.leaveAuction()
        .then(() => {
            this.setState({show: false});
        })
        .catch(() => {
            this.setState({show: false});
        })
    }
    componentDidMount()
    {
        const { bidders, userInfo } = this.props;
        this.getPosition(bidders, userInfo.email);
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props.bidders.length !== nextProps.bidders.length)
            this.getPosition(nextProps.bidders, nextProps.userInfo.email);
    }
    
    render()
    {
        const { index, show } = this.state;
        if (index === 0 || !this.props.userInfo)
            return <React.Fragment></React.Fragment>
        return (
            <tr>
                <td>Votre Position</td>
                <td className="text-right text-muted">
                    <div className="row">
                        <div className="col-6 text-info font-weight-bold">
                            { index }
                        </div>
                        <div className="col-6">
                            <button onClick={() => this.setState({show: true})} className="btn-centred btn btn-sm btn-danger rounded-0">Quitter cette enchère</button>
                        </div>
                    </div>
                </td>
                <Modelv2
                        show={show}
                        onConfirm={this.leaveAuction}
                        handleClose={() => this.setState({show : false})}
                        title="Bienvenue, à vous de jouer !"
                        text="Gardez à l'esprit que si votre position est la première de cette enchères,
                        vous perdrez ces frais si vous continuez."
                        confirmText="OUI JE SAIS"
                    />
            </tr>
        );
    }
};

export default Position
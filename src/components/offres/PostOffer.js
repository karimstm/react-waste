import React, { Component } from 'react';
import OfferForm from './OfferForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import base64Service from '../../services/base64-service';
import Alert from '../shared/Alert';


class PostOffer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isError: false,
            errors: '',
            redirect: false
        }
    }

    submitOffre = (saleData) => {
        return new Promise((resolve, reject) => {
            base64Service.displayBase64String(saleData).then(
            (res) => {
                actions.post_sale_offer({ ...saleData, "photos": res }).then(
                    (registered) => {
                         this.setState({ redirect: true });
                         resolve(true);
                        },
                    (errors) => {
                        this.setState({ isError: true, errors: errors });
                        reject();
                    }
                )
            },
            (err) => {
                this.setState({ isError: true, errors: err });
            }
        )
        });
        
        
    }

    render() {
        const { redirect, isError, errors } = this.state;
        if (redirect) {
            return <Redirect to={{ pathname: '/offers', state: { successRegister: true } }} />
        }
        return (
            <section className="post-form col-8 mx-auto my-5 p-5">
                {isError ? <Alert className="danger" errors={Object.values(errors)} /> : ''}
                <OfferForm errors={errors} auction={(this.props.location.state && this.props.location.state.auction) ? true : false}  submitCb={this.submitOffre} categories={this.props.categories} />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories.data
    }
}

export default connect(mapStateToProps)(PostOffer);
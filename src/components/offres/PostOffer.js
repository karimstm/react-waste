import React, { Component } from 'react';
import OfferForm from './OfferForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import * as actions from '../../actions';

class PostOffer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isError: false,
            errors: '',
            redirect: false
        }
    }
    
    componentWillMount() {
        this.props.dispatch(actions.get_categories());
    }

    submitOffre = (saleData) => {
        actions.post_sale_offer(saleData).then(
            (registered) => {this.setState({redirect : true})},
            (errors) => { 
                this.setState({ isError: true, errors: errors});
            }
        )
    }

    render() {
        const { redirect, isError, errors } = this.state;
        if (redirect)
        {
            return <Redirect to={{ pathname: '/offers', state: { successRegister: true } }} />
        }    
        return (
            <section className="post-form col-8 mx-auto my-5 p-5">
                <OfferForm errors={errors} submitCb={this.submitOffre} categories={this.props.categories} />
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
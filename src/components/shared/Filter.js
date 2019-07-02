import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filter extends Component {
    render() {
        const { categories } = this.props;
        return (
            <div className="container-fluid mt-3">
                <form className="form-row form-review form filter-form">
                    <div className="form-group col-md-6">
                        <label className="pr-2" htmlFor="search">Recherche: </label>
                        <input type="text" className="form-control" id="search" placeholder="Recherche" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="category" className="pr-2">Category: </label>
                        <select id="category" className="form-control">
                            {categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.label}</option>
                            })}
                        </select>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        categories: state.categories.data,
    }
}

export default connect(mapStateToProps)(Filter);
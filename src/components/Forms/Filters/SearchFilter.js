import React, { Component } from 'react';

class SearchFilter extends Component {
    render() {
        return (
            <form className="post-form global-forms">
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Recherche" />
                    </div>
                    <div className="col">
                        <select className="form-control">
                            <option>Option1</option>
                            <option>Option2</option>
                            <option>Option3</option>
                            <option>Option4</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="number" className="form-control" placeholder="Prix" />
                    </div>
                    <div className="col text-center pt-2">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Active ?
                        </label>
                    </div>
                    <div className="col">
                        <button type="submit" className="text-white rounded-0 font-weight-light btn btn-warning mb-2">Confirm identity</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchFilter;
import React, { Component } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position: absolute;
    height: 100px;
    width: 100px;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
`;

class Spinner extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true
        }
    }
    
    render() {
        return (
                <div className='sweet-loading'>
                    <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={50}
                        color={'#36D7B7'}
                        loading={this.state.loading}
                    />
                </div>
        );
    }
}

export default Spinner;
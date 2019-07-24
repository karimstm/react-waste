import { FETCH_CURRENT_USER_OFFER, FETCH_CURRENT_USER_AUCTIONS } from '../actions/types';
import _ from 'lodash';

export const myOffersReducers = (state = {}, action) => {
    switch(action.type)
    {
        case FETCH_CURRENT_USER_OFFER:
            return {..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
}

export const myAuctionReducer = (state = {}, action) => {
    switch(action.type)
    {
        case FETCH_CURRENT_USER_AUCTIONS:
            return {..._.mapKeys(action.payload, 'id')};
        default:
            return state;
    }
}
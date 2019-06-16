import { 
    FETCH_CATEGORIES_FAIL,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_SALES_FAILURE,
    FETCH_SALES_SUCCESS
} from '../actions/types';



const INITIAL_STATE = {
    categories: {
        data: [],
        errors: []
    }
}


export const categoryReducer = (state = INITIAL_STATE.categories, action) => {
    switch(action.type)
    {
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, data: action.categories};
        case FETCH_CATEGORIES_FAIL:
            return Object.assign({}, state, {errors: action.errors, data: []});
        default:
            return state;
    }
}

const INITIAL_STATE_OFFER_SATE = {
        salesoffer : {
        data: [],
        errors: []
    }
}

export const offerSalesReducer = (state = INITIAL_STATE_OFFER_SATE.salesoffer, action) => {

    switch(action.type)
    {
        case FETCH_SALES_SUCCESS:
            return {...state, data: action.salesoffer};
        case FETCH_SALES_FAILURE:
            return Object.assign({}, state, {errors: action.errors, data: []});
        default: 
            return state;
    }
}
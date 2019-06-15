import { 
    FETCH_CATEGORIES_FAIL,
    FETCH_CATEGORIES_SUCCESS,
    SALE_FAILURE,
    SALE_SUCCESS
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

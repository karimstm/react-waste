import 
{ FETCH_USER_INFO_FAILURE, FETCH_USER_INFO_SUCCESS }
 from '../actions/types';

 const INITIAL_STATE = {
    userInfo: {
        data: [],
        errors: []
    } 
}

export const userInfoReducer = (state = INITIAL_STATE.userInfo, action) => {
    switch(action.type)
    {
        case FETCH_USER_INFO_SUCCESS:
            const data = {...state, data: action.userInfo};
            return data;
        case FETCH_USER_INFO_FAILURE:
            return Object.assign({}, state, {errors: action.errors, data: []});
        default:
            return state;
    }
}
import
{
    TERMINATE_TRANS_SUCCESS,
    TERMINATE_TRANS_FAILURE
} from '../actions/types';

export const terminateTransReducer = (state = {}, actions) => 
{
    switch(actions.type)
    {
        case TERMINATE_TRANS_SUCCESS:
            return { ...state, ...actions.payload };
        case TERMINATE_TRANS_FAILURE:
            return { ...state, ...actions.error };
        default:
            return state;
    }
}
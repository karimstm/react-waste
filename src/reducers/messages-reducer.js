import { MESSAGES_FETCH_SUCCESS, MESSAGE_SENT_SUCCESS } from '../actions/types'

export const messagesReducer = (state = {data: []}, action) => {
    switch(action.type)
    {
        case MESSAGE_SENT_SUCCESS:
            return { ...state };
        case MESSAGES_FETCH_SUCCESS:
            return { ...state, data: action.payload.reverse()};
        default:
            return state;
    }
}
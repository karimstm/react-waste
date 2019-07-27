import 
{ 
FETCH_USER_INFO_FAILURE,
FETCH_USER_INFO_SUCCESS,
FETCH_NOTIFICATION_FAILURE,
FETCH_NOTIFICATION_SUCCESS,
FETCH_MESSAGES_FAILURE,
FETCH_MESSAGES_SUCCESS, 
EDIT_MESSAGES_SUCCESS,
EDIT_NOTIFICATION_SUCCESS,
MERCURE_NOTIFICATION_UPDATE,
FETCH_USER_SUCCESS,
MERCURE_MESSAGE_UPDATE
}
 from '../actions/types';

 const INITIAL_STATE = {
    userInfo: {} 
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

const INITIAL_STATE_NOTIFICATION = {
    notifications: {
    }
}

export const userNotificationsReducer = (state = INITIAL_STATE_NOTIFICATION.notifications, action) => {

    switch(action.type)
    {
        case FETCH_NOTIFICATION_SUCCESS:
            return {...state, data: action.notifications}
        case FETCH_NOTIFICATION_FAILURE:
            return {...state, errors: action.errors};
        case EDIT_NOTIFICATION_SUCCESS:
            return { ...state }
        case MERCURE_NOTIFICATION_UPDATE:
            return { ...state, data: [action.payload, ...state.data] };
        default:
            return state;
    }
}

export const userMessagesReducer = (state = { messages: { } }.messages, action) => {

    switch(action.type)
    {
        case FETCH_MESSAGES_SUCCESS:
            return {...state, data: action.messages};
        case FETCH_MESSAGES_FAILURE:
            return {...state, errors: action.errors};
        case EDIT_MESSAGES_SUCCESS:
            return { ...state }
        case MERCURE_MESSAGE_UPDATE:
                return {total_not_seen: "1", messages: [...state.data.messages, action.payload]};
        default:
            return state;
    }

}

export const fetchUserDataReducer = (state = {}, action) => {
    switch(action.type)
    {
        case FETCH_USER_SUCCESS:
            return { ...state, data: action.payload }
        default:
            return state;
    }
}
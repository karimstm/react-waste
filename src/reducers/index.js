import * as redux from 'redux'
import { userReducer } from './user-reducer'
import { reducer as formReducer } from 'redux-form'

export const init = () => {

    const reducer = redux.combineReducers({
        users: userReducer,
        form: formReducer
    });

    const store = redux.createStore(reducer);
    return store;
}
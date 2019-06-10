import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { authReducer } from './auth-reducer'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'

export const init = () => {

    const reducer = combineReducers({
        auth: authReducer,
        form: formReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}
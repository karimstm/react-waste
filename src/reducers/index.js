import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { authReducer } from './auth-reducer'
import { userInfoReducer } from './user-reducer';
import { categoryReducer, offerSalesReducer, offerDetailsReducer } from './offer-reducer'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'

export const init = () => {

    const reducer = combineReducers({
        categories: categoryReducer,
        salesoffer: offerSalesReducer,
        offerDetails: offerDetailsReducer,
        auth: authReducer,
        form: formReducer,
        userInfo: userInfoReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}
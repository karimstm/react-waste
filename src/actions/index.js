import axios from 'axios'
import authService from '../services/auth-service'
import axiosService from '../services/axios-service'

import {
    DEFALUT_URL,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    FETCH_CATEGORIES_FAIL,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_SALES_FAILURE,
    FETCH_SALES_SUCCESS,
    FETCH_OFFER_FAILURE,
    FETCH_OFFER_SUCCESS,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_FAILURE,

} from './types'

const headers = { 'Content-Type': 'application/json' }

// Auth Actions ------------------

const axiosInstance = axiosService.getInstance();

export const register = (userData) => {

    return axios.post(`${DEFALUT_URL}/api/register`,
        {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            city: userData.city,
            address: userData.address,
            country: userData.country,
            phone: userData.phone,
            type: userData.types

        }, { headers: headers }).then(
            (res) => res.data,
            (err) => Promise.reject(err.response.data.extras));
}

const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const checkAuthState = () => {
    return dispatch => {
        if (authService.isAuthenticated()) {
            dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {
    return dispatch => {
        return axios.post(`${DEFALUT_URL}/api/auth`,
            userData, { headers: headers })
            .then(res => res.data)
            .then(token => {
                authService.saveToken(token.token);
                dispatch(loginSuccess());
            })
            .catch(err => {
                dispatch(loginFailure(err.response.data.message));
            })
    }
}

export const logout = () => {
    authService.invalidateUser();
    return {
        type: LOGOUT
    }
}

// Category contents

const fetchCategoriesSucces = (categories) => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        categories
    }
}

const fetchCategoriesFail = (errors) => {
    return {
        type: FETCH_CATEGORIES_FAIL,
        errors
    }
}

export const get_categories = () => {

    return dispatch => {
        return axios.get(`${DEFALUT_URL}/api/categories`,
            { headers: headers })
            .then(res => { return res.data })
            .then(categories => dispatch(fetchCategoriesSucces(categories)))
            .catch(({ response }) => dispatch(fetchCategoriesFail(response.data.extras)))
    }
}


// Post a sale offer

export const post_sale_offer = (saleData) => {
    let role = authService.getRoles(authService.getToken());
    let link = 'auction';

    if (saleData.isAuction === false) {
        debugger ;
        switch (role) {
            case authService.isPicker():
                link = 'sale';
                break;
            case authService.isReseller():
                link = 'purchase';
                break;
            case authService.isBuyer():
                link = 'bulk_purchase';
                break;
            default:
                link = 'sale';

        }
    }
    return axiosInstance.post(`/offers`,
        {
            title: saleData.title,
            description: saleData.description,
            price: saleData.price,
            category: { "id": saleData.category },
            withTransport: saleData.withTransport,
            weight: saleData.weight,
            locations: saleData.locations.split('\n'),
            keywords: saleData.keywords.split(','),
            photos: saleData.photos,
            type: link,
            end_price: saleData.end_price

        }).then(
            (res) => res.data,
            (err) => {
                if (err.response.status === 403)
                    return Promise.reject(err.response.data.extras)
                else
                    return Promise.reject(err.response.data.message)
            }
        );
}


// Fetch all Offers

export const fetchOffers = (type, page) => {

    return axios.get(`${DEFALUT_URL}/api/offers/${type}`, 
        { params: {page: page}, headers: headers })
        .then(res => res.data)
        .catch(err => {
            if (err.response.status === 401)
                return Promise.reject(err.response.data.extras);
            else if (err.response.status === 404)
                    return Promise.resolve([]);
            return Promise.reject('Échec de la récupération des données');
        })
}

// Fetch a single offer by Id

const fetchOfferSucces = (offerDetails) => {
    return {
        type: FETCH_OFFER_SUCCESS,
        offerDetails
    }
}

const fetchOfferFail = (errors) => {
    return {
        type: FETCH_OFFER_FAILURE,
        errors
    }
}

export const fetchOfferById = (id) => {
    return dispatch => {
        return axios.get(`${DEFALUT_URL}/api/offers/${id}`,
        { headers: headers }
        ).then(res => res.data)
        .then(offerDetails => dispatch(fetchOfferSucces(offerDetails)))
        .catch(({ response }) => {
            debugger ;
            dispatch(fetchOfferFail(response.data.errors))
        })
    }
}


// FETCH CURRENT USER INFO

const fetchUserSuccess = (userInfo) => {
    return {
        type: FETCH_USER_INFO_SUCCESS,
        userInfo
    }
}

const fetchUserFail = (errors) => {
    return {
        type: FETCH_USER_INFO_FAILURE,
        errors
    }
}

export const fetchCurrentUserInfo = () => {
    return dispatch => {
        return axiosInstance.get(`current/infos`,
            { headers: headers }
        ).then(res => res.data)
            .then(userInfo => dispatch(fetchUserSuccess(userInfo)))
            .catch(({ response }) => dispatch(fetchUserFail(response.data.message)))
    }
}

// Accept an offer


export const acceptAnOffer = (id) => {
    return axiosInstance.patch(`/offers/${id}/accept`, 
    {headers: headers})
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.message));
}

export const acceptBid = (id, bid_price) => {
    return axiosInstance.patch(`offers/${id}/accept`,
    {
        "bid_price": bid_price
    })
    .then(res => res.data)
    .catch(({response}) => 
    {
        return Promise.reject(response.data.message)
    });
}
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
    FETCH_SALES_SUCCESS
} from './types'
import { DEFAULT_ECDH_CURVE } from 'tls';

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
        return axios.get(`${DEFALUT_URL}/api/public/categories`,
            { headers: headers })
            .then(res => { return res.data })
            .then(categories => dispatch(fetchCategoriesSucces(categories)))
            .catch(({ response }) => dispatch(fetchCategoriesFail(response.data.extras)))
    }
}


// Post a sale offer


// const postSaleFailure = (errors) => {
//     return {
//         type: SALE_FAILURE,
//         errors
//     }
// }

// const postSaleSuccess = (saleData) => {
//     return {
//         type: SALE_SUCCESS
//     }
// }

export const post_sale_offer = (saleData) => {
    let   role = authService.getRoles(authService.getToken());
    let link = 'sale';
    switch(role)
    {
        case authService.isPicker():
            link = 'sale';
            break;
        case authService.isReseller():
            link = 'purchase';
            break;
        case authService.isBuyer():
            link = 'bulk_purchase';
            break;
    }
    return axiosInstance.post(`${DEFALUT_URL}/api/offer/${link}`,
        {
            title: saleData.title,
            description: saleData.description,
            price: saleData.price,
            category: { "id": saleData.category },
            withTransport: saleData.withTransport,
            weight: saleData.weight,
            locations: saleData.locations.split('\n'),
            keywords: saleData.keywords.split(','),
            photos: saleData.photos

        }).then(
            (res) => res.data,
            (err) => {
                if (err.response.data.status === 401)
                    return Promise.reject(err.response.data.extras)
                else
                    return Promise.reject(err.response.data.message)
            }
        );
}


// Fetch all Offers


const fetchSaleFailure = (errors) => {
    return {
        type: FETCH_SALES_FAILURE,
        errors
    }
}

const fetchSaleSuccess = (salesoffer) => {
    return {
        type: FETCH_SALES_SUCCESS,
        salesoffer
    }
}


export const fetchOffers = () => {
    
    return dispatch => {
        return axios.get(`${DEFALUT_URL}/api/public/offers/sale`,
            { headers: headers })
            .then(res => res.data)
            .then(salesoffer => dispatch(fetchSaleSuccess(salesoffer)))
            .catch(err => dispatch(fetchSaleFailure(err.response.data.message)))
    }
}

// Fetch a single offer by Id

/*
export const fetchOfferById = (id) => {
    return dispatch => {
        return axios.patch(`${DEFALUT_URL}/api/public/offers/${id}`,
        { headers: headers }
        ).then(res => res.data)
        .then(offerDetail => dispatch(fetchOfferSucces(offerDetail)))
        .catch(({ response }) => dispatch(fetchOfferFail(response.data.errors)))
    }
}

*/
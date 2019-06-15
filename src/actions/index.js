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
    SALE_FAILURE,
    SALE_SUCCESS
                    } from './types'

// Auth Actions ------------------

const axiosInstance = axiosService.getInstance();

export const register = (userData) => {
    let headers = {
        'Content-Type': 'application/json',
    }
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
        type:userData.types

    }, {headers: headers}).then(
       (res) => res.data,
       (err) => {
           console.log(err.response.data.errors);
           return Promise.reject(err.response.data.errors)
       });
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
    let headers = {
        'Content-Type': 'application/json',
    }
    return dispatch => {
        return axios.post(`${DEFALUT_URL}/api/auth`,
        userData, {headers: headers})
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
    let headers = {
        'Content-Type': 'application/json'
    }
    return dispatch => {
        return axios.get(`${DEFALUT_URL}/api/public/categories`,
         {headers: headers})
         .then(res => { return res.data})
         .then(categories => dispatch(fetchCategoriesSucces(categories)))
         .catch(({response}) => dispatch(fetchCategoriesFail(response.data.errors)))
    }
}


// Post a sale offer


const postSaleFailure = (errors) => {
    return {
        type: SALE_FAILURE,
        errors
    }
}

const postSaleSuccess = (saleData) => {
    return {
        type: SALE_SUCCESS
    }
}


export const post_sale_offer = (saleData) => {

    return axiosInstance.post(`${DEFALUT_URL}/api/offer/sale`,
    {
        title: saleData.title,
        description: saleData.description,
        price: saleData.price,
        category: {"id": saleData.category},
        withTransport: saleData.withTransport,
        weight: saleData.weight,
        locations: saleData.locations.split('\n'),
        keywords: saleData.keywords.split(',')

    }).then(
       (res) => res.data,
       (err) => Promise.reject(err.response.data.errors)
    );
}
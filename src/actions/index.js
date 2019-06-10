import axios from 'axios'
import authService from '../services/auth-service'
import { 
    DEFALUT_URL,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
                    } from './types'

// Auth Actions ------------------



export const register = (userData) => {
    let headers = {
        'Content-Type': 'application/json',
    }
    return axios.post(`${DEFALUT_URL}/${userData.types}`,
    {
        email: userData.email,
        password: userData.password,
        prenom: userData.firstName,
        nom: userData.lastName,
        ville: userData.city,
        addresse: userData.address,
        pays: userData.country,
        telephone: userData.phone

    }, {headers: headers}).then(
       (res) => res.data,
       (err) => Promise.reject(err.response.data.message))
}

const loginSuccess = () => {
    debugger ;
    return {
        type: LOGIN_SUCCESS
    }
}

const loginFailure = (errors) => {
    debugger ;
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const checkAuthState = () => {
    return dispatch => {
        debugger ;
        if (authService.isAuthenticated()) {
            dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {
    let headers = {
        'Content-Type': 'application/json',
    }
    debugger ;
    return dispatch => {
        return axios.post(`${DEFALUT_URL}/api/auth`,
        userData, {headers: headers})
        .then(res => res.data)
        .then(token => {
            localStorage.setItem('auth_token', token.token);
            dispatch(loginSuccess());
        })
        .catch(err => {
            dispatch(loginFailure(err.response.data.message));
        })
    }
}
import axios from 'axios'
import authService from '../services/auth-service'
import axiosService from '../services/axios-service'
import Cookies from 'js-cookie';

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
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILURE,
    DEFALUT_URL_HUB,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE

} from './types'
import { awaitExpression } from '@babel/types';

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
                if (err.response === undefined)
                    return dispatch(loginFailure('Il y a une erreur, vérifiez votre réseau'));
                return dispatch(loginFailure(err.response.data.message));
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
            .catch(({ response }) => {
                try {
                    return dispatch(fetchCategoriesFail(response.data.extras));
                } catch
                {
                    return Promise.reject('');
                }
            })
    }
}


// Post a sale offer

export const post_sale_offer = (saleData) => {
    let role = authService.getRoles(authService.getToken());
    let link = 'auction';

    if (saleData.isAuction === false) {
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
        { params: { page: page }, headers: headers })
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
                try{
                    return dispatch(fetchOfferFail(response.data.errors))
                } catch {
                    return Promise.reject('');
                }
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
            .then(userInfo => {
                authService.saveToken(userInfo.mercure_token, 'mercure_token');
                return dispatch(fetchUserSuccess(userInfo))
            })
            .catch(err => {
                debugger ;
                try {
                    return dispatch(fetchUserFail(err.response.data.message));
                } catch {
                    return Promise.reject('');
                }
            })
    }
}

// Accept an offer


export const acceptAnOffer = (id, offerWeight) => {
    return axiosInstance.patch(`/offers/${id}/accept`,
        { "weight": offerWeight })
        .then(res => res.data)
        .catch(err => {
            try {
                return Promise.reject(err.response.data.message);
            } catch
            {
                return Promise.reject('');
            }
        });
}

export const acceptBid = (id, bid_price) => {
    return axiosInstance.patch(`offers/${id}/accept`,
        {
            "bid_price": bid_price
        })
        .then(res => res.data)
        .catch(({ response }) => {
            return Promise.reject(response.data.message)
        });
}

/* ======= Leaving auction methode ======== */

export const leaveAuction = (id) => {
    return axiosInstance.patch(`auction/${id}/leave`)
        .then(res => res.data)
        .catch(err => {
            return Promise.reject(err.response.data.message);
        })
}

/* ======= Get current user notification ========= */

const notifiactionSuccess = (notifications) => {
    return {
        type: FETCH_NOTIFICATION_SUCCESS,
        notifications
    }
}

const notificationFailure = (errors) => {
    return {
        type: FETCH_NOTIFICATION_FAILURE,
        errors
    }
}

export const getNotifications = () => {
    return dispatch => {
        return axiosInstance.get(`current/notifications`
        ).then(res => res.data)
            .then(notifications => dispatch(notifiactionSuccess(notifications)))
            .catch(err => dispatch(notificationFailure(err.response.data.message)))
    }
}


/* ========= Notification is seen ========== */

export const notificationsSeen = () => {
    return axiosInstance.patch(`current/notifications/seen`)
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.data.message));
}

/* ======= Fetch Message of the current user ========= */

const messagesSuccess = (messages) => 
{
    return {
        type: FETCH_MESSAGES_SUCCESS,
        messages,
    }
}

const messagesFailure = (errors) => {
    return {
        type: FETCH_MESSAGES_FAILURE,
        errors
    }
}

export const fetchUserMessages = () => {
    return dispatch => {
        return axiosInstance.get(`current/messages`)
        .then(res => res.data)
        .then(messages => dispatch(messagesSuccess(messages)))
        .catch(err => {
            try{
                return dispatch(messagesFailure(err.response.data.message));
            }
            catch {
                return Promise.reject('');
            }
        })
    }
}

/* ============ Post a feedback ========== */

export const postFeedback = (toReciever, message, rate) => {
    return axiosInstance.post(`profiles/${toReciever}/feedback`,
    {
        "message": message,
        "rate": rate
    })
    .then(res => res.data.message)
    .catch(() => {
        return Promise.reject('Vous ne pouvez pas poster vos commentaires, assurez-vous d\'être connecté');
    })
}

/* ========== Retrieve Feedbacks =========== */

export const fetchFeedbacks = (userEmail) => {
    return axios.get(`/api/profiles/${userEmail}/feedbacks`)
    .then(res => res.data)
    .catch(() => {
        return Promise.reject('No Feedback recieved');
    })
}

/* ========= Message Seen post request ========== */


export const messagesSeen = () => {
    return axiosInstance.patch(`current/messages/seen`)
    .then(res => res.data)
    .catch(() => Promise.reject('Could not set messages as seen'));
}

/* ========= Retrieve Transaction List from the database ======== */

export const fetchTransactions = (page, limit) => {
    return axiosInstance.get(`current/transactions?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch((err) => Promise.reject(err.response.data.message))
}

/* ========== Fetch Transaction count =========== */

export const fetchTransactionsCount = () => {
    return axiosInstance.get('current/transactions/count')
    .then(res => res.data.extras.count)
    .catch(() => Promise.reject('Failed to retrieve transactions count'))
}


/* ======== Fetch Transaction details =========== */

export const fetchTransactionDetails = (id) => {
    return axiosInstance.get(`current/transactions/${id}`)
    .then(res => res.data)
    .catch((err) => Promise.reject(err.response.data.message))
    .catch(() => Promise.reject('Quelque chose se passe mal!'))
}

/* ========= Pay an offer =============== */

export const payOffer = (id) => {
    return axiosInstance.patch(`current/transactions/${id}/pay`)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.message))
    .catch(() => Promise.reject('Erreur lors du traitement de ce paiement')); // If this happend we're in no good
}
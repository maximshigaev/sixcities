import {sendUserData, requestAuth} from '../api.js';

const SUCCESS_STATUS = 200;
const UNAUTHORIZED_STATUS = 401;

const authStatusRequest = () => {
    return {
        type: `AUTH_STATUS_REQUEST`
    }
}

const authStatusSuccess = (email) => {    
    return {
        type: `AUTH_STATUS_SUCCESS`,
        payload: email
    }
}

const authStatusUnauthorized = () => {
    return {
        type: `AUTH_STATUS_UNAUTHORIZED`
    }
}

const authStatusFail = () => {
    return {
        type: `AUTH_STATUS_FAIL`
    }
}

const fetchAuthStatus = () => (dispatch) => {
    dispatch(authStatusRequest());

    requestAuth()
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(authStatusSuccess(res.data.email));
            }
        })
        .catch((err) => {
            if(err.response.status === UNAUTHORIZED_STATUS) {
                dispatch(authStatusUnauthorized());
            } else {
                dispatch(authStatusFail());
            }
        })
}

const fetchAuthRequest = () => {    
    return {
        type: `FETCH_AUTH_REQUEST`
    };
}

const fetchAuthSuccess = (email) => {
    return {
        type: `FETCH_AUTH_SUCCESS`,
        payload: email
    };
}

const fetchAuthFail = () => {
    return {
        type: `FETCH_AUTH_FAIL`
    };
}

const fetchAuth = (userData) => (dispatch) => {
    dispatch(fetchAuthRequest());
    
    sendUserData(userData)
        .then((res) => {    
            if(res.status === SUCCESS_STATUS) {
                dispatch(fetchAuthSuccess(res.data.email));
            }
        })
        .catch(() => dispatch(fetchAuthFail()))
}

export {fetchAuth, fetchAuthStatus};

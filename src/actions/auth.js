import {sendUserData, requestAuth} from '../api.js';

const SUCCESS_STATUS = 200;

const authStatusSuccess = (email) => {    
    return {
        type: `AUTH_STATUS_SUCCESS`,
        payload: email
    }
}

const authStatusFail = () => {
    return {
        type: `AUTH_STATUS_FAIL`
    }
}

const fetchAuthStatus = () => (dispatch) => {
    requestAuth()
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(authStatusSuccess(res.data.email));
            } else {
                dispatch(authStatusFail());
            }
        })
        .catch(() => dispatch(authStatusFail()))
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
            } else {
                dispatch(fetchAuthFail());
            }
        })
        .catch(() => dispatch(fetchAuthFail()))
}

export {fetchAuth, fetchAuthStatus};

import {sendUserData} from '../api.js';

const SUCCESS_STATUS = 200;

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

export default fetchAuth;

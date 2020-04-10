import {getOffers, sendUserData, getComments} from './api.js';

const fetchOffersRequest = () => {
    return {
        type: `FETCH_OFFERS_REQUEST`
    };
}

const fetchOffersSuccess = (offers) => {
    return {
        type: `FETCH_OFFERS_SUCCESS`,
        payload: {
            offers,
            activeCity: offers[Math.floor(Math.random() * offers.length)].city.name
        }
    };
}

const fetchOffersFail = () => {
    return {
        type: `FETCH_OFFERS_FAIL`
    };
}

const fetchOffers = () => (dispatch) => {
    dispatch(fetchOffersRequest());

    getOffers()
        .then((res) => {
            if(res.status === 200) {
                dispatch(fetchOffersSuccess(res.data));
            } else {
                dispatch(fetchOffersFail());
            }
        })
        .catch(() => dispatch(fetchOffersFail()))
}

const sortBy = (sortingType) => {
    return {
        type: `SORT_BY`,
        payload: sortingType
    };
}

const activeCityChange = (city) => {
    return {
        type: `ACTIVE_CITY_CHANGE`,
        payload: city
    }
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
            if(res.status === 200) {
                dispatch(fetchAuthSuccess(res.data.email));
            } else {
                dispatch(fetchAuthFail());
            }
        })
        .catch(() => dispatch(fetchAuthFail()))
}

const focusCard = (id) => {
    return {
        type: `FOCUS_CARD`,
        payload: id
    }
}

const blurCard = () => {
    return {
        type: `BLUR_CARD`
    }
}

const fetchCommentsRequest = () => {
    return {
        type: `FETCH_COMMENTS_REQUEST`
    }
}

const fetchCommentsSuccess = (comments) => {
    return {
        type: `FETCH_COMMENTS_SUCCESS`,
        payload: comments
    }
}

const fetchCommentsFail = () => {
    return {
        type: `FETCH_COMMENTS_FAIL`
    }
}

const fetchComments = (id) => (dispatch) => {
    dispatch(fetchCommentsRequest());

    getComments(id)
        .then((res) => {
            if(res.status === 200) {
                dispatch(fetchCommentsSuccess(res.data));
            } else {
                dispatch(fetchCommentsFail());
            }
        })
        .catch(() => dispatch(fetchCommentsFail()))
}

const setCurrentHotel = (hotel) => {

    return {
        type: `SET_CURRENT_HOTEL`,
        payload: hotel
    }
}

export {fetchOffers, sortBy, fetchAuth, activeCityChange, focusCard, blurCard, fetchComments, setCurrentHotel};

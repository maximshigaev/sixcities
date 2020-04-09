import {getOffers, sendUserData} from './api.js';

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
        .then((res) => dispatch(fetchOffersSuccess(res.data)))
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

const fetchAuthSuccess = (data) => {
    return {
        type: `FETCH_AUTH_SUCCESS`,
        payload: data
    };
}

const fetchAuthFail = () => {
    return {
        type: `FETCH_AUTH_FAIL`
    };
}

const fetchAuth = (email, password) => (dispatch) => {
    dispatch(fetchAuthRequest());

    sendUserData(email, password)
        .then((res) => res)
        .then((data) => dispatch(fetchAuthSuccess(data)))
        .catch(() => dispatch(fetchAuthFail()))
}

export {fetchOffers, sortBy, fetchAuth, activeCityChange};

import getOffers from './api.js';

const fetchOffersRequest = () => {
    return {
        type: `FETCH_OFFERS_REQUEST`
    };
}

const fetchOffersSuccess = (offers) => {
    return {
        type: `FETCH_OFFERS_SUCCESS`,
        payload: offers
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
        .then((res) => res)
        .then((data) => dispatch(fetchOffersSuccess(data)))
        .catch(() => dispatch(fetchOffersFail()))
}

export default fetchOffers;

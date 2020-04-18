const SUCCESS_STATUS = 200;

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

const fetchOffers = () => (dispatch, getState, Api) => {
    dispatch(fetchOffersRequest());

    return new Api().getOffers()
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(fetchOffersSuccess(res.data));
            }
        })
        .catch(() => dispatch(fetchOffersFail()))
}

export default fetchOffers;

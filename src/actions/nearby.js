const SUCCESS_STATUS = 200;

const fetchNearbyRequest = () => {
    return {
        type: `FETCH_NEARBY_REQUEST`
    };
}

const fetchNearbySuccess = (nearbyHotels) => {
    return {
        type: `FETCH_NEARBY_SUCCESS`,
        payload: nearbyHotels
    };
}

const fetchNearbyFail = () => {
    return {
        type: `FETCH_NEARBY_FAIL`
    };
}

const fetchNearbyHotels = (id) => (dispatch, getState, Api) => {
    dispatch(fetchNearbyRequest());

    return new Api().getNearbyHotels(id)
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {                
                dispatch(fetchNearbySuccess(res.data));
            }
        })
        .catch(() => dispatch(fetchNearbyFail()))
}

export default fetchNearbyHotels;

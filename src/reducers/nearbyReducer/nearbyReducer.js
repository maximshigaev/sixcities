const initialState = {
    nearbyHotels: [],
    isNearbyLoading: false,
    isNearbyError: false
}

const nearbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_NEARBY_REQUEST`:
            return {
                ...state,
                nearbyHotels: [],
                isNearbyLoading: true,
                isNearbyError: false
            }

        case `FETCH_NEARBY_SUCCESS`:
            return {
                ...state,
                nearbyHotels: action.payload.slice(0, 3),
                isNearbyLoading: false,
                isNearbyError: false
            }

        case `FETCH_NEARBY_FAIL`:
            return {
                ...state,
                nearbyHotels: [],
                isNearbyLoading: false,
                isNearbyError: true
            }

        default:
            return state;
    }
}

export default nearbyReducer;

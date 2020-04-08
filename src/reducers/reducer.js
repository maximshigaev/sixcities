const initialState = {
    offers: null,
    isLoggedIn: false,
    isLoading: true,
    isError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case `FETCH_OFFERS_REQUEST`:
        return {
            ...state,
            isLoading: true,
            isError: false
        }
    
    case `FETCH_OFFERS_SUCCESS`:
        return {
            ...state,
            isLoading: false,
            offers: action.payload
        }

    case `FETCH_OFFERS_FAIL`:
        return {
            ...state,
            isLoading: false,
            isError: true,
        }
    default:
        return state;
    }
}

export default reducer;

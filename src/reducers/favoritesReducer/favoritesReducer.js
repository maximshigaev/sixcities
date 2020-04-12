const initialState = {
    favorites: [],
    isFavoritesLoading: false,
    isFavoritesError: false
}

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_FAVORITES_REQUEST`:
            return {
                ...state,
                isFavoritesLoading: true,
                isFavoritesError: false,
                favorites: []
            }

        case `FETCH_FAVORITES_SUCCESS`:
            return {
                ...state,
                isFavoritesLoading: false,
                isFavoritesError: false,
                favorites: action.payload
            }

        case `FETCH_FAVORITES_FAIL`:
            return {
                ...state,
                isFavoritesLoading: false,
                isFavoritesError: true,
                favorites: []
            }

        default:
            return state;
    }
}

export default favoritesReducer;

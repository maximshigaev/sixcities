import sortOffers from '../../utils/sortOffers.js';

const initialState = {
    offers: [],
    isLoading: true,
    isError: false,
    activeCity: null,
    currentSorting: `Popular`,
    isFavoriteLoading: false,
    isFavoriteError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_OFFERS_REQUEST`:
            return {
                ...state,
                offers: [],
                isLoading: true,
                isError: false,
                activeCity: null
            }

        case `FETCH_OFFERS_SUCCESS`:                    
            return {
                ...state,
                isError: false,
                isLoading: false,
                activeCity: action.payload.activeCity,
                offers: action.payload.offers,
            }

        case `FETCH_OFFERS_FAIL`:
            return {
                ...state,
                offers: [],
                isLoading: false,
                isError: true,
            }

        case `SORT_BY`:
            return {
                ...state,
                offers: sortOffers(state.offers, action.payload),
                currentSorting: action.payload
            }

        case `ACTIVE_CITY_CHANGE`:            
            return {
                ...state,
                activeCity: action.payload
            }

        case `FETCH_FAVORITE_REQUEST`:                  
            return {
                ...state,
                isFavoriteLoading: true,
                isFavoriteError: false
            }

        case `FETCH_FAVORITE_FAIL`:                  
            return {
                ...state,
                isFavoriteLoading: false,
                isFavoriteError: true
            }

        case `FETCH_FAVORITE_SUCCESS`:
            const ind = action.payload - 1;
            const offer = state.offers[ind];
            const newOffer = {...offer, is_favorite: !offer.is_favorite};
            const newOffers = [...state.offers.slice(0, ind), newOffer, ...state.offers.slice(ind + 1)];
                        
            return {
                ...state,
                offers: newOffers,
                isFavoriteLoading: false,
                isFavoriteError: false
            }

        default:
            return state;
    }
}

export default reducer;

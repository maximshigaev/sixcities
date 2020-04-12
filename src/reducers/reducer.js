import sortOffers from '../utils/sortOffers.js';

const initialState = {
    offers: [],
    isLoading: true,
    isError: false,
    comments: [],
    isCommentsLoading: false,
    isCommentsError: false,
    favorites: [],
    isFavoritesLoading: false,
    isFavoritesError: false,
    nearbyHotels: [],
    isNearbyLoading: false,
    isNearbyError: false,
    isLoggedIn: false,
    email: null,
    isAuthLoading: false,
    isAuthError: false,
    activeCity: null,
    focusedCard: null,
    currentSorting: `Popular`
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_OFFERS_REQUEST`:
            return {
                ...state,
                offers: [],
                isLoading: true,
                isError: false
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

        case `FETCH_AUTH_REQUEST`:
            return {
                ...state,
                email: null,
                isAuthLoading: true,
                isAuthError: false,
                isLoggedIn: false
            }

        case `FETCH_AUTH_SUCCESS`:
            return {
                ...state,
                email: action.payload,
                isAuthLoading: false,
                isAuthError: false,
                isLoggedIn: true
            }

        case `FETCH_AUTH_FAIL`:
            return {
                ...state,
                email: null,
                isAuthLoading: false,
                isAuthError: true,
                isLoggedIn: false
            }

        case `FOCUS_CARD`:            
            return {
                ...state,
                focusedCard: action.payload
            }

         case `BLUR_CARD`:
            return {
                ...state,
                focusedCard: null
            }
        
        case `FETCH_COMMENTS_REQUEST`:
            return {
                ...state,
                comments: [],
                isCommentsLoading: true,
                isCommentsError: false
            }

        case `FETCH_COMMENTS_SUCCESS`:
            return {
                ...state,
                comments: action.payload,
                isCommentsLoading: false,
                isCommentsError: false
            }

        case `FETCH_COMMENTS_FAIL`:
            return {
                ...state,
                comments: [],
                isCommentsLoading: false,
                isCommentsError: true
            }

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

        case `FETCH_FAVORITE_SUCCESS`:
            const ind = action.payload - 1;
            const offer = state.offers[ind];
            const newOffer = {...offer, is_favorite: !offer.is_favorite};
            const newOffers = [...state.offers.slice(0, ind), newOffer, ...state.offers.slice(ind + 1)];
                        
            return {
                ...state,
                offers: newOffers
            }

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
                nearbyHotels: action.payload,
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

         case `AUTH_STATUS_SUCCESS`:
            return {
                ...state,
                isLoggedIn: true,
                email: action.payload
            }

         case `AUTH_STATUS_FAIL`:
            return {
                ...state,
                isLoggedIn: false,
                email: null
            }

        default:
            return state;
    }
}

export default reducer;

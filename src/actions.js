import {getOffers, sendUserData, getComments, sendUserReview, getFavorites, setFavorite} from './api.js';

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

const fetchOffers = () => (dispatch) => {
    dispatch(fetchOffersRequest());

    getOffers()
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
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
            if(res.status === SUCCESS_STATUS) {
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
            if(res.status === SUCCESS_STATUS) {
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

const fetchReviewRequest = () => {
    return {
        type: `FETCH_REVIEW_REQUEST`
    }
}

const fetchReviewSuccess = () => {
    return {
        type: `FETCH_REVIEW_SUCCESS`
    }
}

const fetchReviewFail = () => {
    return {
        type: `FETCH_REVIEW_FAIL`
    }
}

const fetchReview = (review, id) => (dispatch) => {
    dispatch(fetchReviewRequest());    

    sendUserReview(review, id)
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(fetchReviewSuccess());
            } else {
                dispatch(fetchReviewFail());
            }
        })
        .catch(() => {
            dispatch(fetchReviewFail())
        });
}

const fetchFavoritesRequest = () => {
    return {
        type: `FETCH_FAVORITES_REQUEST`
    }
}

const fetchFavoritesSuccess = (favorites) => {
    return {
        type: `FETCH_FAVORITES_SUCCESS`,
        payload: favorites
    }
}

const fetchFavoritesFail = () => {
    return {
        type: `FETCH_FAVORITES_FAIL`
    }
}

const fetchFavorites = () => (dispatch) => {
    dispatch(fetchFavoritesRequest());

    getFavorites()
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(fetchFavoritesSuccess(res.data));
            } else {
                dispatch(fetchFavoritesFail());
            }
        })
        .catch(() => dispatch(fetchFavoritesFail()))
}

const fetchFavoriteSuccess = () => {
    console.log(`FETCH_FAVORITE_SUCCESS`);
    
    return {
        type: `FETCH_FAVORITE_SUCCESS`
    }
}

const fetchFavorite = (id, isFavorite) => (dispatch) => {
    setFavorite(id, isFavorite)
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(fetchFavoriteSuccess());
            } else {
                throw new Error(`Can not establish favorite`);
            }
        })
        .catch((err) => {
            throw err;
        })
}

export {fetchOffers, sortBy, fetchAuth, activeCityChange, focusCard, blurCard, fetchComments, setCurrentHotel,
    fetchReview, fetchFavorites, fetchFavorite};

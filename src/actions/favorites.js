import {getFavorites, setFavorite} from '../api.js'; 

const SUCCESS_STATUS = 200;

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

export {fetchFavorites, fetchFavorite};

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

const fetchFavorites = () => (dispatch, getState, Api) => {
    dispatch(fetchFavoritesRequest());

    return new Api().getFavorites()
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(fetchFavoritesSuccess(res.data));
            }
        })
        .catch(() => dispatch(fetchFavoritesFail()))
}

const fetchFavoriteRequest = () => {
    return {
        type: `FETCH_FAVORITE_REQUEST`
    }
}

const fetchFavoriteSuccess = (id) => {  
    return {
        type: `FETCH_FAVORITE_SUCCESS`,
        payload: id
    }
}

const fetchFavoriteFail = (id) => {  
    return {
        type: `FETCH_FAVORITE_FAIL`,
        payload: id
    }
}

const fetchFavorite = (id, isFavorite) => (dispatch, getState, Api) => {
    dispatch(fetchFavoriteRequest());

    return new Api().setFavorite(id, isFavorite)
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(fetchFavoriteSuccess(res.data.id));
            }
        })
        .catch(() => dispatch(fetchFavoriteFail()))
}

export {fetchFavorites, fetchFavorite};

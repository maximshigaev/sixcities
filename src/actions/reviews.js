const SUCCESS_STATUS = 200;

const fetchReviewsRequest = () => {
    return {
        type: `FETCH_REVIEWS_REQUEST`
    }
}

const fetchReviewsSuccess = (reviews) => {
    return {
        type: `FETCH_REVIEWS_SUCCESS`,
        payload: reviews
    }
}

const fetchReviewsFail = () => {
    return {
        type: `FETCH_REVIEWS_FAIL`
    }
}

const fetchReviews = (id) => (dispatch, getState, Api) => {
    dispatch(fetchReviewsRequest());

    return new Api().getReviews(id)
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {
                dispatch(fetchReviewsSuccess(res.data));
            }
        })
        .catch(() => dispatch(fetchReviewsFail()))
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

const resetReviewError = () => {
    return {
        type: `RESET_REVIEW_ERROR`
    }
}

const fetchReview = (review, id) => (dispatch, getState, Api) => {
    dispatch(fetchReviewRequest());    

    return new Api().sendUserReview(review, id)
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {                                
                dispatch(fetchReviewSuccess());
                dispatch(fetchReviews(id));
            }
        })
        .catch(() => dispatch(fetchReviewFail()));
}

export {fetchReviews, fetchReview, resetReviewError};

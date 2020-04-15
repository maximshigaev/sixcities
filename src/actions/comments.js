import {getComments, sendUserReview} from '../api.js';

const SUCCESS_STATUS = 200;

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

const fetchReview = (review, id) => (dispatch) => {
    dispatch(fetchReviewRequest());    

    sendUserReview(review, id)
        .then((res) => {
            if(res.status === SUCCESS_STATUS) {                                
                dispatch(fetchReviewSuccess());
                dispatch(fetchComments(id));
            } else {
                dispatch(fetchReviewFail());
            }
        })
        .catch(() => dispatch(fetchReviewFail()));
}

export {fetchComments, fetchReview, resetReviewError};

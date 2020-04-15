const initialState = {
    comments: [],
    isCommentsLoading: false,
    isCommentsError: false,
    isReviewLoading: false,
    isReviewError: false
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
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

        case `FETCH_REVIEW_REQUEST`:            
            return {
                ...state,
                isReviewLoading: true,
                isReviewError: false
            }

        case `FETCH_REVIEW_SUCCESS`:
            return {
                ...state,
                isReviewLoading: false,
                isReviewError: false
            }

        case `FETCH_REVIEW_FAIL`:
            return {
                ...state,
                isReviewLoading: false,
                isReviewError: true
            }

        case `RESET_REVIEW_ERROR`:
            return {
                ...state,
                isReviewError: false
            }

        default:
            return state;
    }
}

export default commentsReducer;

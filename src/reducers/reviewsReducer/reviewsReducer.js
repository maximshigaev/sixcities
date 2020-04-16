const initialState = {
    reviews: [],
    isReviewsLoading: false,
    isReviewsError: false,
    isReviewLoading: false,
    isReviewError: false
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_REVIEWS_REQUEST`:
            return {
                ...state,
                reviews: [],
                isReviewsLoading: true,
                isReviewsError: false
            }

        case `FETCH_REVIEWS_SUCCESS`:
            return {
                ...state,
                reviews: action.payload,
                isReviewsLoading: false,
                isReviewsError: false
            }

        case `FETCH_REVIEWS_FAIL`:
            return {
                ...state,
                reviews: [],
                isReviewsLoading: false,
                isReviewsError: true
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

export default reviewsReducer;

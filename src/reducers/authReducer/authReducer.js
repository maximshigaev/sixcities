const initialState = {
    isLoggedIn: false,
    email: null,
    isAuthLoading: false,
    isAuthError: false,
    isAuthStatusLoading: true,
    isAuthStatusError: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
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

        case `AUTH_STATUS_REQUEST`:
            return {
                ...state,
                isAuthStatusLoading: true,
                isAuthStatusError: false
            }

        case `AUTH_STATUS_SUCCESS`:
            return {
                ...state,
                isLoggedIn: true,
                email: action.payload,
                isAuthStatusLoading: false,
                isAuthStatusError: false
            }

        case `AUTH_STATUS_UNAUTHORIZED`:
            return {
                ...state,
                isLoggedIn: false,
                email: null,
                isAuthStatusLoading: false,
                isAuthStatusError: false
            }

        case `AUTH_STATUS_FAIL`:
            return {
                ...state,
                isLoggedIn: false,
                email: null,
                isAuthStatusLoading: false,
                isAuthStatusError: true
            }

        default:
            return state;
    }
}

export default authReducer;

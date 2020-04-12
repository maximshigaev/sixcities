const initialState = {
    focusedCard: null
}

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
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

        default:
            return state;
    }
}

export default cardReducer;

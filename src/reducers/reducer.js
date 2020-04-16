import {combineReducers} from 'redux';

import cardReducer from './cardReducer/cardReducer.js';
import authReducer from './authReducer/authReducer.js';
import nearbyReducer from './nearbyReducer/nearbyReducer.js';
import favoritesReducer from './favoritesReducer/favoritesReducer.js';
import reviewsReducer from './reviewsReducer/reviewsReducer.js';
import offersReducer from './offersReducer/offersReducer.js';

const reducer = combineReducers({
    card: cardReducer,
    auth: authReducer,
    nearby: nearbyReducer,
    favorites: favoritesReducer,
    reviews: reviewsReducer,
    offers: offersReducer
});

export default reducer;

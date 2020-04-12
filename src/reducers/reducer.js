import {combineReducers} from 'redux';

import cardReducer from './cardReducer/cardReducer.js';
import authReducer from './authReducer/authReducer.js';
import nearbyReducer from './nearbyReducer/nearbyReducer.js';
import favoritesReducer from './favoritesReducer/favoritesReducer.js';
import commentsReducer from './commentsReducer/commentsReducer.js';
import offersReducer from './offersReducer/offersReducer.js';

const reducer = combineReducers({
    card: cardReducer,
    auth: authReducer,
    nearby: nearbyReducer,
    favorites: favoritesReducer,
    comments: commentsReducer,
    offers: offersReducer
});

export default reducer;

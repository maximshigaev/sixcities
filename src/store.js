import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer.js';
import api from './api.js';

const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
));
                                    
export default store;

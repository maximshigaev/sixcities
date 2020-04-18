import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer.js';
import Api from './api.js';

const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(Api)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
));
                                    
export default store;

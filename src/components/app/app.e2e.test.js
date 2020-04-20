import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from 'redux-mock-store'; 
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import api from '../../api.js';

import {App} from './app.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`fetchAuthStatus callback should be invoked right after the App component will be mounted`, () => {
    const mockstore = configureStore([thunk.withExtraArgument(api)]);
    const store = mockstore({
        card: {focusedCard: null},
        auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
        offers: {
            isLoading: false,
            isError: false,
            activeCity: `Amsterdam`,
            currentSorting: `Popular`,
            offers: []                
        }
    });
    const fetchAuthStatus = jest.fn((...args) => [...args]);

    mount(<Provider store={store}>
            <Router>
                <App fetchAuthStatus={fetchAuthStatus} />
            </Router>
        </Provider>);

    expect(fetchAuthStatus).toHaveBeenCalledTimes(1);
    expect(fetchAuthStatus.mock.calls[0][0]).toEqual(undefined);
});

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import thunk from 'redux-thunk';

import api from '../../../api.js';
import {MainPage} from './mainPage.jsx';

describe(`Correctly renders the MainPage component `, () => {
    it(`when isLoading property is equal true and hasOffers property is equal false`, () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            offers: {offers: [], isLoading: true, isError: false, currentSorting: `Popular`},
            card: {focusedCard: null},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false}
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <MainPage isLoading={true} hasOffers={false} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isLoading property is equal false and hasOffers property is equal true`, () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            offers: {offers: [], isLoading: true, isError: false, currentSorting: `Popular`},
            card: {focusedCard: null, isLoading: false, isError: false},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false}
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <MainPage isLoading={false} hasOffers={true} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

     it(`when both hasOffers and isLoading properties are equal false`, () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            offers: {offers: [], isLoading: false, isError: false, currentSorting: `Popular`},
            card: {focusedCard: null},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false}
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <MainPage isLoading={false} hasOffers={false} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

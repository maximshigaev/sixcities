import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {LoginPage} from './loginPage.jsx';

describe(`Correctly renders the LoginPage component `, () => {
    it(`when isLoggedIn property is equal true`, () => {
        const mockStore = configureStore([]);
        const store = mockStore();

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <LoginPage isLoggedIn={true} isAuthLoading={false} isAuthError={false}fetchAuth={() => {}} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isAuthLoading property is equal true and both isLoggedIn and isAuthError properties are equal
        false`,
    () => {
        const mockStore = configureStore([]);
        const store = mockStore({auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false}});

        const tree = renderer.create(
            <Provider store={store}>
                <LoginPage isLoggedIn={false} isAuthLoading={true} isAuthError={false} fetchAuth={() => {}} />
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isAuthError property is equal true and both isLoggedIn and isAuthLoading properties are equal
        false`,
    () => {
        const mockStore = configureStore([]);
        const store = mockStore({auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false}});

        const tree = renderer.create(
            <Provider store={store}>
                <LoginPage isLoggedIn={false} isAuthLoading={false} isAuthError={true} fetchAuth={() => {}} />
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isAuthError, isLoggedIn and isAuthLoading properties are equal false`, () => {
        const mockStore = configureStore([]);
        const store = mockStore({auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false}});

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <LoginPage isLoggedIn={false} isAuthLoading={false} isAuthError={false} fetchAuth={() => {}} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

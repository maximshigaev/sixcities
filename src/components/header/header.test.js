import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

import {Header} from './header.jsx';

describe(`Correctly renders the Header component`, () => {
    it(`when isLoggedIn and isMain properties are equal true, isAuthStatusLoading and isAuthStatusError properties are
        equal false`,
    () => {
        const tree = renderer.create(
            <Router>
                <Header isLoggedIn={true} isMain={true} isAuthStatusError={false} isAuthStatusLoading={false}
                    email='example@.ru'
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isLoggedIn property is equal true, isAuthStatusLoading, isMain and isAuthStatusError properties are equal
        false`,
    () => {
        const tree = renderer.create(
            <Router>
                <Header isLoggedIn={true} isMain={false} isAuthStatusError={false} isAuthStatusLoading={false}
                    email='example@.ru'
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isAuthStatusLoading and isMain properties are equal true, isAuthStatusError and isLoggedIn properties are
        equal false`,
    () => {
        const tree = renderer.create(
            <Router>
                <Header isLoggedIn={false} isMain={true} isAuthStatusError={false} isAuthStatusLoading={true}
                    email='example@.ru'
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isAuthStatusLoading property is equal true, isAuthStatusError, isLoggedIn, and isMain properties are equal
        false`,
    () => {
        const tree = renderer.create(
            <Router>
                <Header isLoggedIn={false} isMain={false} isAuthStatusError={false} isAuthStatusLoading={true}
                    email='example@.ru'
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isAuthStatusError and isMain properties are equal true, isAuthStatusLoading and isLoggedIn properties are
        equal false`,
    () => {
        const tree = renderer.create(
            <Router>
                <Header isLoggedIn={false} isMain={true} isAuthStatusError={true} isAuthStatusLoading={false}
                    email='example@.ru'
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isAuthStatusError property is equal true, isAuthStatusLoading, isMain and isLoggedIn properties are equal
        false`,
    () => {
        const tree = renderer.create(
            <Router>
                <Header isLoggedIn={false} isMain={false} isAuthStatusError={true} isAuthStatusLoading={false}
                    email='example@.ru'
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

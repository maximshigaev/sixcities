import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {App} from './app.jsx';

describe(`Correctly renders the App component`, () => {
    it(`Renders the main page`, () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            card: {focusedCard: null},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            offers: {
                isLoading: false,
                isError: false,
                activeCity: `Amsterdam`,
                currentSorting: `Popular`,
                offers: [{city: {name: `Cologne`, location: {latitude: 50.938361, longitude: 6.959974, zoom: 13}}, preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, title: `Penthouse, 4-5 rooms + 5 balconies`, is_favorite: false, is_premium: false, rating: 3.4, type: `hotel`, price: 471, location: {latitude: 50.913361, longitude: 6.9509739999999995, zoom: 16}, id: 1}, {city: {name: `Brussels`, location: {latitude: 50.846557, longitude: 4.351697, zoom: 13}}, preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, title: `The Joshua Tree House`, is_favorite: false, is_premium: false, rating: 4.6, type: `house`, price: 674, location: {latitude: 50.852557, longitude: 4.3376969999999995, zoom: 16}, id: 2}, {city: {name: `Brussels`, location: {latitude: 50.846557, longitude: 4.351697, zoom: 13}}, preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, title: `The Pondhouse - A Magical Place`, is_favorite: false, is_premium: false, rating: 2.1, type: `room`, price: 215, location: {latitude: 50.867557, longitude: 4.339697, zoom: 16}, id: 3}]                
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <App fetchAuthStatus={() => {}} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

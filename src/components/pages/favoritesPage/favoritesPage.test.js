import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {FavoritesPage} from './favoritesPage.jsx';

const favorites =  [{price: 120, is_premium: true, is_favorite: false, rating: 4, src: `img/apartment-01.jpg`,
    title: `Beautiful luxurious apartment at great location`, type: `Apartment`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, city: {name: `Cologne`,
    location: {latitude: 50.938361, longitude: 6.959974, zoom: 13}}, id: 1},
    {price: 100, is_premium: false, is_favorite: true, rating: 5, src: `img/apartment-02.jpg`,
    title: `Perfectly located Castro`, type: `Room`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, city: {name: `Brussels`,
    location: {latitude: 50.846557, longitude: 4.351697, zoom: 13}}, id: 2},
    {price: 80, is_premium: true, is_favorite: true, rating: 3, src: `img/apartment-03.jpg`,
    title: `Waterfront with extraordinary view`, type: `Hotel`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,  city :{name :`Hamburg`,
    location :{latitude: 53.550341, longitude: 10.000654, zoom: 13}}, id: 3}
];

describe(`Correctly renders the FavoritesPage component`, () => {
    it(`when isLoggedIn property is equal false`, () => {
        const mockStore = configureStore([]);
        const store = mockStore();

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <FavoritesPage favorites={favorites} isLoggedIn={false} isFavoritesLoading={false}
                        isFavoritesError={false} fetchFavorites={() =>{}}
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isLoggedIn and isFavoritesLoading properties are equal true and isFavoritesError property is equal
        false`,
    () => {
        const mockStore = configureStore([]);
        const store = mockStore();

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <FavoritesPage favorites={favorites} isLoggedIn={true} isFavoritesLoading={true}
                        isFavoritesError={false} fetchFavorites={() =>{}}
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isLoggedIn and isFavoritesError properties are equal true and isFavoritesLoading property is equal
        false`,
    () => {
        const mockStore = configureStore([]);
        const store = mockStore();

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <FavoritesPage favorites={favorites} isLoggedIn={true} isFavoritesLoading={false}
                        isFavoritesError={true} fetchFavorites={() =>{}}
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isLoggedIn property is equal true and both isFavoritesError and isFavoritesLoading properties are equal
        false`,
    () => {
        const mockStore = configureStore([]);
        const store = mockStore({auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false}});

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <FavoritesPage favorites={favorites} isLoggedIn={true} isFavoritesLoading={false}
                        isFavoritesError={false} fetchFavorites={() =>{}}
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

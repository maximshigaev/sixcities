import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {CardListContainer} from './cardListContainer.jsx';

const offers =  [{price: 120, is_premium: true, is_favorite: false, rating: 4, src: `img/apartment-01.jpg`,
    title: `Beautiful luxurious apartment at great location`, type: `Apartment`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, id: 0},
    {price: 100, is_premium: false, is_favorite: true, rating: 5, src: `img/apartment-02.jpg`,
    title: `Perfectly located Castro`, type: `Room`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, id: 1},
    {price: 80, is_premium: true, is_favorite: true, rating: 3, src: `img/apartment-03.jpg`,
    title: `Waterfront with extraordinary view`, type: `Hotel`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, id: 2}
];

describe(`Correctly renders the CarsListContainer component`, () => {
    it(`when isLoading property is equal true`, () => {
        const mockStore = configureStore([]);
        const store = mockStore({offers});

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <CardListContainer offers={offers} fetchOffers={() => {}} activeCity={null} isError={false}
                        isLoading={true}
                    />
                </Router>
            </Provider>
            )
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isError property is equal true`, () => {
        const mockStore = configureStore([]);
        const store = mockStore({offers});

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <CardListContainer offers={offers} fetchOffers={() => {}} activeCity='Paris' isError={true}
                        isLoading={false}
                    />
                </Router>
            </Provider>
            )
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isError and isLoading properties are equal false and offers.length property is equal 0`, () => {
        const mockStore = configureStore([]);
        const store = mockStore({offers});

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <CardListContainer offers={[]} fetchOffers={() => {}} activeCity='Paris' isError={false}
                        isLoading={false}
                    />
                </Router>
            </Provider>
            )
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isError and isLoading properties are equal false and offers.length property is not equal 0`, () => {
        const mockStore = configureStore([]);
        const store = mockStore({offers});

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <CardListContainer offers={offers} fetchOffers={() => {}} activeCity='Paris' isError={false}
                        isLoading={false}
                    />
                </Router>
            </Provider>
            )
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

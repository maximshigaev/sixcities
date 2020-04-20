import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {NearbyHotelsContainer} from './nearbyHotelsContainer.jsx';

const nearbyHotels =  [{price: 120, is_premium: true, is_favorite: false, rating: 4, src: `img/apartment-01.jpg`,
    title: `Beautiful luxurious apartment at great location`, type: `Apartment`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, id: 1},
    {price: 100, is_premium: false, is_favorite: true, rating: 5, src: `img/apartment-02.jpg`,
    title: `Perfectly located Castro`, type: `Room`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, id: 2},
    {price: 80, is_premium: true, is_favorite: true, rating: 3, src: `img/apartment-03.jpg`,
    title: `Waterfront with extraordinary view`, type: `Hotel`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, id: 3}
];

describe(`Correctly renders the NearbyHotelsContainer component`, () => {
    it(`when isNearbyLoading property is equal true`, () => {
        const mockStore = configureStore([]);
        const store = mockStore();

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <NearbyHotelsContainer nearbyHotels={nearbyHotels} isNearbyLoading={true} isNearbyError={false}
                        fetchNearbyHotels={() => {}} id={4}
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isNearbyError property is equal true`, () => {
        const mockStore = configureStore([]);
        const store = mockStore();

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <NearbyHotelsContainer nearbyHotels={nearbyHotels} isNearbyLoading={false} isNearbyError={true}
                        fetchNearbyHotels={() => {}} id={4}
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when both isNearbyError and isNearbyLoading properties are equal false`, () => {
        const mockStore = configureStore([]);
        const store = mockStore();

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <NearbyHotelsContainer nearbyHotels={nearbyHotels} isNearbyLoading={false} isNearbyError={false}
                        fetchNearbyHotels={() => {}} id={4}
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

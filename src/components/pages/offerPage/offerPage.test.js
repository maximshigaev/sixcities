import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {OfferPage} from './offerPage.jsx';

const offers =  [{preview_image: "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg", id: 2,
    images: ["https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg"], rating: 3.4, type: `hotel`,
    title:"Penthouse, 4-5 rooms + 5 balconies", is_favorite: true, is_premium: false,  bedrooms: 2, max_adults: 8,
    price: 471, goods: ["Baby seat"], description: "Peaceful studio in the most wanted area in town.",
    host: {id: 25, name: "Angelina", is_pro: true, avatar_url: "img/avatar-angelina.jpg"},
    location: {latitude: 50.913361, longitude: 6.9509739999999995, zoom: 16}},
    {preview_image: "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg", id: 1,
    images: ["https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg"], rating: 3.4, type: `hotel`,
    title:"Penthouse, 4-5 rooms + 5 balconies", is_favorite: false, is_premium: false,  bedrooms: 2, max_adults: 8,
    price: 471, goods: ["Baby seat"], description: "Peaceful studio in the most wanted area in town.",
    host: {id: 25, name: "Angelina", is_pro: true, avatar_url: "img/avatar-angelina.jpg"},
    location: {latitude: 50.913361, longitude: 6.9509739999999995, zoom: 16}}
];

describe(`Correctly renders the OfferPage component`, () => {
    it(`when isLoading property is equal true and isError property is equal false`, () => {
        const match = {params: {id: "2"}};
        const mockStore = configureStore([]);
        const store = mockStore({
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            card: {focusedCard: null},
            nearby: {nearbyHotels: [], isNearbyLoading: false, isNearbyError: false},
            offers: {isFavoriteError: false, isFavoriteLoading: false},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        global.scrollTo = () => {};

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <OfferPage offers={offers} isLoading={true} isError={false} fetchOffers={() => {}} match={match} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isError property is equal true and isLoading property is equal false`, () => {
        const match = {params: {id: "2"}};
        const mockStore = configureStore([]);
        const store = mockStore({
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            card: {focusedCard: null},
            nearby: {nearbyHotels: [], isNearbyLoading: false, isNearbyError: false},
            offers: {isFavoriteError: false, isFavoriteLoading: false},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        global.scrollTo = () => {};

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <OfferPage offers={offers} isLoading={false} isError={true} fetchOffers={() => {}} match={match} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when both isError and isLoading properties are equal false, but there is no offer which is matching the given
        id`,
    () => {
        const match = {params: {id: "10"}};
        const mockStore = configureStore([]);
        const store = mockStore({
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            card: {focusedCard: null},
            nearby: {nearbyHotels: [], isNearbyLoading: false, isNearbyError: false},
            offers: {isFavoriteError: false, isFavoriteLoading: false},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        global.scrollTo = () => {};

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <OfferPage offers={offers} isLoading={false} isError={false} fetchOffers={() => {}} match={match} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when both isError and isLoading properties are equal false and there is offer which is matching the given
        id`,
    () => {
        const match = {params: {id: "2"}};
        const mockStore = configureStore([]);
        const store = mockStore({
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            card: {focusedCard: null},
            nearby: {nearbyHotels: [], isNearbyLoading: false, isNearbyError: false},
            offers: {isFavoriteError: false, isFavoriteLoading: false},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        global.scrollTo = () => {};

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <OfferPage offers={offers} isLoading={false} isError={false} fetchOffers={() => {}} match={match} />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

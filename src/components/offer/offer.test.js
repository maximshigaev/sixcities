import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import api from '../../api.js';

import {Offer} from './offer.jsx';

const favoriteOffer = {preview_image: "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg", id: 2,
    images: ["https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg"], rating: 3.4, type: `hotel`,
    title:"Penthouse, 4-5 rooms + 5 balconies", is_favorite: true, is_premium: false,  bedrooms: 2, max_adults: 8,
    price: 471, goods: ["Baby seat"], description: "Peaceful studio in the most wanted area in town.",
    host: {id: 25, name: "Angelina", is_pro: true, avatar_url: "img/avatar-angelina.jpg"},
    location: {latitude: 50.913361, longitude: 6.9509739999999995, zoom: 16}
};

const commonOffer = {preview_image: "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg", id: 1,
    images: ["https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg"], rating: 3.4, type: `hotel`,
    title:"Penthouse, 4-5 rooms + 5 balconies", is_favorite: false, is_premium: false,  bedrooms: 2, max_adults: 8,
    price: 471, goods: ["Baby seat"], description: "Peaceful studio in the most wanted area in town.",
    host: {id: 25, name: "Angelina", is_pro: true, avatar_url: "img/avatar-angelina.jpg"},
    location: {latitude: 50.913361, longitude: 6.9509739999999995, zoom: 16}
};

describe(`Correctly renders the Offer component`, () => {
    it(`when isFavoriteLoading property is equal true`, () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            card: {focusedCard: null},
            nearby: {nearbyHotels: []},
            offers: {isTestMode: true},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            reviews: {isReviewsError: false, isReviewsLoading: false , reviews: [], isReviewError: false,
                isReviewLoading: false}
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <Offer fetchFavorite={() => {}} isFavoriteLoading={true} isFavoriteError={false} isLoggedIn={true}
                        offer={commonOffer} history={{}}
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isFavoriteError property is equal true`, () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            card: {focusedCard: null},
            nearby: {nearbyHotels: []},
            offers: {isTestMode: true},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            reviews: {isReviewsError: false, isReviewsLoading: false , reviews: [], isReviewError: false,
                isReviewLoading: false
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <Offer fetchFavorite={() => {}} isFavoriteLoading={false} isFavoriteError={true} isLoggedIn={true}
                        offer={commonOffer} history={{}} 
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isFavoriteError, is_favorite and isFavoriteLoading properties are equal false`, () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            card: {focusedCard: null},
            nearby: {nearbyHotels: []},
            offers: {isTestMode: true},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            reviews: {isReviewsError: false, isReviewsLoading: false , reviews: [], isReviewError: false,
                isReviewLoading: false
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <Offer fetchFavorite={() => {}} isFavoriteLoading={false} isFavoriteError={false} isLoggedIn={true}
                        offer={commonOffer} history={{}} 
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isFavoriteError and isFavoriteLoading properties are equal false, but is_favorite property is equal
        true`,
    () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            card: {focusedCard: null},
            nearby: {nearbyHotels: []},
            offers: {isTestMode: true},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            reviews: {isReviewsError: false, isReviewsLoading: false , reviews: [], isReviewError: false,
                isReviewLoading: false
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <Offer fetchFavorite={() => {}} isFavoriteLoading={false} isFavoriteError={false} isLoggedIn={true}
                        offer={favoriteOffer} history={{}} 
                    />
                </Router>
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

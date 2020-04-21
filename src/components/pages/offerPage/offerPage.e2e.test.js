import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import thunk from 'redux-thunk';

import api from '../../../api.js';
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

Enzyme.configure({adapter: new Adapter()});

describe(`Appropriate methods are timely invoked after the OfferPage component is mounted`, () => {
    it(`fetchOffers callback is invoked after the OfferPage component is mounted`, () => {
        const fetchOffers = jest.fn((...args) => [...args]);
        const match = {params: {id: "2"}};

        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            card: {focusedCard: null},
            nearby: {nearbyHotels: [], isNearbyLoading: false, isNearbyError: false},
            offers: {isTestMode: true, isFavoriteError: false, isFavoriteLoading: false},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        global.scrollTo = () => {};
        
        mount(
            <Provider store={store}>
                <Router>
                    <OfferPage offers={offers} isLoading={false} isError={false} fetchOffers={fetchOffers}
                        match={match}
                    />
                </Router>
            </Provider>
        );

        expect(fetchOffers).toHaveBeenCalledTimes(1);
        expect(fetchOffers.mock.calls[0][0]).toEqual(undefined);
    });

    it(`global.scrollTo method is invoked after the OfferPage component is mounted`, () => {
        const match = {params: {id: "2"}};

        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            card: {focusedCard: null},
            nearby: {nearbyHotels: [], isNearbyLoading: false, isNearbyError: false},
            offers: {isTestMode: true, isFavoriteError: false, isFavoriteLoading: false},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        global.scrollTo = jest.fn();
        
        mount(
            <Provider store={store}>
                <Router>
                    <OfferPage offers={offers} isLoading={false} isError={false} fetchOffers={() => {}} match={match} />
                </Router>
            </Provider>
        );

        expect(global.scrollTo).toHaveBeenCalledTimes(1);
        expect(global.scrollTo).toHaveBeenNthCalledWith(1, 0, 0);
    });
});

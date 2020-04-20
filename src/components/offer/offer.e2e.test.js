import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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

Enzyme.configure({adapter: new Adapter()});

describe(`Interactions with user invoke appropriate callbacks with the right values`, () => {
    it(`when user clicks on the send-favorite button and isLoggedIn property is equal false, the push method of the
        history is invoked with the right value`,
    () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            card: {focusedCard: null},
            nearby: {nearbyHotels: []},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            offers: {isTestMode: true},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        const push = jest.fn();
        const history = {push};

        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <Offer fetchFavorite={() => {}} isFavoriteLoading={false} isFavoriteError={false} isLoggedIn={false}
                        offer={commonOffer} history={history}
                    />
                </Router>
            </Provider>
        );

        const button = wrapper.find(`button[title="Add to bookmarks"]`);
        button.simulate(`click`);

        expect(push).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenNthCalledWith(1, `/login`);
    });

    it(`when user clicks on the send-favorite button and both is_favorite and isLoggedIn properties are equal
        true, the fetchFavorite callback is invoked with the right values`,
    () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            card: {focusedCard: null},
            nearby: {nearbyHotels: []},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            offers: {isTestMode: true},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        const fetchFavorite = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <Offer fetchFavorite={fetchFavorite} isFavoriteLoading={false} isFavoriteError={false}
                        isLoggedIn={true} offer={favoriteOffer} history={{}}
                    />
                </Router>
            </Provider>
        );

        const button = wrapper.find(`button[title="Remove from bookmarks"]`);
        button.simulate(`click`);

        expect(fetchFavorite).toHaveBeenCalledTimes(1);
        expect(fetchFavorite).toHaveBeenNthCalledWith(1, 2, true);
    });

    it(`when user clicks on the send-favorite button and isLoggedIn property is equal true, but is_favorite property is
        equal false, the fetchFavorite callback is invoked with the right values`,
    () => {
        const mockStore = configureStore([thunk.withExtraArgument(api)]);
        const store = mockStore({
            card: {focusedCard: null},
            nearby: {nearbyHotels: []},
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            offers: {isTestMode: true},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        const fetchFavorite = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <Offer fetchFavorite={fetchFavorite} isFavoriteLoading={false} isFavoriteError={false}
                        isLoggedIn={true} offer={commonOffer} history={{}}
                    />
                </Router>
            </Provider>
        );

        const button = wrapper.find(`button[title="Add to bookmarks"]`);
        button.simulate(`click`);

        expect(fetchFavorite).toHaveBeenCalledTimes(1);
        expect(fetchFavorite).toHaveBeenNthCalledWith(1, 1, false);
    });
});

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {ReviewsContainer} from './reviewsContainer.jsx';

const reviews = [{id: 1, rating: 3, date: `2020-04-13T20:25:41.450Z`, user: {id: 15, is_pro: false, name: `Kendall`, 
    avatar_url: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/6.jpg`},
    comment: `I stayed here for one night and it was an unpleasant experience.`},
    {id: 2, rating: 2, date: `2020-04-13T20:25:41.450Z`, user: {id: 13, is_pro: false, name: `Zak`,
    avatar_url: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/4.jpg`},
    comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an
    amazing view of the river!`}
];

describe(`Correctly renders the ReviewsContainer component`, () => {
    it(`when isReviewsLoading property is equal true and isReviewsError property is equal false`, () => {
        const tree = renderer.create(
            <ReviewsContainer reviews={reviews} isReviewsLoading={true} isReviewsError={false} id={5}
                fetchReviews={() => {}}
            />)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isReviewsError property is equal true and isReviewsLoading property is equal false`, () => {
        const tree = renderer.create(
            <ReviewsContainer reviews={reviews} isReviewsLoading={false} isReviewsError={true} id={5}
                fetchReviews={() => {}}
            />)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when both isReviewsError and isReviewsLoading properties are equal false`, () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
            reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
                reviews: []
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <ReviewsContainer reviews={reviews} isReviewsLoading={false} isReviewsError={false} id={5}
                    fetchReviews={() => {}}
                />
            </Provider>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

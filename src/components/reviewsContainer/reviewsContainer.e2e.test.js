import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import api from '../../api.js';
import {ReviewsContainer} from './reviewsContainer.jsx';

const reviews = [{id: 1, rating: 3, date: `2020-04-13T20:25:41.450Z`, user: {id: 15, is_pro: false, name: `Kendall`, 
    avatar_url: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/6.jpg`},
    comment: `I stayed here for one night and it was an unpleasant experience.`},
    {id: 2, rating: 2, date: `2020-04-13T20:25:41.450Z`, user: {id: 13, is_pro: false, name: `Zak`,
    avatar_url: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/4.jpg`},
    comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an
    amazing view of the river!`}
];

Enzyme.configure({adapter: new Adapter()});

it(`fetchReviews callback should be invoked with the right value after the ReviewsContainer component will be
    mounted`,
() => {
    const fetchReviews = jest.fn();

    const mockStore = configureStore([thunk.withExtraArgument(api)]);
    const store = mockStore({
        auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false},
        reviews: {isReviewsError: false, isReviewsLoading: false, isReviewError: false, isReviewLoading: false,
            reviews: []
        }
    });

    mount(
        <Provider store={store}>
            <ReviewsContainer reviews={reviews} isReviewsLoading={false} isReviewsError={false} id={7}
                fetchReviews={fetchReviews}
            />
        </Provider>
    );

    expect(fetchReviews).toHaveBeenCalledTimes(1);
    expect(fetchReviews).toHaveBeenNthCalledWith(1, 7);
});

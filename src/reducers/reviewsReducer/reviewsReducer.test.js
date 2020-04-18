import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {fetchReviews, fetchReview} from '../../actions/reviews.js';
import {api} from '../../api.js';
import reviewsReducer from './reviewsReducer.js';

describe(`Operation of fetching should make correct get request to /comments/7`, () => {
    it(`when server responded with 200 status code`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onGet(`/comments/7`).reply(200, {fake: true});

        fetchReviews(7)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_REVIEWS_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_REVIEWS_SUCCESS`,
                    payload: {fake: true}
                });
            })
    });

    it(`when server responded with status code which is different from 200 or an error occured`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onGet(`/comments/7`).reply(404);

        fetchReviews(7)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_REVIEWS_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_REVIEWS_FAIL`
                });
            })
    });
});

describe(`Operation of fetching should make correct post request to /comments/4`, () => {
  it(`and make subsequent get request to /comments/4 when server responded with 200 status code`, async () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();
    const mockApi = new MockAdapter(api);

    mockApi.onPost(`/comments/4`).reply(200)
            .onGet(`/comments/4`).reply(200);

    await store.dispatch(fetchReview(`Fake review`, 4));

    const actions = store.getActions();

    expect(actions[0]).toEqual({type: `FETCH_REVIEW_REQUEST`});
    expect(actions[1]).toEqual({type: `FETCH_REVIEW_SUCCESS`});
    expect(actions[2]).toEqual({type: `FETCH_REVIEWS_REQUEST`});
  });

  it(`when server responded with status code which is different from 200 or an error occured`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onPost(`/comments/4`).reply(404);

        fetchReview(`Fake review`, 4)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_REVIEW_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_REVIEW_FAIL`
                });
            })
    });
});

const initialState = {
    reviews: [],
    isReviewsLoading: false,
    isReviewsError: false,
    isReviewLoading: false,
    isReviewError: false
}

const state = {
    reviews: [{fake: true}],
    isReviewsLoading: true,
    isReviewsError: true,
    isReviewLoading: true,
    isReviewError: true
}

describe(`reviewsReducer changes the state properly`, () => {
    it(`should return initial state given undefined state-argument`, () => {
        expect(reviewsReducer(undefined, {})).toEqual(initialState);
    });

    it(`should return state without changes given action-argument with unknown type`, () => {
        expect(reviewsReducer(state, {type: `UNKNOWN`})).toEqual(state);
    });

    it(`should return right state given action-argument with type FETCH_REVIEWS_REQUEST`, () => {
        expect(reviewsReducer(state, {type: `FETCH_REVIEWS_REQUEST`}))
            .toEqual({
                reviews: [],
                isReviewsLoading: true,
                isReviewsError: false,
                isReviewLoading: true,
                isReviewError: true
            });
    });

    it(`should return right state given action-argument with type FETCH_REVIEWS_SUCCESS`, () => {
        expect(reviewsReducer(state, {type: `FETCH_REVIEWS_SUCCESS`, payload: [{fake: true}, {alsoFake: true}]}))
            .toEqual({
                reviews: [{fake: true}, {alsoFake: true}],
                isReviewsLoading: false,
                isReviewsError: false,
                isReviewLoading: true,
                isReviewError: true
            });
    });

    it(`should return right state given action-argument with type FETCH_REVIEWS_FAIL`, () => {
        expect(reviewsReducer(state, {type: `FETCH_REVIEWS_FAIL`}))
            .toEqual({
                reviews: [],
                isReviewsLoading: false,
                isReviewsError: true,
                isReviewLoading: true,
                isReviewError: true
            });
    });

    it(`should return right state given action-argument with type FETCH_REVIEW_REQUEST`, () => {
        expect(reviewsReducer(state, {type: `FETCH_REVIEW_REQUEST`}))
            .toEqual({
                reviews: [{fake: true}],
                isReviewsLoading: true,
                isReviewsError: true,
                isReviewLoading: true,
                isReviewError: false
            });
    });

    it(`should return right state given action-argument with type FETCH_REVIEW_SUCCESS`, () => {
        expect(reviewsReducer(state, {type: `FETCH_REVIEW_SUCCESS`}))
            .toEqual({
                reviews: [{fake: true}],
                isReviewsLoading: true,
                isReviewsError: true,
                isReviewLoading: false,
                isReviewError: false
            });
    });

    it(`should return right state given action-argument with type FETCH_REVIEW_FAIL`, () => {
        expect(reviewsReducer(state, {type: `FETCH_REVIEW_FAIL`}))
            .toEqual({
                reviews: [{fake: true}],
                isReviewsLoading: true,
                isReviewsError: true,
                isReviewLoading: false,
                isReviewError: true
            });
    });

    it(`should return right state given action-argument with type RESET_REVIEW_ERROR`, () => {
        expect(reviewsReducer(state, {type: `RESET_REVIEW_ERROR`}))
            .toEqual({
                reviews: [{fake: true}],
                isReviewsLoading: true,
                isReviewsError: true,
                isReviewLoading: true,
                isReviewError: false
            });
    });
});

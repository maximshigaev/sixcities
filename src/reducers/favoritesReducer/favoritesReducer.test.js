import MockAdapter from "axios-mock-adapter";

import {fetchFavorites, fetchFavorite} from '../../actions/favorites.js';
import {api} from '../../api.js';
import favoriteReducer from './favoritesReducer.js';

describe(`Operation of fetching should make correct get request to /favorite`, () => {
    it(`when server responded with 200 status code`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onGet(`/favorite`).reply(200, {fake: true});

        fetchFavorites()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_FAVORITES_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_FAVORITES_SUCCESS`,
                    payload: {fake: true}
                });
            })
    });

    it(`when server responded with status code which is different from 200 or an error occured`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onGet(`/favorite`).reply(404);

        fetchFavorites()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_FAVORITES_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_FAVORITES_FAIL`
                });
            })
    });
});

describe(`Operation of fetching should make correct post request to /favorite/id/1 and /favorite/id/0`, () => {
    it(`when server responded with 200 status code`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch1 = jest.fn();

        mockApi.onPost(`/favorite/3/1`).reply(200, {id: 3})
                .onPost(`/favorite/3/0`).reply(200, {id: 3});

        fetchFavorite(3, true)(dispatch1)
            .then(() => {
                expect(dispatch1).toHaveBeenCalledTimes(2);
                expect(dispatch1).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_FAVORITE_REQUEST`
                });
                expect(dispatch1).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_FAVORITE_SUCCESS`,
                    payload: 3
                });
            })

        const dispatch2 = jest.fn();

        fetchFavorite(3, false)(dispatch2)
            .then(() => {
                expect(dispatch2).toHaveBeenCalledTimes(2);
                expect(dispatch2).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_FAVORITE_REQUEST`
                });
                expect(dispatch2).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_FAVORITE_SUCCESS`,
                    payload: 3
                });
            })
    });

    it(`when server responded with status code which is different from 200 or an error occured`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch1 = jest.fn();

        mockApi.onPost(`/favorite/9/1`).reply(404)
                .onPost(`/favorite/9/0`).reply(404);

        fetchFavorite(9, true)(dispatch1)
            .then(() => {
                expect(dispatch1).toHaveBeenCalledTimes(2);
                expect(dispatch1).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_FAVORITE_REQUEST`
                });
                expect(dispatch1).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_FAVORITE_FAIL`
                });
            })

        const dispatch2 = jest.fn();

        fetchFavorite(9, false)(dispatch2)
            .then(() => {
                expect(dispatch2).toHaveBeenCalledTimes(2);
                expect(dispatch2).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_FAVORITE_REQUEST`
                });
                expect(dispatch2).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_FAVORITE_FAIL`
                });
            })
    });
});

const initialState = {
    favorites: [],
    isFavoritesLoading: false,
    isFavoritesError: false
}
const state = {
    favorites: [{fake: true}, {alsoFake: true}],
    isFavoritesLoading: true,
    isFavoritesError: true
}

describe(`favoritesReducer changes the state properly`, () => {
    it(`should return initial state given undefined state-argument`, () => {
        expect(favoriteReducer(undefined, {})).toEqual(initialState);
    });

    it(`should return state without changes given action-argument with unknown type`, () => {
        expect(favoriteReducer(state, {type: `UNKNOWN`})).toEqual(state);
    });

    it(`should return right state given action-argument with type FETCH_FAVORITES_REQUEST`, () => {
        expect(favoriteReducer(state, {type: `FETCH_FAVORITES_REQUEST`}))
            .toEqual({
                isFavoritesLoading: true,
                isFavoritesError: false,
                favorites: []
            });
    });

    it(`should return right state given action-argument with type FETCH_FAVORITES_SUCCESS`, () => {
        expect(favoriteReducer(state, {type: `FETCH_FAVORITES_SUCCESS`, payload: [{fake: true}]}))
            .toEqual({
                isFavoritesLoading: false,
                isFavoritesError: false,
                favorites: [{fake: true}]
            });
    });

    it(`should return right state given action-argument with type FETCH_FAVORITES_FAIL`, () => {
        expect(favoriteReducer(state, {type: `FETCH_FAVORITES_FAIL`}))
            .toEqual({
                isFavoritesLoading: false,
                isFavoritesError: true,
                favorites: []
            });
    });
});

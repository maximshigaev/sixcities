import MockAdapter from "axios-mock-adapter";

import fetchOffers from '../../actions/offers.js';
import {api} from '../../api.js';
import offersReducer from './offersReducer.js';

describe(`Operation of fetching should make correct get request to /login`, () => {
    it(`when server responded with 200 status code`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onGet(`/hotels`).reply(200, [{fake: true, city: {name:`Moscow`}}]);

        fetchOffers()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_OFFERS_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_OFFERS_SUCCESS`,
                    payload: {
                        offers: [{fake: true, city: {name:`Moscow`}}],
                        activeCity: `Moscow`
                    }
                });
            })
    });

    it(`when server responded with status code which is different from 200 or an error occured`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onGet(`/hotels`).reply(404);

        fetchOffers()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_OFFERS_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_OFFERS_FAIL`
                });
            })
    });
});

const initialState = {
    offers: [],
    isLoading: true,
    isError: false,
    activeCity: null,
    currentSorting: `Popular`,
    isFavoriteLoading: false,
    isFavoriteError: false
}

const state = {
    offers: [{price: 120, rating: 4, id: 1, is_favorite: false}, {price: 80, rating: 5, id: 4, is_favorite: false},
        {price: 100, rating: 3, id: 3, is_favorite: false}, {price: 140, rating: 2, id: 2, is_favorite: false}],
    isLoading: true,
    isError: true,
    activeCity: `Paris`,
    currentSorting: `Rating`,
    isFavoriteLoading: true,
    isFavoriteError: true
}

describe(`offersReducer changes the state properly`, () => {
    it(`should return initial state given undefined state-argument`, () => {
        expect(offersReducer(undefined, {})).toEqual(initialState);
    });

    it(`should return state without changes given action-argument with unknown type`, () => {
        expect(offersReducer(state, {type: `UNKNOWN`})).toEqual(state);
    });

    it(`should return right state given action-argument with type FETCH_OFFERS_REQUEST`, () => {
        expect(offersReducer(state, {type: `FETCH_OFFERS_REQUEST`})).toEqual({
            offers: [],
            isLoading: true,
            isError: false,
            activeCity: null,
            currentSorting: `Rating`,
            isFavoriteLoading: true,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type FETCH_OFFERS_SUCCESS`, () => {
        expect(offersReducer(state, {type: `FETCH_OFFERS_SUCCESS`, payload: {offers: [{fake: true}, {alsoFake: true}], activeCity: `Tokio`}})).toEqual({
            offers: [{fake: true}, {alsoFake: true}],
            isLoading: false,
            isError: false,
            activeCity: `Tokio`,
            currentSorting: `Rating`,
            isFavoriteLoading: true,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type FETCH_OFFERS_FAIL`, () => {
        expect(offersReducer(state, {type: `FETCH_OFFERS_FAIL`})).toEqual({
            offers: [],
            isLoading: false,
            isError: true,
            activeCity: `Paris`,
            currentSorting: `Rating`,
            isFavoriteLoading: true,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type SORT_BY and payload Popular`, () => {
        expect(offersReducer(state, {type: `SORT_BY`, payload: `Popular`})).toEqual({
            offers: [{price: 120, rating: 4, id: 1, is_favorite: false},
                {price: 140, rating: 2, id: 2, is_favorite: false}, {price: 100, rating: 3, id: 3, is_favorite: false},
                {price: 80, rating: 5, id: 4, is_favorite: false}],
            isLoading: true,
            isError: true,
            activeCity: `Paris`,
            currentSorting: `Popular`,
            isFavoriteLoading: true,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type SORT_BY and payload Price: low to high`, () => {
        expect(offersReducer(state, {type: `SORT_BY`, payload: `Price: low to high`})).toEqual({
            offers: [{price: 80, rating: 5, id: 4, is_favorite: false},
                {price: 100, rating: 3, id: 3, is_favorite: false}, {price: 120, rating: 4, id: 1, is_favorite: false},
                {price: 140, rating: 2, id: 2, is_favorite: false}],
            isLoading: true,
            isError: true,
            activeCity: `Paris`,
            currentSorting: `Price: low to high`,
            isFavoriteLoading: true,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type SORT_BY and payload Price: high to low`, () => {
        expect(offersReducer(state, {type: `SORT_BY`, payload: `Price: high to low`})).toEqual({
            offers: [{price: 140, rating: 2, id: 2, is_favorite: false},
                {price: 120, rating: 4, id: 1, is_favorite: false}, {price: 100, rating: 3, id: 3, is_favorite: false},
                {price: 80, rating: 5, id: 4, is_favorite: false}],
            isLoading: true,
            isError: true,
            activeCity: `Paris`,
            currentSorting: `Price: high to low`,
            isFavoriteLoading: true,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type SORT_BY and payload Top rated first`, () => {
        expect(offersReducer(state, {type: `SORT_BY`, payload: `Top rated first`})).toEqual({
            offers: [{price: 80, rating: 5, id: 4, is_favorite: false},
                {price: 120, rating: 4, id: 1, is_favorite: false}, {price: 100,rating: 3, id: 3, is_favorite: false},
                {price: 140, rating: 2, id: 2, is_favorite: false}],
            isLoading: true,
            isError: true,
            activeCity: `Paris`,
            currentSorting: `Top rated first`,
            isFavoriteLoading: true,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type ACTIVE_CITY_CHANGE`, () => {
        expect(offersReducer(state, {type: `ACTIVE_CITY_CHANGE`, payload: `Kiev`})).toEqual({
            offers: [{price: 120, rating: 4, id: 1, is_favorite: false},
                {price: 80, rating: 5, id: 4, is_favorite: false}, {price: 100, rating: 3, id: 3, is_favorite: false},
                {price: 140, rating: 2, id: 2, is_favorite: false}],
            isLoading: true,
            isError: true,
            activeCity: `Kiev`,
            currentSorting: `Rating`,
            isFavoriteLoading: true,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type FETCH_FAVORITE_REQUEST`, () => {
        expect(offersReducer(state, {type: `FETCH_FAVORITE_REQUEST`})).toEqual({
            offers: [{price: 120, rating: 4, id: 1, is_favorite: false},
                {price: 80, rating: 5, id: 4, is_favorite: false}, {price: 100, rating: 3, id: 3, is_favorite: false},
                {price: 140, rating: 2, id: 2, is_favorite: false}],
            isLoading: true,
            isError: true,
            activeCity: `Paris`,
            currentSorting: `Rating`,
            isFavoriteLoading: true,
            isFavoriteError: false
        });
    });

    it(`should return right state given action-argument with type FETCH_FAVORITE_FAIL`, () => {
        expect(offersReducer(state, {type: `FETCH_FAVORITE_FAIL`})).toEqual({
            offers: [{price: 120, rating: 4, id: 1, is_favorite: false},
                {price: 80, rating: 5, id: 4, is_favorite: false}, {price: 100, rating: 3, id: 3, is_favorite: false},
                {price: 140, rating: 2, id: 2, is_favorite: false}],
            isLoading: true,
            isError: true,
            activeCity: `Paris`,
            currentSorting: `Rating`,
            isFavoriteLoading: false,
            isFavoriteError: true
        });
    });

    it(`should return right state given action-argument with type FETCH_FAVORITE_SUCCESS`, () => {
        expect(offersReducer(state, {type: `FETCH_FAVORITE_SUCCESS`, payload: 4})).toEqual({
            offers: [{price: 120, rating: 4, id: 1, is_favorite: false},
                {price: 80, rating: 5, id: 4, is_favorite: false}, {price: 100, rating: 3, id: 3, is_favorite: false},
                {price: 140, rating: 2, id: 2, is_favorite: true}],
            isLoading: true,
            isError: true,
            activeCity: `Paris`,
            currentSorting: `Rating`,
            isFavoriteLoading: false,
            isFavoriteError: false
        });
    });
});

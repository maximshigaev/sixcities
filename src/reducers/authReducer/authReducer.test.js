import MockAdapter from "axios-mock-adapter";

import {fetchAuth, fetchAuthStatus} from '../../actions/auth.js';
import api from '../../api.js';
import authReducer from './authReducer.js';

describe(`Operation of fetching should make correct post request to /login`, () => {
    it(`when server responded with 200 status code`, () => {
        const mockApi = new MockAdapter(api.api);
        const dispatch = jest.fn();

        mockApi.onPost(`/login`).reply(200, {email: `example@mail.ru`});

        fetchAuth({email: `example@mail.ru`})(dispatch, () => {}, api)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_AUTH_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_AUTH_SUCCESS`,
                    payload: `example@mail.ru`
                });
            })
    });

    it(`when server responded with status code which is different from 200 or an error occured`, () => {
        const mockApi = new MockAdapter(api.api);
        const dispatch = jest.fn();

        mockApi.onPost(`/login`).reply(404);

        fetchAuth({email: `example@mail.ru`})(dispatch, () => {}, api)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_AUTH_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_AUTH_FAIL`
                });
            })
    });
});

describe(`Operation of fetching should make correct get request to /login`, () => {
    it(`when server responded with 200 status code`, () => {
        const mockApi = new MockAdapter(api.api);
        const dispatch = jest.fn();

        mockApi.onGet(`/login`).reply(200, {email: `example@mail.ru`});

        fetchAuthStatus()(dispatch, () => {}, api)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `AUTH_STATUS_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `AUTH_STATUS_SUCCESS`,
                    payload: `example@mail.ru`
                });
            })
    });

    it(`when server responded with status code which is different from 200 or 401 or an error occured`, () => {
        const mockApi = new MockAdapter(api.api);
        const dispatch = jest.fn();

        mockApi.onGet(`/login`).reply(404);

        fetchAuthStatus()(dispatch, () => {}, api)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `AUTH_STATUS_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `AUTH_STATUS_FAIL`
                });
            })
    });

    it(`when server responded with status code 401`, () => {
        const mockApi = new MockAdapter(api.api);
        const dispatch = jest.fn();

        mockApi.onGet(`/login`).reply(401);

        fetchAuthStatus()(dispatch, () => {}, api)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `AUTH_STATUS_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `AUTH_STATUS_UNAUTHORIZED`
                });
            })
    });
});

const initialState = {
    isLoggedIn: false,
    email: null,
    isAuthLoading: false,
    isAuthError: false,
    isAuthStatusLoading: true,
    isAuthStatusError: false
}

const state = {
    isLoggedIn: true,
    email: `Max`,
    isAuthLoading: true,
    isAuthError: true,
    isAuthStatusLoading: true,
    isAuthStatusError: true
}

describe(`authReducer changes the state properly`, () => {
    it(`should return initial state given undefined state-argument`, () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it(`should return state without changes given action-argument with unknown type`, () => {
        expect(authReducer(state, {type: `UNKNOWN`})).toEqual(state);
    });

    it(`should return right state given action-argument with type FETCH_AUTH_REQUEST`, () => {
        expect(authReducer(state, {type: `FETCH_AUTH_REQUEST`})).toEqual({
            isLoggedIn: false,
            email: null,
            isAuthLoading: true,
            isAuthError: false,
            isAuthStatusLoading: true,
            isAuthStatusError: true
        });
    });

    it(`should return right state given action-argument with type FETCH_AUTH_SUCCESS`, () => {
        expect(authReducer(state, {type: `FETCH_AUTH_SUCCESS`, payload: `example@mail.ru`})).toEqual({
            isLoggedIn: true,
            email: `example@mail.ru`,
            isAuthLoading: false,
            isAuthError: false,
            isAuthStatusLoading: true,
            isAuthStatusError: true
        });
    });

    it(`should return right state given action-argument with type FETCH_AUTH_FAIL`, () => {
        expect(authReducer(state, {type: `FETCH_AUTH_FAIL`})).toEqual({
            isLoggedIn: false,
            email: null,
            isAuthLoading: false,
            isAuthError: true,
            isAuthStatusLoading: true,
            isAuthStatusError: true
        });
    });

    it(`should return right state given action-argument with type AUTH_STATUS_REQUEST`, () => {
        expect(authReducer(state, {type: `AUTH_STATUS_REQUEST`})).toEqual({
            isLoggedIn: true,
            email: `Max`,
            isAuthLoading: true,
            isAuthError: true,
            isAuthStatusLoading: true,
            isAuthStatusError: false
        });
    });

    it(`should return right state given action-argument with type AUTH_STATUS_SUCCESS`, () => {
        expect(authReducer(state, {type: `AUTH_STATUS_SUCCESS`, payload: `example@mail.ru`})).toEqual({
            isLoggedIn: true,
            email: `example@mail.ru`,
            isAuthLoading: true,
            isAuthError: true,
            isAuthStatusLoading: false,
            isAuthStatusError: false
        });
    });

    it(`should return right state given action-argument with type AUTH_STATUS_UNAUTHORIZED`, () => {
        expect(authReducer(state, {type: `AUTH_STATUS_UNAUTHORIZED`})).toEqual({
            isLoggedIn: false,
            email: null,
            isAuthLoading: true,
            isAuthError: true,
            isAuthStatusLoading: false,
            isAuthStatusError: false
        });
    });

    it(`should return right state given action-argument with type AUTH_STATUS_FAIL`, () => {
        expect(authReducer(state, {type: `AUTH_STATUS_FAIL`})).toEqual({
            isLoggedIn: false,
            email: null,
            isAuthLoading: true,
            isAuthError: true,
            isAuthStatusLoading: false,
            isAuthStatusError: true
        });
    });
});

import MockAdapter from "axios-mock-adapter";

import fetchNearbyHotels from '../../actions/nearby.js';
import {api} from '../../api.js';
import nearbyReducer from './nearbyReducer.js';

describe(`Operation of fetching should make correct get request to /hotels/5/nearby`, () => {
    it(`when server responded with 200 status code`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onGet(`/hotels/5/nearby`).reply(200, {fake: true});

        fetchNearbyHotels(5)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_NEARBY_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_NEARBY_SUCCESS`,
                    payload: {fake: true}
                });
            });
    });

    it(`when server responded with status code which is different from 200 or an error occured`, () => {
        const mockApi = new MockAdapter(api);
        const dispatch = jest.fn();

        mockApi.onGet(`/hotels/5/nearby`).reply(404);

        fetchNearbyHotels(5)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: `FETCH_NEARBY_REQUEST`
                });
                expect(dispatch).toHaveBeenNthCalledWith(2, {
                    type: `FETCH_NEARBY_FAIL`
                });
            });
    });
});

const initialState = {
    nearbyHotels: [],
    isNearbyLoading: false,
    isNearbyError: false
}

const state = {
    nearbyHotels: [{fake: true}, {alsoFake: true}],
    isNearbyLoading: false,
    isNearbyError: false
}

describe(`nearbyReducer changes the state properly`, () => {
    it(`should return initial state given undefined state-argument`, () => {
        expect(nearbyReducer(undefined, {})).toEqual(initialState);
    });

    it(`should return state without changes given action-argument with unknown type`, () => {
        expect(nearbyReducer(state, {type: `UNKNOWN`})).toEqual(state);
    });

    it(`should return right state given action-argument with type FETCH_NEARBY_REQUEST`, () => {
        expect(nearbyReducer(state, {type: `FETCH_NEARBY_REQUEST`})).toEqual({
            nearbyHotels: [],
            isNearbyLoading: true,
            isNearbyError: false
        });
    });

    it(`should return right state given action-argument with type FETCH_NEARBY_SUCCESS`, () => {
        expect(nearbyReducer(state, {type: `FETCH_NEARBY_SUCCESS`,
            payload: [{fake: true}, {alsoFake: true}, {anotherFake: true}, {otherFake: true}]}
        )).toEqual({
            nearbyHotels: [{fake: true}, {alsoFake: true}, {anotherFake: true}],
            isNearbyLoading: false,
            isNearbyError: false
        });
    });

    it(`should return right state given action-argument with type FETCH_NEARBY_FAIL`, () => {
        expect(nearbyReducer(state, {type: `FETCH_NEARBY_FAIL`})).toEqual({
            nearbyHotels: [],
            isNearbyLoading: false,
            isNearbyError: true
        });
    });
});

import {focusCard} from '../../actions/helpers.js';
import cardReducer from './cardReducer.js';

it(`Action focusCard should return object with the right payload`, () => {
    expect(focusCard(10)).toEqual({
        type: `FOCUS_CARD`,
        payload: 10
    });
});

const initialState = {
    focusedCard: null
}

const state = {
    focusedCard: 5
}

describe(`cardReducer changes the state properly`, () => {
    it(`should return initial state given undefined state-argument`, () => {
        expect(cardReducer(undefined, {})).toEqual(initialState);
    });

    it(`should return state whithout changes given action-argument with unknown type`, () => {
        expect(cardReducer(state, {type: `UNKNOWN`})).toEqual(state);
    });

    it(`should return right state given action-argument with type FOCUS_CARD`, () => {
        expect(cardReducer(state, {type: `FOCUS_CARD`, payload: 8})).toEqual({
            focusedCard: 8
        });
    });

    it(`should return right state given action-argument with type BLUR_CARD`, () => {
        expect(cardReducer(state, {type: `BLUR_CARD`})).toEqual({
            focusedCard: null
        });
    });
});

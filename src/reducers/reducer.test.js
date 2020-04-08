// import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from './reducer.js';

Enzyme.configure({adapter: new Adapter()});

const initialState = {
    offers: null,
    isLoggedIn: false,
    isLoading: true,
    isError: false
}

const currentState = {
    offers: [],
    isLoggedIn: true,
    isLoading: false,
    isError: false 
}

const offers = [
    {
        price: 120,
        isPinned: false,
        isPremium: true,
        rating: 4,
        title: `Beautiful luxurious apartment at great location`,
        type: `Apartment`,
        src: `img/apartment-01.jpg`,
        id: 0
    },
    {
        price: 80,
        isPinned: true,
        isPremium: false,
        rating: 4,
        title: `Wood and stone place`,
        type: `Private room`,
        src: `img/room.jpg`,
        id: 1
    }
];

describe(`Logic of reducer is correct`, () => {
    it(`Reducer returns initial state given undefined state argument`, () => {
        expect(reducer(undefined, {
            type: `FETCH_OFFERS_REQUEST`
        })).toEqual(initialState);
    });

    it(`Reducer returns state without changes given unknown action argument`, () => {
        expect(reducer(currentState, {
            type: `UNKNOWN`
        })).toEqual(currentState);
    });

    it(`Reducer returns proper state given 'FETCH_OFFERS_REQUEST' action argument`, () => {
        expect(reducer(currentState, {
            type: `FETCH_OFFERS_REQUEST`
        })).toEqual({
            offers: [],
            isLoggedIn: true,
            isLoading: true,
            isError: false 
        });
    });

     it(`Reducer returns proper state given 'FETCH_OFFERS_SUCCESS' action argument`, () => {
        expect(reducer(currentState, {
            type: `FETCH_OFFERS_SUCCESS`,
            payload: offers
        })).toEqual({
            offers,
            isLoading: false,
            isLoggedIn: true,
            isError: false 
        });
    });

    it(`Reducer returns proper state given 'FETCH_OFFERS_FAIL' action argument`, () => {
        expect(reducer(currentState, {
            type: `FETCH_OFFERS_FAIL`
        })).toEqual({
            offers: [],
            isLoggedIn: true,
            isLoading: false,
            isError: true 
        });
    });
});

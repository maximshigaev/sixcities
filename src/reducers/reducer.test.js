import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from './reducer.js';
import sortOffers from '../utils/sortOffers.js';

Enzyme.configure({adapter: new Adapter()});

const initialState = {
    offers: [],
    isLoggedIn: false,
    isLoading: true,
    isError: false,
    currentSorting: `Popular`,
    email: null,
    isAuthLoading: false
}

const currentState = {
    offers: [],
    isLoggedIn: true,
    isLoading: false,
    isError: false,
    currentSorting: `Popular`,
    isAuthLoading: false
}

const offers = [
    {
        price: 120,
        rating: 4,
        id: 1
    },
    {
        price: 80,
        rating: 5,
        id: 4
    },
    {
        price: 100,
        rating: 3,
        id: 3
    },
    {
        price: 140,
        rating: 2,
        id: 2
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
            isError: false,
            currentSorting: `Popular`,
            email: null,
            isAuthLoading: false
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
            isError: false,
            currentSorting: `Popular`,
            email: null,
            isAuthLoading: false
        });
    });

    it(`Reducer returns proper state given 'FETCH_OFFERS_FAIL' action argument`, () => {
        expect(reducer(currentState, {
            type: `FETCH_OFFERS_FAIL`
        })).toEqual({
            offers: [],
            isLoggedIn: true,
            isLoading: false,
            isError: true,
            currentSorting: `Popular`,
            email: null,
            isAuthLoading: false
        });
    });

    it(`Sorting function returns the right value given 'Popular' sorting type`, () => {
        expect(sortOffers(offers, `Popular`))
            .toEqual([
                {
                    price: 120,
                    rating: 4,
                    id: 1
                },
                {
                    price: 140,
                    rating: 2,
                    id: 2
                },
                {
                    price: 100,
                    rating: 3,
                    id: 3
                },
                {
                    price: 80,
                    rating: 5,
                    id: 4
                }
            ]);
    });

    it(`Sorting function returns the right value given 'Price: low to high' sorting type`, () => {
        expect(sortOffers(offers, `Price: low to high`))
            .toEqual([
                {
                    price: 80,
                    rating: 5,
                    id: 4
                },
                {
                    price: 100,
                    rating: 3,
                    id: 3
                },
                {
                    price: 120,
                    rating: 4,
                    id: 1
                },
                                {
                    price: 140,
                    rating: 2,
                    id: 2
                }
            ]);
    });

    it(`Sorting function returns the right value given 'Price: high to low' sorting type`, () => {
        expect(sortOffers(offers, `Price: high to low`))
            .toEqual([                     
                {
                    price: 140,
                    rating: 2,
                    id: 2
                },
                {
                    price: 120,
                    rating: 4,
                    id: 1
                },
                {
                    price: 100,
                    rating: 3,
                    id: 3
                },
                {
                    price: 80,
                    rating: 5,
                    id: 4
                }
            ]);
    });

    it(`Sorting function returns the right value given 'Top rated first' sorting type`, () => {
        expect(sortOffers(offers, `Top rated first`))
            .toEqual([                     
                {
                    price: 80,
                    rating: 5,
                    id: 4
                },
                {
                    price: 120,
                    rating: 4,
                    id: 1
                },
                {
                    price: 100,
                    rating: 3,
                    id: 3
                },
                {
                    price: 140,
                    rating: 2,
                    id: 2
                }
            ]);
    });
});

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {CardListContainer} from './cardListContainer.jsx';

const offers =  [{price: 120, is_premium: true, is_favorite: false, rating: 4, src: `img/apartment-01.jpg`,
    title: `Beautiful luxurious apartment at great location`, type: `Apartment`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, id: 0},
    {price: 100, is_premium: false, is_favorite: true, rating: 5, src: `img/apartment-02.jpg`,
    title: `Perfectly located Castro`, type: `Room`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, id: 1},
    {price: 80, is_premium: true, is_favorite: true, rating: 3, src: `img/apartment-03.jpg`,
    title: `Waterfront with extraordinary view`, type: `Hotel`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, id: 2}
];

Enzyme.configure({adapter: new Adapter()});

it(`fetchOffers callback should be invoked right after the cardListContainer component will be mounted`, () => {
    const fetchOffers = jest.fn();

    mount(<CardListContainer offers={offers} fetchOffers={fetchOffers} activeCity={null} isError={false}
        isLoading={true}
    />);

    expect(fetchOffers).toHaveBeenCalledTimes(1);
});

import React from 'react';
import renderer from 'react-test-renderer';

import CardList from './cardList.jsx';

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
    },
    {
        price: 132,
        isPinned: false,
        isPremium: false,
        rating: 4,
        title: `Canal View Prinsengracht`,
        type: `Apartment`,
        src: `img/apartment-02.jpg`,
        id: 2
    },
    {
        price: 180,
        isPinned: false,
        isPremium: true,
        rating: 5,
        title: `Nice, cozy, warm big bed apartment`,
        type: `Apartment`,
        src: `img/apartment-03.jpg`,
        id: 3
    }
];

it(`Correctly renders the CardList component`, () => {
        const tree = renderer.create(<CardList offers={offers} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

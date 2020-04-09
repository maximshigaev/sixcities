import React from 'react';
import renderer from 'react-test-renderer';

import {Card} from './card.jsx';

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
    }
]

describe(`Correctly renders`, () => {
    it(`Correctly renders Card component which is not pinned, premium or hovered`, () => {
        const tree = renderer.create(<Card offer={offers[2]} onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()} isHovered={false}/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`Correctly renders Card component which is not pinned, premium but hovered`, () => {
        const tree = renderer.create(<Card offer={offers[2]} onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()} isHovered={true}/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });   
    
    it(`Correctly renders Card component which is not pinned, hovered but premium`, () => {
        const tree = renderer.create(<Card offer={offers[0]} onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()} isHovered={false}/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`Correctly renders Card component which is not premium, hovered but pinned`, () => {
        const tree = renderer.create(<Card offer={offers[1]} onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()} isHovered={false}/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

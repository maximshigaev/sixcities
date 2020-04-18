import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

import {Card} from './card.jsx';

const offers = [
    {
        price: 120,
        is_premium: true,
        is_favorite: false,
        rating: 4,
        title: `Beautiful luxurious apartment at great location`,
        type: `Apartment`,
        preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
        src: `img/apartment-01.jpg`,
        id: 0
    },
    {
        price: 80,
        is_premium: false,
        is_favorite: false,
        rating: 4,
        title: `Wood and stone place`,
        type: `Private room`,
        preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
        src: `img/room.jpg`,
        id: 1
    },
    {
        price: 132,
        is_premium: false,
        is_favorite: true,
        rating: 4,
        title: `Canal View Prinsengracht`,
        type: `Apartment`,
        preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`,
        src: `img/apartment-02.jpg`,
        id: 2
    }
]

describe(`Correctly renders Card component which is located on the offerPage`, () => {
    it(`which is neither favorite nor premium`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[1]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={true} isNearby={false} isFavPage={false}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`which is not favorite but premium`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[0]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={true} isNearby={false} isFavPage={false}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });   
    
    it(`which is not premium but favorite`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[2]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={true} isNearby={false} isFavPage={false}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

describe(`Correctly renders Card component which is located on the mainPage`, () => {
    it(`which is neither favorite nor premium`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[1]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={false} isNearby={true} isFavPage={false}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`which is not favorite but premium`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[0]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={false} isNearby={true} isFavPage={false}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });   
    
    it(`which is not premium but favorite`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[2]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={false} isNearby={true} isFavPage={false}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

describe(`Correctly renders Card component which is located on the favoritesPage`, () => {
    it(`which is neither favorite nor premium`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[1]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={false} isNearby={false} isFavPage={true}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`which is not favorite but premium`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[0]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={false} isNearby={false} isFavPage={true}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });   
    
    it(`which is not premium but favorite`, () => {
        const tree = renderer.create(
            <Router>
                <Card offer={offers[2]} cardMouseEnterHandler={() => {}}
                    cardMouseLeaveHandler={() => {}} isMain={false} isNearby={false} isFavPage={true}
                />
            </Router>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

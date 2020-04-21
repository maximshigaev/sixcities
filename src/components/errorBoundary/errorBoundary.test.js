import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

import ErrorBoundary from './errorBoundary.jsx';
import {Card} from '../card/card.jsx';

const offer = {
    price: 120,
    is_premium: true,
    is_favorite: false,
    rating: 4,
    title: `Beautiful luxurious apartment at great location`,
    type: `Apartment`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
    src: `img/apartment-01.jpg`,
    id: 1
};

describe(`Correctly renders the ErrorBoundary component`, () => {
    it(`when there is no errors should render the children property`, () => {
        const tree = renderer.create(
            <ErrorBoundary>
                <Router>
                    <Card offer={offer} cardMouseEnterHandler={() => {}} cardMouseLeaveHandler={() => {}} isMain={true}
                        isNearby={false} isFavPage={false}
                    />
                </Router>
            </ErrorBoundary>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

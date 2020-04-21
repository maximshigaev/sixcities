import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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

Enzyme.configure({adapter: new Adapter()});

describe(`The ErrorBoundary component should timely invoke componentDidCatch callback and correspondingly change it's
    return value`,
() => {
    it(`The invocation of componentDidCatch method should set the state.isError property as true`, () => {
        const errorBoundary = mount(
            <ErrorBoundary>
                <Router>
                    <Card offer={offer} cardMouseEnterHandler={() => {}} cardMouseLeaveHandler={() => {}} isMain={true}
                        isNearby={false} isFavPage={false}
                    />
                </Router>
            </ErrorBoundary>);

        errorBoundary.instance().componentDidCatch();
        
        expect(errorBoundary.state().isError).toEqual(true);
    });

    it(`When the state.isError property is equal true, component should render the ErrorIndicator component`, () => {
        const errorBoundary = mount(
            <ErrorBoundary>
                <Router>
                    <Card offer={offer} cardMouseEnterHandler={() => {}} cardMouseLeaveHandler={() => {}} isMain={true}
                        isNearby={false} isFavPage={false}
                    />
                </Router>
            </ErrorBoundary>);

        errorBoundary.setState({isError: true});

        const markup = "<div class=\"cities__status-wrapper tabs__content\"><b class=\"cities__status\">We're sorry</b><p class=\"cities__status-description\">It's been an error during the process of loading of this website. Please, reload the page and try again</p></div>";

        expect(errorBoundary.html()).toEqual(markup);
    });
});

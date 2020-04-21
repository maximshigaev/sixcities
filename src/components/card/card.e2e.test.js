import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Card} from './card.jsx';

Enzyme.configure({adapter: new Adapter()});

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

describe(`Interactions with user invoke appropriate callbacks with the right values`, () => {
    it(`When user hovers the cursor over the component, corresponding onMouseenter callback is invoked with the right id
        parameter`,
    () => {
        const cardMouseEnterHandler = jest.fn();
        const card = shallow(
            <Card offer={offer} cardMouseEnterHandler={cardMouseEnterHandler} cardMouseLeaveHandler={() => {}} isMain={true} isNearby={false} isFavPage={false} />);
        const article = card.find(`article`);

        article.simulate(`mouseenter`);

        expect(cardMouseEnterHandler).toHaveBeenCalledTimes(1);
        expect(cardMouseEnterHandler).toHaveBeenNthCalledWith(1, 1);
    });

    it(`When user moves the cursor away from component, corresponding onMouseleave callback is invoked`, () => {
        const cardMouseLeaveHandler = jest.fn((...args) => [...args]);
        const card = shallow(
            <Card offer={offer} cardMouseEnterHandler={() => {}} cardMouseLeaveHandler={cardMouseLeaveHandler} isMain={true} isNearby={false} isFavPage={false} />);
        const article = card.find(`article`);

        article.simulate(`mouseleave`);

        expect(cardMouseLeaveHandler).toHaveBeenCalledTimes(1);
        expect(cardMouseLeaveHandler.mock.calls[0][0]).toEqual(undefined);

    });
});

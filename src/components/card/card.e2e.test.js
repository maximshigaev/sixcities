import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card.jsx';

Enzyme.configure({adapter: new Adapter()});

const offer =  {
    price: 80,
    isPinned: true,
    isPremium: false,
    rating: 4,
    title: `Wood and stone place`,
    type: `Private room`,
    src: `img/room.jpg`,
    id: 1
};

describe(`Interactions with user triggers appropriate callbacks with right values`, () => {
    it(`When mouse starts to be over the component, corresponding mouseenter callback is triggered`, () => {
        const mouseEnterHandler = jest.fn();
        const card = shallow(<Card offer={offer} onMouseEnter={mouseEnterHandler}
            onMouseLeave={jest.fn()} isHovered={false} />);
        const article = card.find(`article`);

        article.simulate(`mouseenter`);

        expect(mouseEnterHandler).toHaveBeenCalledTimes(1);
    });

    it(`When mouse starts to be over the component, corresponding mouseenter callback is triggered with the right
        value`, () => {
        const mouseEnterHandler = jest.fn();
        const card = shallow(<Card offer={offer} onMouseEnter={mouseEnterHandler}
            onMouseLeave={jest.fn()} isHovered={false} />);
        const article = card.find(`article`);

        article.simulate(`mouseenter`);

        expect(mouseEnterHandler).toHaveBeenNthCalledWith(1, offer.id);
    });

    it(`When mouse ends to be over the component, corresponding mouseleave callback is triggered`, () => {
        const mouseLeaveHandler = jest.fn();
        const card = shallow(<Card offer={offer} onMouseEnter={jest.fn()}
            onMouseLeave={mouseLeaveHandler} isHovered={false} />);
        const article = card.find(`article`);

        article.simulate(`mouseleave`);

        expect(mouseLeaveHandler).toHaveBeenCalledTimes(1);
    });
});

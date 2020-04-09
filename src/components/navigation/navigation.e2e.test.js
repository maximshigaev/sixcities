import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Navigation} from './navigation.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Interactions with user invokes appropriate callbacks with right values`, () => {
    it(`Click on the link should invoke callback only one time`, () => {
        const linkClickHandler = jest.fn();
        const citiesNames = [`Paris`, `Hamburg`, `Cologne`, `Amsterdam`, `Dusseldorf`, `Brussels`]
        const nav = shallow(<Navigation navItemClickHandler={linkClickHandler} activeCity="Amsterdam"
            citiesNames={citiesNames}
        />);
        const link = nav.find(`a[id="Paris"]`);

        link.simulate(`click`);

        expect(linkClickHandler).toHaveBeenCalledTimes(1);
    });

    it(`Click on the link should invoke callback with theright value`, () => {
        const linkClickHandler = jest.fn();
        const citiesNames = [`Paris`, `Hamburg`, `Cologne`, `Amsterdam`, `Dusseldorf`, `Brussels`]
        const nav = shallow(<Navigation navItemClickHandler={linkClickHandler} activeCity="Amsterdam"
            citiesNames={citiesNames}
        />);
        const link = nav.find(`a[id="Amsterdam"]`);

        link.simulate(`click`);

        expect(linkClickHandler).toHaveBeenNthCalledWith(1, `Amsterdam`);
    });
});

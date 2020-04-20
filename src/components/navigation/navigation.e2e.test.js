import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Navigation} from './navigation.jsx';

const citiesNames = [`Paris`, `Amsterdam`, `Tokio`, `Kiev`, `Moscow`, `Krakow`];

Enzyme.configure({adapter: new Adapter()});

it(`When user clicks on the link, the correspondent callback is invoked with the right value`, () => {
    const navItemClickHandler = jest.fn();

    const navigation = shallow(
        <Navigation navItemClickHandler={navItemClickHandler} activeCity="Moscow" citiesNames={citiesNames} />
    );

    const link = navigation.find(`a`).at(2);
    link.simulate(`click`);

    expect(navItemClickHandler).toHaveBeenCalledTimes(1);
    expect(navItemClickHandler).toHaveBeenNthCalledWith(1, `Tokio`);
});

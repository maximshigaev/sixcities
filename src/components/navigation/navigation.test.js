import React from 'react';
import renderer from 'react-test-renderer';

import {Navigation} from './navigation.jsx';

const citiesNames = [`Paris`, `Amsterdam`, `Tokio`, `Kiev`, `Moscow`, `Krakow`];

it(`Correctly renders the Navigation component`, () => {
    const tree = renderer.create(
        <Navigation navItemClickHandler={() => {}} activeCity="Paris"
            citiesNames={citiesNames}
        />)
    .toJSON();

    expect(tree).toMatchSnapshot();
});

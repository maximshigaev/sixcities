import React from 'react';
import renderer from 'react-test-renderer';

import Navigation from './navigation.jsx';

it(`Correctly renders the Filter component `, () => {
    const tree = renderer.create(<Navigation />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

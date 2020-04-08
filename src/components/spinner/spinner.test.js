import React from 'react';
import renderer from 'react-test-renderer';

import Spinner from './spinner.jsx';

it(`Correctly renders the Spinner component `, () => {
    const tree = renderer.create(<Spinner />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

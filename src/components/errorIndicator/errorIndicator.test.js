import React from 'react';
import renderer from 'react-test-renderer';

import ErrorIndicator from './errorIndicator.jsx';

it(`Correctly renders the ErrorIndicator component`, () => {
    const tree = renderer.create(<ErrorIndicator operation="loading of the list of reviews" />);

    expect(tree).toMatchSnapshot();
});

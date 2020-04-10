import React from 'react';
import renderer from 'react-test-renderer';

import LoginPage from './loginPage.jsx';

it(`Correctly renders the LoginPage component `, () => {
    const tree = renderer.create(<LoginPage />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';

import MainPage from './mainPage.jsx';

it(`Correctly renders the MainPage component `, () => {
    const tree = renderer.create(<MainPage />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

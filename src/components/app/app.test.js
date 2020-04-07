import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

it(`Correctly renders`, () => {
    const tree = renderer.create(<App onClick={jest.fn()}/>).toJSON();

    expect(tree).toMatchSnapshot();
});

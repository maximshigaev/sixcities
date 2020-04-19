import React from 'react';
import renderer from 'react-test-renderer';

import CardListEmpty from './cardListEmpty.jsx';

it(`Correctly renders the CardListEmpty component`, () => {
    const tree = renderer.create(<CardListEmpty city='Paris' />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

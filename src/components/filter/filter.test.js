import React from 'react';
import renderer from 'react-test-renderer';

import {Filter} from './filter.jsx';

it(`Correctly renders the Filter component`, () => {
    const tree = renderer.create(<Filter sortOptionClickHandler={jest.fn()} currentSorting={`Popular`} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

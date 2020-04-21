import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewsMap} from './reviewsMap.jsx';

it(`Correctly renders the ReviewsMap component`, () => {
    const tree = renderer.create(<ReviewsMap isTestMode={true} history={{}} />).toJSON();

    expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';

import {Map} from './map.jsx';

describe(`Correctly renders the Map component`, () => {
    it(`when isLoading property is equal true`, () => {
        const tree = renderer.create(<Map isLoading={true} history={{}} />);

        expect(tree).toMatchSnapshot();
    });

    it(`when isLoading property is equal false`, () => {
        const tree = renderer.create(<Map isLoading={false} history={{}} />);

        expect(tree).toMatchSnapshot();
    });
});

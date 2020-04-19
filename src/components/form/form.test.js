import React from 'react';
import renderer from 'react-test-renderer';

import Form from './form.jsx';

it(`Correctly renders the Form component`, () => {
    const tree = renderer.create(<Form onSubmit={() => {}} />).toJSON();

    expect(tree).toMatchSnapshot();
});

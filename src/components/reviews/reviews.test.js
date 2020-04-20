import React from 'react';
import renderer from 'react-test-renderer';

import Reviews from './reviews.jsx';

const reviews = [{id: 1, rating: 3, date: `2020-04-13T20:25:41.450Z`, user: {id: 15, is_pro: false, name: `Kendall`, 
    avatar_url: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/6.jpg`},
    comment: `I stayed here for one night and it was an unpleasant experience.`},
    {id: 2, rating: 2, date: `2020-04-13T20:25:41.450Z`, user: {id: 13, is_pro: false, name: `Zak`,
    avatar_url: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/4.jpg`},
    comment: `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an
    amazing view of the river!`}
];

it(`Correctly renders the Reviews component`, () => {
    const tree = renderer.create(<Reviews reviews={reviews} />).toJSON();

    expect(tree).toMatchSnapshot();
});

import React from 'react';
import Enzyme ,{mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {NearbyHotelsContainer} from './nearbyHotelsContainer.jsx';

const nearbyHotels =  [{price: 120, is_premium: true, is_favorite: false, rating: 4, src: `img/apartment-01.jpg`,
    title: `Beautiful luxurious apartment at great location`, type: `Apartment`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, id: 1},
    {price: 100, is_premium: false, is_favorite: true, rating: 5, src: `img/apartment-02.jpg`,
    title: `Perfectly located Castro`, type: `Room`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, id: 2},
    {price: 80, is_premium: true, is_favorite: true, rating: 3, src: `img/apartment-03.jpg`,
    title: `Waterfront with extraordinary view`, type: `Hotel`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, id: 3}
];

Enzyme.configure({adapter: new Adapter()});

it(`fetchNearbyHotels callback should be invoked with the right value right after the NearbyHotelsContainer component
    will be mounted`,
() => {
    const fetchNearbyHotels = jest.fn();
    const mockStore = configureStore([]);
    const store = mockStore();

    mount(<Provider store={store}>
            <Router>
                <NearbyHotelsContainer nearbyHotels={nearbyHotels} isNearbyLoading={false} isNearbyError={false}
                    fetchNearbyHotels={fetchNearbyHotels} id={5}
                />
            </Router>
        </Provider>);

    expect(fetchNearbyHotels).toHaveBeenCalledTimes(1);
    expect(fetchNearbyHotels).toHaveBeenNthCalledWith(1, 5);
});

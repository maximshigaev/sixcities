import React  from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {FavoritesPage} from './favoritesPage.jsx';

const favorites =  [{price: 120, is_premium: true, is_favorite: false, rating: 4, src: `img/apartment-01.jpg`,
    title: `Beautiful luxurious apartment at great location`, type: `Apartment`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, city: {name: `Cologne`,
    location: {latitude: 50.938361, longitude: 6.959974, zoom: 13}}, id: 1},
    {price: 100, is_premium: false, is_favorite: true, rating: 5, src: `img/apartment-02.jpg`,
    title: `Perfectly located Castro`, type: `Room`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, city: {name: `Brussels`,
    location: {latitude: 50.846557, longitude: 4.351697, zoom: 13}}, id: 2},
    {price: 80, is_premium: true, is_favorite: true, rating: 3, src: `img/apartment-03.jpg`,
    title: `Waterfront with extraordinary view`, type: `Hotel`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,  city :{name :`Hamburg`,
    location :{latitude: 53.550341, longitude: 10.000654, zoom: 13}}, id: 3}
];

Enzyme.configure({adapter: new Adapter()});
 
it(`fetchFavorites callback should be invoked right after the FavoritesPage component will be mounted`, () => {
    const fetchFavorites = jest.fn((...args) => [...args]);
    const mockStore = configureStore([]);
    const store = mockStore({auth: {isLoggedIn: false, isAuthStatusLoading: false , isAuthStatusError: false}});

    mount(<Provider store={store}>
            <Router>
                <FavoritesPage favorites={favorites} isLoggedIn={true} isFavoritesLoading={false}
                    isFavoritesError={false} fetchFavorites={fetchFavorites}
                />
            </Router>
        </Provider>);

    expect(fetchFavorites).toHaveBeenCalledTimes(1);
    expect(fetchFavorites.mock.calls[0][0]).toEqual(undefined);
});

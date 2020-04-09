import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import MainPage from '../pages/mainPage/mainPage.jsx';
import LoginPage from '../pages/loginPage/loginPage.jsx';
import FavoritesPage from '../pages/favoritesPage/favoritesPage.jsx';
import OfferPage from '../pages/offerPage/offerPage.jsx';

const App = () => {
	return (
		<Switch>
			<Route path="/" component={MainPage} exact />
			<Route path="/login" component={LoginPage} exact />
			{/* <Route path="/favorites" component={FavoritesPage} exact />
			<Route path="/offer/:id" component={OfferPage} exact /> */}
			<Redirect to="/" />
		</Switch>
	);
}

export default App;

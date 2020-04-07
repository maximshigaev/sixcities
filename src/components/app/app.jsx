import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import MainPage from '../pages/mainPage.jsx';
import LoginPage from '../pages/loginPage.jsx';
import FavoritesPage from '../pages/favoritesPage.jsx';
import OfferPage from '../pages/offerPage.jsx';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" component={MainPage} exact/>
				<Route path="/login" component={LoginPage} exact/>
				<Route path="/favorites" component={FavoritesPage} exact/>
				<Route path="/offer/:id" component={OfferPage} exact/>
				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;

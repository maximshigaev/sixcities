import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import MainPage from '../pages/mainPage/mainPage.jsx';
import LoginPage from '../pages/loginPage/loginPage.jsx';
import FavoritesPage from '../pages/favoritesPage/favoritesPage.jsx';
import OfferPage from '../pages/offerPage/offerPage.jsx';
import {fetchAuthStatus} from '../../actions/auth.js';

const App = ({fetchAuthStatus}) => {
	useEffect(() => {
		fetchAuthStatus();
	});

	return (
		<Switch>
			<Route path={`${process.env.PUBLIC_URL}/`} component={MainPage} exact />
			<Route path={`${process.env.PUBLIC_URL}/login`} component={LoginPage} exact />
			<Route path={`${process.env.PUBLIC_URL}/favorites`} component={FavoritesPage} exact />
			<Route path={`${process.env.PUBLIC_URL}/offer/:id`} component={OfferPage} exact />
			<Redirect to={`${process.env.PUBLIC_URL}/`} />
		</Switch>
	);
}

App.propTypes = {
	fetchAuthStatus: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
		fetchAuthStatus: bindActionCreators(fetchAuthStatus, dispatch)
    }
}

export {App};
export default connect(null, mapDispatchToProps)(App);

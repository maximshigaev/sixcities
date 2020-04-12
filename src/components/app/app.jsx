import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import MainPage from '../pages/mainPage/mainPage.jsx';
import LoginPage from '../pages/loginPage/loginPage.jsx';
import FavoritesPage from '../pages/favoritesPage/favoritesPage.jsx';
import OfferPage from '../pages/offerPage/offerPage.jsx';
import {fetchAuthStatus} from '../../actions/auth.js';

class App extends React.PureComponent {
	static propTypes = {
		fetchAuthStatus: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.props.fetchAuthStatus();
    }

	render() {
		return (
			<Switch>
				<Route path="/" component={MainPage} exact />
				<Route path="/login" component={LoginPage} exact />
				<Route path="/favorites" component={FavoritesPage} exact />
				<Route path="/offer/:id" component={OfferPage} exact />
				<Redirect to="/" />
			</Switch>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		fetchAuthStatus: bindActionCreators(fetchAuthStatus, dispatch)
    }
}

export {App};
export default connect(() => ({}), mapDispatchToProps)(App);

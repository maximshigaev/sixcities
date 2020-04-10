import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainPage from '../pages/mainPage/mainPage.jsx';
import LoginPage from '../pages/loginPage/loginPage.jsx';
import FavoritesPage from '../pages/favoritesPage/favoritesPage.jsx';
import OfferPage from '../pages/offerPage/offerPage.jsx';
import {fetchOffers} from '../../actions.js';

class App extends React.PureComponent {
	componentDidMount() {
        this.props.fetchOffers();
    }

	render() {
		return (
			<Switch>
				<Route path="/" component={MainPage} exact />
				<Route path="/login" component={LoginPage} exact />
				{/* <Route path="/favorites" component={FavoritesPage} exact /> */}
				<Route path="/offer/:id" component={OfferPage} exact />
				<Redirect to="/" />
			</Switch>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOffers: bindActionCreators(fetchOffers, dispatch)
    }
}

export {App};
export default connect(() => ({}), mapDispatchToProps)(App);

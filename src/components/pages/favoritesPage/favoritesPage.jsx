import React  from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {Link, Redirect} from 'react-router-dom';

import {fetchFavorites} from '../../../actions/favorites.js';
import Spinner from '../../spinner/spinner.jsx';
import Header from '../../header/header.jsx';
import FavoritesList from '../../favoritesList/favoritesList.jsx';

class FavoritesPage extends React.PureComponent {
    static propTypes = {
        favorites: PropTypes.array,
        fetchFavorites: PropTypes.func.isRequired,
        isFavoritesLoading: PropTypes.bool.isRequired,
        isFavoritesError: PropTypes.bool.isRequired,
        isLoggedIn: PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.props.fetchFavorites();
    }

    render() {
        const {favorites, isFavoritesLoading, isFavoritesError, isLoggedIn} = this.props;

        if(!isLoggedIn) {
            return <Redirect to="/login" />;
        }

        if(isFavoritesLoading) {
            return <Spinner />;
        }

        return (
            <div className={(favorites.length) ? `page`: `page page--favorites-empty`}>
                <Header isMain={false} />
                <FavoritesList />
                <footer className="footer">
                    <Link to="/" className="footer__logo-link">
                        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
                    </Link>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = ({favorites, isFavoritesLoading, isFavoritesError, isLoggedIn}) => {
    return {
        favorites,
        isFavoritesLoading, 
        isFavoritesError,
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavorites: bindActionCreators(fetchFavorites, dispatch)
    }
}

export {FavoritesPage};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
